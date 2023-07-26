import json
from datetime import datetime, timedelta

from flask import Flask, request, redirect, url_for, render_template, jsonify
import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing

from MergeFiles import merge_csv_files

df = []

app = Flask(__name__)
# Placeholder for OEE values
oee_values = []  # This should be replaced with a more robust solution like a database or a message queue
final_values = []


@app.route('/reset')
def reset():
    global oee_values
    oee_values = calculate_oee(df)


@app.route('/get_oee_value')
def get_oee_value():
    machine = request.args.get('machine')
    shift = request.args.get('shift')

    # Return the next OEE value, or a default value if there are no more OEE values
    if oee_values:
        pop1 = oee_values.pop(0)
        while pop1['machine'] != machine or pop1['shift'] != shift:
            pop1 = oee_values.pop(0)
        return jsonify(pop1)
    else:
        return jsonify({'time': None, 'availability': None, 'performance': None, 'quality': None, 'oee': None})


def calculate_oee(df):
    for index, row in df.iterrows():
        Date = row['date']
        Machine = row['machine']
        Shift = row['shift']
        PlannedProductionTime = row['plannedproductiontime']
        ActualProductionTime = row['actualproductiontime']
        TotalDowntime = row['totaldowntime']
        TotalGoodUnits = row['totalgoodunits']
        TotalProducedUnits = row['totalproducedunits']

        # Compute Availability, Performance, Quality, and OEE
        OperatingTime = ActualProductionTime - TotalDowntime
        Availability = (ActualProductionTime / PlannedProductionTime) * 100 if PlannedProductionTime else 0
        Performance = (OperatingTime / ActualProductionTime) * 100 if ActualProductionTime else 0
        Quality = (TotalGoodUnits / TotalProducedUnits) * 100 if TotalProducedUnits else 0
        OEE = Availability * Performance * Quality / 10000

        oee_values.append({
            'time': Date,
            'machine': Machine,
            'shift': Shift,
            'availability': Availability,
            'performance': Performance,
            'quality': Quality,
            'oee': OEE
        })

    return oee_values


@app.route('/upload', methods=['POST'])
def upload_file():
    path = '/home/vanitha/Downloads/Latest_28_Jun_4_48pm/Latest_28_Jun_4_48pm/data'
    global df, oee_values, final_values
    df = merge_csv_files(path)
    final_values = df
    final_values['operatingtime'] = final_values['actualproductiontime'] - final_values['totaldowntime']
    final_values['availability'] = (final_values['actualproductiontime'] / final_values['plannedproductiontime']) * 100
    final_values['performance'] = (final_values['operatingtime'] / final_values['actualproductiontime']) * 100
    final_values['quality'] = (final_values['totalgoodunits'] / final_values['totalproducedunits']) * 100
    final_values['oee'] = final_values['availability'] * final_values['performance'] * final_values['quality'] / 10000
    oee_values = calculate_oee(df)  # Assuming you have a function that calculates OEE values from a DataFrame
    # You would then need to save these OEE values somewhere where they can be accessed by your JavaScript code
    # For example, you might save them to a database, or write them to a file
    # The specifics of this will depend on your application's requirements and architecture
    return redirect(url_for('index'))


@app.route('/get_dropdown_data')
def get_dropdown_data():
    global df
    dates = df['date'].unique().tolist()
    machines = df['machine'].unique().tolist()
    shifts = df['shift'].unique().tolist()

    # For time, let's assume it ranges from 00:00 to 23:50 in 10-minute intervals
    times = [f'{h:02d}:{m:02d}' for h in range(24) for m in range(0, 60, 10)]

    # Return a JSON response
    return jsonify(dates=dates, machines=machines, shifts=shifts, times=times)


@app.route('/get_anomaly_values', methods=['GET'])
def get_anomaly_values():
    global final_values
    # print('Anomaly')
    column_name = request.args.get('column', type=str)
    # print('Anomaly for', column_name)
    # print(final_values)
    column = final_values[column_name]
    # print(column)
    mean = column.mean()
    std = column.std()
    threshold = 2 * std
    # print(mean, threshold)
    return jsonify(low=mean - threshold, high=mean + threshold)


@app.route('/get_correlation_values', methods=['GET'])
def get_correlation_values():
    final_values1 = final_values[
        ['plannedproductiontime', 'actualproductiontime', 'totaldowntime', 'totalproducedunits',
         'totalgoodunits', 'availability', 'performance', 'quality', 'oee']]

    correlations = final_values1.corr().unstack().sort_values(ascending=False)
    high_correlations = correlations[(correlations > 0.7) | (correlations < -0.7)]
    high_correlations = high_correlations[
        high_correlations.index.get_level_values(0) != high_correlations.index.get_level_values(1)]
    high_correlations = high_correlations[~high_correlations.duplicated()]

    correlation_values = []
    for index, value in high_correlations.items():
        column1, column2 = index
        correlation_values.append({
            'column1': column1,
            'column2': column2,
            'correlation': value
        })

    return jsonify(correlation_values)


