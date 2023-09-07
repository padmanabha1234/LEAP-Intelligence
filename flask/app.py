from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import datetime
import requests
import pandas as pd
from flask_cors import CORS
from flask import Flask, request, session, redirect, url_for, render_template, flash
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import Flask, request, redirect, url_for, render_template, jsonify, g
from statsmodels.tsa.holtwinters import ExponentialSmoothing
from MergeFiles import merge_csv_files
import json, psycopg2, psycopg2.extras, re, smtplib, pandas as pd, os, configparser
from werkzeug.security import check_password_hash
from flask_oidc import OpenIDConnect

configuration_path = os.path.dirname(os.path.abspath(__file__))+'/config.ini'
config = configparser.ConfigParser()
config.read(configuration_path)
print(configuration_path)

df = []

app = Flask(__name__, static_url_path='/static')

app.config.update({
    'SECRET_KEY': 'SomethingNotEntirelySecret',
    'TESTING': True,
    'DEBUG': True,
    'OIDC_CLIENT_SECRETS': 'client_secrets.json',
    'OIDC_ID_TOKEN_COOKIE_SECURE': False,
    'OIDC_REQUIRE_VERIFIED_EMAIL': False,
    'OIDC_USER_INFO_ENABLED': True,
    'OIDC_OPENID_REALM': 'master',
    'OIDC_SCOPES': ['openid', 'email', 'profile'],
    'OIDC_INTROSPECTION_AUTH_METHOD': 'client_secret_post'
})

# oidc = OpenIDConnect(app)

CORS(app)  # Enable CORS for all routes in the app

app.secret_key = 'cairocoders-ednalan'
KEYCLOAK_BASE_URL = config.get("Keycloak", "KEYCLOAK_BASE_URL")
KEYCLOAK_ADMIN_BASE_URL = config.get("Keycloak", "KEYCLOAK_ADMIN_BASE_URL")
CLIENT_ID = config.get("Keycloak", "CLIENT_ID")
CLIENT_SECRET = config.get("Keycloak", "CLIENT_SECRET")
ADMIN_USERNAME = config.get("Keycloak", "ADMIN_USERNAME")
ADMIN_PASSWORD = config.get("Keycloak", "ADMIN_PASSWORD")

 
DB_HOST = config['CREDs']['DB_HOST']
DB_NAME = config['CREDs']['DB_NAME']
DB_USER = config['CREDs']['DB_USERNAME']
DB_PASS = config['CREDs']['DB_PASSWORD']
 
conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)


