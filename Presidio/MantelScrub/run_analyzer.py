import os
import glob
from scrub_service import generate_analyzer_results_file

# Print a message indicating the start of the process
print('Start generating presidio analysis files')

# Define the source directory containing input files
source_directory = './InputFiles'
# Define the destination directory for analysis results
destination_directory = './Analysis'

# Get a list of all .txt files in the source directory
txt_files = glob.glob(os.path.join(source_directory, '*.txt'))

# Iterate over each text file in the source directory
for source_file_path in txt_files:
    # Extract the base name of the source file
    file_name = os.path.basename(source_file_path)
    # Construct the destination file name with a prefix 'analysis_'
    destination_file_name = os.path.join(destination_directory, f'analysis_{file_name}')

    # Print a message indicating the current file being processed
    print(f'Generating {destination_file_name} from {source_file_path}...')

    # Generate the analyzer results file
    generate_analyzer_results_file(source_file_path, destination_file_name)

    # Print a message indicating the file has been analyzed and saved
    print(f'{destination_file_name} has been analyzed and saved.')

# Print a message indicating the end of the process
print('Generate presidio analysis file done!')