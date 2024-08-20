import os
import glob
from scrub_service import generate_anonymized_text_file

print('Start generating presidio anonymized files')

# Define the source and destination directories
source_directory = './InputFiles'
destination_directory = './Anonymized'

# Get a list of all .txt files in the source directory
txt_files = glob.glob(os.path.join(source_directory, '*.txt'))

for source_file_path in txt_files:

    # Extract the file name from the full path
    file_name = os.path.basename(source_file_path)
    destination_file_name = os.path.join(destination_directory, f'anonymized_{file_name}')

    print(f'Generating {destination_file_name} from {source_file_path}...')

    generate_anonymized_text_file(source_file_path, destination_file_name)

    print(f'{destination_file_name} has been analyzed and saved.')

print('Generate presidio anonymized file done!')