def create_user_table(conn):
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
					fullname VARCHAR(50) NOT NULL,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    companyname VARCHAR(50)             
                )
            """)
        conn.commit()
    except psycopg2.Error as e:
        print("Error creating user table:", e)

def send_email_notification(recipient_email, username,email):
    sender_email = config['CREDs']['SENDER_EMAIL']
    sender_password = config['CREDs']['SENDER_PASSWORD'] 

    subject = 'Registration Successful for LEAP User'
    body = f' Dear team, \n\nThere is a new user Registration to explore LEAP service. Kindly find the user details below: \nusername =  {username},\nEmail Id = {email} \n\n\nThanks, \nLeap-intelligence Team'

    # Set up the SMTP server and login
    smtp_server = 'smtp.gmail.com' 
    smtp_port = 587 
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Use TLS encryption for security
        server.login(sender_email, sender_password)
    except Exception as e:
        print("Error: Unable to connect to the SMTP server.")
        print(e)
        return

    # Create the email message
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject

    # Attach the body of the email
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Send the email
        server.sendmail(sender_email, recipient_email, msg.as_string())
        print("Notification email sent successfully.")
    except Exception as e:
        print("Error: Unable to send the notification email.")
        print(e)
    finally:
        server.quit()

@app.route('/')
def home():
    # Check if user is logged in
    if 'loggedin' in session:
        # User is logged in, redirect to the desired URL
        # return redirect(config['CREDs']['DOMAIN_NAME'])
        # return render_template('home.html')
        return redirect(config['CREDs']['DOMAIN_NAME'])

    # User is not logged in, redirect to login page
    return redirect(url_for('login'))

@app.route('/login/', methods=['GET', 'POST'])
def login():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']

        cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
        account = cursor.fetchone()

        if account:
            password_rs = account['password']
            if check_password_hash(password_rs, password):
                token_url = f"{KEYCLOAK_BASE_URL}/protocol/openid-connect/token"
                token_data = {
                    "grant_type": "client_credentials",
                    "client_id": CLIENT_ID,
                    "client_secret": CLIENT_SECRET,
                    "username": username,
                    "password": password
                }

                response = requests.post(token_url, data=token_data)
                if response.status_code == 200:
                    token_response = response.json()
                    access_token = token_response.get("access_token")

                    if access_token:
                        session['loggedin'] = True
                        session['access_token'] = access_token
                        session['username'] = username
                        return redirect(url_for('home'))
                    else:
                        flash('Failed to authenticate with Keycloak')
                else:
                    flash('Incorrect username/password or Keycloak authentication failed')
            else:
                flash('Incorrect username/password')
        else:
            flash('Incorrect username/password')

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    create_user_table(conn)
    
    if request.method == 'POST':
        # Get form data
        fullname = request.form['fullname']
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        companyname = request.form.get('companyname')
        phonenumber = request.form.get('phonenumber')
        role = request.form.get('role')  # Updated variable name
        
        # Validate form data
        if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            flash('Invalid email address!')
        elif not re.match(r'[A-Za-z0-9]+', username):
            flash('Username must contain only characters and numbers!')
        elif not username or not password or not email:
            flash('Please fill out the form!')
        else:
            # Check if the username already exists in the database
            cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
            account = cursor.fetchone()
            if account:
                flash('Account already exists!')
            else:
                # Hash the password
                hashed_password = generate_password_hash(password)
                
                # Insert new account into the users table
                cursor.execute("INSERT INTO users (fullname, username, password, email, companyname, phonenumber, role) VALUES (%s, %s, %s, %s, %s, %s, %s)", 
                               (fullname, username, hashed_password, email, companyname, phonenumber, role))  # Updated variable name
                conn.commit()
                flash('You have successfully registered!')
                # Send email notification (if you have implemented the send_email_notification function)
                send_email_notification(config['CREDs']['RECEIVER_EMAIL'], username,email)
        
        return redirect(url_for('login'))
    
    # Show registration form with message (if any)
    return render_template('register.html')



@app.route("/add_user", methods=["POST"])
def add_user():
    try:
        data = request.json
        username = data["username"]
        email = data["email"]
        password = data["password"]

        token_url = f"{KEYCLOAK_BASE_URL}/protocol/openid-connect/token"
        token_data = {
            "grant_type": "client_credentials",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        }
        
        response = requests.post(token_url, data=token_data)
        response.raise_for_status()
        token_response = response.json()
        token = token_response.get("access_token")

        if not token:
            return "Error: Access token not found in response"

        user_data = {
            "username": username,
            "email": email,
            "credentials": [
                {
                    "type": "password",
                    "value": password,
                    "temporary": False
                }
            ],
            "enabled": True
        }

        user_creation_url = f"{KEYCLOAK_ADMIN_BASE_URL}/users"
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

        response = requests.post(user_creation_url, json=user_data, headers=headers)
        response.raise_for_status()

        if response.status_code == 201:
            return f"User added successfully: {response.text}"
        else:
            return f"Error adding user: {response.text}"

    except requests.exceptions.RequestException as e:
        return f"Error: {e}"
   
   
@app.route('/logout')
def logout():
    # Remove session data, this will log the user out
   session.pop('loggedin', None)
   session.pop('id', None)
   session.pop('username', None)
   # Redirect to login page
   return redirect(url_for('login'))
  
@app.route('/profile')
def profile(): 
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
   
    # Check if user is loggedin
    if 'loggedin' in session:
        cursor.execute('SELECT * FROM users WHERE id = %s', [session['id']])
        account = cursor.fetchone()
        # Show the profile page with account info
        return render_template('profile.html', account=account)
    # User is not loggedin redirect to login page
    return redirect(url_for('login'))


# Placeholder for OEE values
oee_values = []  # This should be replaced with a more robust solution like a database or a message queue
final_values = []


@app.route('/flask/reset')
def reset():
    global oee_values
    oee_values = calculate_oee(df)


@app.route('/flask/get_oee_value')
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


@app.route('/flask/upload', methods=['POST'])
def upload_file():
    path = config['CREDs']['DATA_LOC']
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


@app.route('/flask/get_dropdown_data')
def get_dropdown_data():
    global df
    dates = df['date'].unique().tolist()
    machines = df['machine'].unique().tolist()
    shifts = df['shift'].unique().tolist()

    # For time, let's assume it ranges from 00:00 to 23:50 in 10-minute intervals
    times = [f'{h:02d}:{m:02d}' for h in range(24) for m in range(0, 60, 10)]

    # Return a JSON response
    return jsonify(dates=dates, machines=machines, shifts=shifts, times=times)


@app.route('/flask/get_anomaly_values', methods=['GET'])
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


@app.route('/flask/get_correlation_values', methods=['GET'])
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


@app.route('/flask/trend_check', methods=['POST'])
def trend_check():
    global df
    global oee_values
    # Get form data
    param = request.form.get('param')
    direction = request.form.get('direction')
    no_of_days = int(request.form.get('days'))
    rate = float(request.form.get('rate'))

    for index, row in df.iterrows():
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

    print("param value:", param)
    # print(oee_values)

    if param == 'availability':
        print('Availability value is', Availability)
    elif param == 'performance':
        print('Performance value is', Performance)
    elif param == 'quality':
        print('Quality value is', Quality)
    elif param == 'oee':
        print('OEE value is', OEE)

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

    def get_parameter_value(date, machine, shift):
        matching_rows = df[(df['date'] == date) & (df['machine'] == machine) & (df['shift'] == shift)]
        if not matching_rows.empty:
            current_param_value = matching_rows[param].values[0]  # Get the parameter value for the current date

            # Get the preceding dates for the current date
            preceding_dates = [date_obj - datetime.timedelta(days=i) for i in range(1, 6)]

            # Get parameter values for preceding dates from oee_values, ensuring they are not negative
            preceding_values = [max(current_param_value - (i * rate), 0) for i in range(1, 6)]

            return preceding_values[::-1]  # Reverse the list to have the highest value first
        else:
            return [None] * 5  # Handle the case where no matching row is found

    # Create a list to store the date ranges and parameter values
    date_ranges = []
    grap_data = []

    for i, row in enumerate(trends.itertuples(), 1):
        index_value, date_value, machine_value, shift_value = row.Index, row.date, row.machine, row.shift
        print(f"SI No {i}: Date={date_value}, Machine={machine_value}, Shift={shift_value}")

        # Parse the date string to a datetime object
        date_obj = datetime.datetime.strptime(date_value, '%m/%d/%y').date()

        # Calculate 5 days before and after the date
        date_range_start = date_obj - datetime.timedelta(days=5)
        date_range_end = date_obj + datetime.timedelta(days=5)

        print(f"Date Range: {date_range_start} to {date_range_end}")

        # Create a list of dates in the date range
        date_list = []
        current_date = date_range_start
        while current_date <= date_range_end:
            date_list.append(current_date.strftime('%m/%d/%y'))
            current_date += datetime.timedelta(days=1)

        # Get the parameter values for the central date and the surrounding dates
        parameter_values = [get_parameter_value(date, machine_value, shift_value) for date in date_list]

        # Append the date range and parameter values to the main list
        date_ranges.append({
            "start_date": date_range_start.strftime('%m/%d/%y'),
            "end_date": date_range_end.strftime('%m/%d/%y'),
            "dates": date_list,  # Include the list of dates in the range
            param: parameter_values  # Include parameter name and values
        })

        grap = {
            "dates": date_list,
            param: parameter_values
        }

        grap_data.append(grap)

    print('grap data is', grap_data)
    return jsonify(results=results, grap_data=grap_data)


@app.route('/flask/forecasting', methods=['GET'])
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

@app.route('/flask/save_payload', methods=['POST'])
def save_payload():
    payload = request.get_json()  # Get the payload as a JSON object

    # Save the payload data as a JSON file
    with open('payload.json', 'w') as file:
        json.dump(payload, file)

    return jsonify({'message': 'Payload received and saved as JSON file'})


@app.route('/flask/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
