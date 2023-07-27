import os
import pandas as pd
def merge_csv_files(directory):
    csv_files = [f for f in os.listdir(directory) if f.endswith('.csv')]

    # initialize an empty DataFrame to hold our data
    df_final = pd.DataFrame()

    for file in csv_files:
        # read each csv file and keep only necessary columns
        df = pd.read_csv(os.path.join(directory, file))
        df = df[['date', 'machine', 'shift', df.columns[3]]]  # assuming 4th column is different for each file

        # if final DataFrame is empty, assign it the first csv data
        if df_final.empty:
            df_final = df
        else:
            # if final DataFrame already has data, merge with the new DataFrame
            df_final = pd.merge(df_final, df, on=['date', 'machine', 'shift'], how='outer')

    return df_final