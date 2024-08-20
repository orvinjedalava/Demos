from typing import List, Optional
import regex as re
import os
from presidio_analyzer import AnalyzerEngine, RecognizerResult, PatternRecognizer
from presidio_analyzer.predefined_recognizers import CreditCardRecognizer, DateRecognizer
from custom_date_recognizer import CustomDateRecognizer
from presidio_anonymizer import AnonymizerEngine

# Custom recognizer class that inherits from CreditCardRecognizer
class NonValidatedCCRecognizer(CreditCardRecognizer):
    # Override the validate_result method to disable validation
    def validate_result(self, pattern_text: str) -> bool:
        return None  # Always return None, effectively disabling validation

# Function to create Presidio analyzer results from a file
def create_presidio_analyzer_results_from_file(file_name: str) -> List[RecognizerResult]:
    # Open the file in read mode
    with open(file_name, 'r') as file:
        # Read the content of the file
        text = file.read()
    # Run the Presidio analyzer on the text and return the results
    return run_presidio_analyzer(text)

# Function to get a list of deny words
def get_deny_list() -> List[str]:
    return [
        'My State','mysted','MyState','State','Mystique','Mice Tate','Mice Date','Mice Eight','My Staid','Might State',
        'Might Stay','Mist Ate','My Stet','Might Aid','Mai State','Mice Strait','Mice Stake','Mice Tape','My Steak',
        'mice tate','mice date','mice eight','my staid','might state','might stay','mist ate','my stet','might aid',
        'mai state','mice strait','mice stake','mice tape','my steak'
    ]  # Return a list of deny words

# Function to get a list of allow words
def get_allow_list() -> List[str]:
    return [
        'geez','Geez','yo','OTP','Miss','Bear','bush','Friendlier','Said','Fingers','english',
        'Mobile','payee','Lingo','C.','You\'Re','Plumped','We\'Ve','Faqs'
    ]  # Return a list of allow words

# Function to get a PatternRecognizer for deny words
def get_deny_patternrecognizer(case_sensitive:bool) -> PatternRecognizer:
    # Set global regex flags for multiline and dotall
    global_regex_flags: Optional[int] = re.DOTALL | re.MULTILINE

    # Add case insensitive flag if case_sensitive is False
    if not case_sensitive:
        global_regex_flags |= re.IGNORECASE

    # Return a PatternRecognizer with the deny list and regex flags
    return PatternRecognizer(
        supported_entity='CUSTOM_PII', 
        deny_list=get_deny_list(), 
        global_regex_flags=global_regex_flags)

# Function to run the Presidio analyzer on a text
def run_presidio_analyzer(text: str) -> List[RecognizerResult]:
    # Initialize the Presidio AnalyzerEngine
    analyzer = AnalyzerEngine()
    
    # Add a custom recognizer for non-validated credit cards
    analyzer.registry.add_recognizer(NonValidatedCCRecognizer())

    # Remove the default DateRecognizer and add a custom one
    analyzer.registry.remove_recognizer(DateRecognizer)
    analyzer.registry.add_recognizer(CustomDateRecognizer())
    
    # Add a custom pattern recognizer with a deny list
    analyzer.registry.add_recognizer(get_deny_patternrecognizer(case_sensitive=True))

    # Analyze the text for specified entities
    results = analyzer.analyze(
        text=text,
        entities=[
            'CREDIT_CARD', 'CRYPTO', 'EMAIL_ADDRESS', 'IBAN_CODE', 'IP_ADDRESS', 
            'NRP', 'LOCATION', 'PERSON', 'PHONE_NUMBER', 'MEDICAL_LICENSE', 
            'URL', 'CUSTOM_DATE_TIME', 'CUSTOM_PII'
        ],
        language='en', 
        allow_list=get_allow_list()
    )
    
    # Filter the results based on custom logic
    filtered_results: List[RecognizerResult] = filter_results(results, text)

    # Return the filtered results
    return filtered_results

# Function to filter the results based on custom logic
def filter_results(results: List[RecognizerResult], text: str) -> List[RecognizerResult]:
    # Initialize an empty list to store filtered results
    filtered_results: List[RecognizerResult] = []

    # Iterate over each result in the results list
    for result in results:
        entity_type = result.entity_type
        entity_text = text[result.start:result.end]

        # Skip results for 'PERSON' or 'NRP' entities if the text contains a colon
        if (entity_type == 'PERSON' or entity_type == 'NRP') and ':' in entity_text:
            continue
        # Add the result to the filtered results list
        filtered_results.append(result)

    # Return the filtered results
    return filtered_results

# Function to get the text representation of the results
def get_text(results: List[RecognizerResult], text: str) -> str:
    # Initialize an empty string to store the result text
    result_text: str = ''
    
    # Iterate over each result in the results list
    for result in results:
        entity_type = result.entity_type
        entity_text = text[result.start:result.end]
        recognizer_name = result.recognition_metadata['recognizer_name']
        score = result.score
        # Append the result details to the result_text string
        result_text += f"- {entity_text} as {entity_type} with score {score}. Recognizer: {recognizer_name}\n"
    
    # Return the concatenated result text
    return result_text

# Function to generate an analyzer results file
def generate_analyzer_results_file(source_file_name: str, destination_file_name: str) -> None:
    # Open the source file in read mode
    with open(source_file_name, 'r') as file:
        # Read the content of the source file
        text = file.read()

    # Run the Presidio analyzer on the text and get the results
    results: List[RecognizerResult] = run_presidio_analyzer(text)

    # Convert the results to a formatted text string
    results_text: str = get_text(results, text)

    # Create the directory for the destination file if it doesn't exist
    os.makedirs(os.path.dirname(destination_file_name), exist_ok=True)
    # Open the destination file in write mode
    with open(destination_file_name, 'w') as file:
        # Write the results text to the destination file
        file.write(results_text)

# Function to generate an anonymized text file
def generate_anonymized_text_file(source_file_name: str, destination_file_name: str) -> None:
    # Open the source file in read mode
    with open(source_file_name, 'r') as file:
        # Read the content of the source file
        text = file.read()

    # Run the Presidio analyzer on the text and get the results
    results: List[RecognizerResult] = run_presidio_analyzer(text)

    # Initialize the AnonymizerEngine
    anonymizer = AnonymizerEngine()

    # Anonymize the text using the analyzer results
    result = anonymizer.anonymize(text=text, analyzer_results=results)

    # Create the directory for the destination file if it doesn't exist
    os.makedirs(os.path.dirname(destination_file_name), exist_ok=True)
    # Open the destination file in write mode
    with open(destination_file_name, 'w') as file:
        # Write the anonymized text to the destination file
        file.write(result.text)