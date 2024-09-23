'''
Filename: run_anonymizer_excel.py
Taken from code with original author: Siddharth Bhatia - https://github.com/Welding-Torch/Excel-Anonymizer
'''

import argparse
from typing import List
import pandas as pd
from scrub_service import generate_anonymized_text, initialize_presidio_analyzer
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

def main():
    """Just a main function needed to publish this to PyPI"""

    # Initialize parser
    parser = argparse.ArgumentParser(
                        prog='run_anonymizer_excel.py',
                        description='Anonymizes an Excel file and \
                            synthesizes new data in its place.',
                        epilog='Made by Siddharth Bhatia')

    # Take file as input
    parser.add_argument('filename', help="your excel file here")
    parser.add_argument('-v', '--verbose',
                        action='store_true')

    # Read arguments from command line
    args = parser.parse_args()

    filename = args.filename

    print("read excel file")
    df = pd.read_excel(f"{filename}")
    print("excel file read")
    
    # Column values to list, which I will use at the end
    columns_ordered_list = df.columns.values.tolist()
    
    # Initialize an empty dictionary to store cell locations and values
    cell_data = {}

    # Iterate over every cell
    for index, row in df.iterrows():
        for column in df.columns:
            cell_value = row[column]
            cell_location = (index, column)
            cell_data[cell_location] = cell_value
    
    print(f"starting... {len(list(cell_data.items()))}")

    # Initialize the AnalyzerEngine
    analyzer_engine = initialize_presidio_analyzer()
    # Initialize the AnonymizerEngine
    anonymizer = AnonymizerEngine()

    for location, entity in cell_data.items():
        anonymized_text: str = generate_anonymized_text(str(entity), analyzer_engine, anonymizer)
        cell_data[location] = anonymized_text
        print(f"location: {location} anonymized")

    data = {}
    columns = list(set(column for _, column in cell_data))
    print(f"writing to excel file... {len(list(cell_data.items()))}")
    for (index, column), value in cell_data.items():
        data.setdefault(index, [None] * len(columns))
        data[index][columns_ordered_list.index(column)] = value
    anonymized_df = pd.DataFrame.from_dict(data, columns=columns_ordered_list, orient="index")
    
    filename = filename.rstrip(".xlsx")
    anonymized_df.to_excel(
        f"{filename}-anonymized.xlsx",
        # Don't save the auto-generated numeric index
        index=False
    )

    print(f"Output generated: {filename}-anonymized.xlsx")

if __name__ == "__main__":
    main()