@app.route('/trend_check', methods=['POST'])
def trend_check():
    # Get form data
    param = request.form.get('param')
    direction = request.form.get('direction')
    no_of_days = int(request.form.get('days'))
    rate = float(request.form.get('rate'))

    # Convert final_values into a DataFrame
    df = final_values
    df.to_csv('consolidated.csv')

    df = final_values.sort_values(by=['machine', 'shift', 'date'], ascending=True)

    # Add a column that shows the difference from the previous day
    df['daily_change'] = df[param].diff()

    # Create a function to identify the trend
    def check_trend(x):
        if direction == 'up':
            return all(i > rate for i in x)
        elif direction == 'down':
            return all(i < -rate for i in x)

    # Identify where trends exist
    df['trend'] = df['daily_change'].rolling(window=no_of_days).apply(check_trend)

    # Get the trends
    trends = df[df['trend'] == True]

    # Restructure data for return
    trends = trends.reset_index()
    results = trends[['index', 'date', 'machine', 'shift']].values.tolist()

    table_html = '<table>'
    table_html += '<tr><th>Sl No</th><th>Date</th><th>Machine</th><th>Shift</th></tr>'
    for i, row in enumerate(results, 1):
        table_html += f'<tr><td>{i}</td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td></tr>'
    table_html += '</table>'

    return table_html

    # return render_template('results.html', trends=results)
    return jsonify(results)


@app.route('/forecasting', methods=['GET'])
def forecasting():
    global final_values
    global df
    print('In Forecasting......')
    # Get the selected values from the request arguments
    machine = request.args.get('machine')
    shift = request.args.get('shift')
    parameter = request.args.get('parameter')
    forecast_steps = int(request.args.get('forecast_steps'))
    smoothing_level = 0.2  # Fixed value
    smoothing_slope = 0.1  # Fixed value
    print(machine, shift, parameter, forecast_steps)
    try:
        # Filter the DataFrame based on the selected values
        print('Before Filtering', df)
        df_filtered = df[df['machine'] == machine]
        df_filtered = df_filtered[df_filtered['shift'] == shift]
        filtered_df = df_filtered[['date', 'machine', 'shift', parameter]]
        filtered_df.set_index('date', inplace=True)
        print('Filtered df', filtered_df)
        # Split the data into training and testing sets
        train_data = filtered_df[parameter]
        # Build and fit the exponential smoothing model
        model = ExponentialSmoothing(train_data, trend='add', seasonal=None)
        model_fit = model.fit(smoothing_level=smoothing_level, smoothing_slope=smoothing_slope)

        # Forecast the next values
        forecast = model_fit.forecast(steps=forecast_steps)
        print('forecast :', forecast)
        # Create a DataFrame with the desired columns
        last_date = datetime.strptime(train_data.index[-2], '%m/%d/%y')
        forecast_dates = [(last_date + timedelta(days=i + 1)).strftime('%m/%d/%y') for i in range(forecast_steps)]
        actual_df = pd.DataFrame({
            'Date': train_data.index[-2 * forecast_steps:],
            'Actual Values': train_data.values[-2 * forecast_steps:]
        })
        '''
        print('Test Data Values',test_data.values,'Forecasted Values', forecast.values)
        result_df = pd.DataFrame({
            'Date': test_data.index,
            'Actual Values': test_data.values,
            'Forecasted Values': forecast.values
        })
        '''
        forecast_df = pd.DataFrame({
            'Date': forecast_dates,
            'Forecasted Values': forecast.values
        })
        print('Actual DF->', actual_df)
        print('Forecast Df->', forecast_df)
        # Combine actual and forecast data
        result_df = pd.merge(actual_df, forecast_df, on='Date', how='outer')

        result_df = result_df.fillna(value='null')
        print('result_df', result_df)
        # Convert the result DataFrame to JSON
        json_response = result_df.to_dict(orient='records')
        print('Forcast Data', json_response)
        return jsonify({'data': json_response})

    except Exception as e:
        # Return an error response if an exception occurs
        return jsonify({'error': str(e)})

@app.route('/save_payload', methods=['POST'])
def save_payload():
    payload = request.get_json()  # Get the payload as a JSON object

    # Save the payload data as a JSON file
    with open('payload.json', 'w') as file:
        json.dump(payload, file)

    return jsonify({'message': 'Payload received and saved as JSON file'})


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, port=5002)
