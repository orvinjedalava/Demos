from typing import List, Optional
import regex as re
import os
from presidio_analyzer import AnalyzerEngine, RecognizerResult, PatternRecognizer
from presidio_analyzer.predefined_recognizers import CreditCardRecognizer, DateRecognizer
from custom_date_recognizer import CustomDateRecognizer
from presidio_anonymizer import AnonymizerEngine

class NonValidatedCCRecognizer(CreditCardRecognizer):
    def validate_result(self, pattern_text: str) -> bool:
        return None
    
def create_presidio_analyzer_results_from_file(file_name: str) -> List[RecognizerResult]:
    with open(file_name, 'r') as file:
        text = file.read()
    return run_presidio_analyzer(text)

def get_deny_list() -> List[str]:
    return [
        'My State','mysted','MyState','State','Mystique','Mice Tate','Mice Date','Mice Eight','My Staid','Might State',
        'Might Stay','Mist Ate','My Stet','Might Aid','Mai State','Mice Strait','Mice Stake','Mice Tape','My Steak',
        'mice tate','mice date','mice eight','my staid','might state','might stay','mist ate','my stet','might aid',
        'mai state','mice strait','mice stake','mice tape','my steak'
    ]

def get_allow_list() -> List[str]:
    return [
        'geez','Geez','yo','OTP','Miss','Bear','bush','Friendlier','Said','Fingers','english',
        'Mobile','payee','Lingo','C.','You\'Re','Plumped','We\'Ve','Faqs'
    ]

def get_deny_patternrecognizer(case_sensitive:bool) -> PatternRecognizer:
    global_regex_flags: Optional[int] = re.DOTALL | re.MULTILINE

    if not case_sensitive:
        global_regex_flags |= re.IGNORECASE

    return PatternRecognizer(
        supported_entity='CUSTOM_PII', 
        deny_list=get_deny_list(), 
        global_regex_flags=global_regex_flags)
    
def run_presidio_analyzer(text:str) -> List[RecognizerResult]:
    # Set up the engine, loads the NLP module (spaCy model by default) 
    # and other PII recognizers
    analyzer = AnalyzerEngine()
    analyzer.registry.add_recognizer(NonValidatedCCRecognizer())

    analyzer.registry.remove_recognizer(DateRecognizer)
    analyzer.registry.add_recognizer(CustomDateRecognizer())
    analyzer.registry.add_recognizer(get_deny_patternrecognizer(case_sensitive=True))

    # Call analyzer to get results
    results = analyzer.analyze(text=text,
                            entities=['CREDIT_CARD','CRYPTO','EMAIL_ADDRESS','IBAN_CODE','IP_ADDRESS','NRP','LOCATION','PERSON','PHONE_NUMBER','MEDICAL_LICENSE','URL','CUSTOM_DATE_TIME','CUSTOM_PII'],
                            language='en', 
                            allow_list=get_allow_list()
                            )
    filtered_results: List[RecognizerResult] = filter_results(results, text)

    return filtered_results

def filter_results(results: List[RecognizerResult], text:str) -> List[RecognizerResult]:
    filtered_results: List[RecognizerResult] = []

    for result in results:
        entity_type = result.entity_type
        entity_text = text[result.start:result.end]

        if ( entity_type == 'PERSON' or entity_type == 'NRP' ) and ':' in entity_text:
            continue
        filtered_results.append(result)

    return filtered_results

def get_text(results: List[RecognizerResult], text:str) -> str:
    result_text: str = ''
    for result in results:
        entity_type = result.entity_type
        entity_text = text[result.start:result.end]
        recognizer_name = result.recognition_metadata['recognizer_name']
        score = result.score
        result_text += f"- {entity_text} as {entity_type} with score {score}. Recognizer: {recognizer_name}\n"
    return result_text

def generate_analyzer_results_file(source_file_name: str, destination_file_name: str) -> None:
    with open(source_file_name, 'r') as file:
        text = file.read()

    results: List[RecognizerResult] = run_presidio_analyzer(text)

    results_text: str = get_text(results, text)

    os.makedirs(os.path.dirname(destination_file_name), exist_ok=True)
    with open(destination_file_name, 'w') as file:
        file.write(results_text)

def generate_anonymized_text_file(source_file_name: str, destination_file_name: str) -> None:
    with open(source_file_name, 'r') as file:
        text = file.read()

    results: List[RecognizerResult] = run_presidio_analyzer(text)

    anonymizer = AnonymizerEngine()

    result = anonymizer.anonymize(text=text,analyzer_results=results)

    os.makedirs(os.path.dirname(destination_file_name), exist_ok=True)
    with open(destination_file_name, 'w') as file:
        file.write(result.text)