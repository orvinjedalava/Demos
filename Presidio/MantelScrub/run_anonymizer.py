import os
import glob
from scrub_service import generate_anonymized_text_file

# Print a message indicating the start of the anonymization process
print('Start generating presidio anonymized files')

# Define the source directory containing input files
source_directory = './InputFiles'
# Define the destination directory for anonymized results
destination_directory = './Anonymized'

# Get a list of all .txt files in the source directory
txt_files = glob.glob(os.path.join(source_directory, '*.txt'))

# Iterate over each text file in the source directory
for source_file_path in txt_files:
    # Extract the file name from the full path
    file_name = os.path.basename(source_file_path)
    # Construct the destination file name with a prefix 'anonymized_'
    destination_file_name = os.path.join(destination_directory, f'anonymized_{file_name}')

    # Print a message indicating the current file being processed
    print(f'Generating {destination_file_name} from {source_file_path}...')

    # Generate the anonymized text file
    generate_anonymized_text_file(source_file_path, destination_file_name)

    # Print a message indicating the file has been anonymized and saved
    print(f'{destination_file_name} has been analyzed and saved.')

# Print a message indicating the end of the anonymization process
print('Generate presidio anonymized file done!')