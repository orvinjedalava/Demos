from pprint import pprint
import json

from presidio_anonymizer import AnonymizerEngine
from presidio_anonymizer.entities import OperatorConfig, RecognizerResult

input = 'JAMES BOND MOVIE: My name is Bond, James Bond. 0416-999999'

# analyzer output
analyzer_results = [
    RecognizerResult(entity_type='PERSON', start=29, end=33, score=0.8),
    RecognizerResult(entity_type='PERSON', start=35, end=45, score=0.8),
    RecognizerResult(entity_type='TITLE', start=0, end=16, score=0.8),
    RecognizerResult(entity_type='PHONE_NUMBER', start=47, end=58, score=0.8),
]

# initialize the engine:
engine = AnonymizerEngine()

# define anonymization operators
operators = {
    'DEFAULT': OperatorConfig('replace', {'new_value': '<ANONYMIZED>'}),
    'PHONE_NUMBER': OperatorConfig('mask', {
        'type': 'mask',
        'masking_char': '*',
        'chars_to_mask': 12,
        'from_end': True
    }),
    'TITLE': OperatorConfig('redact', {})
    
}

# invoke the anonymize function with the text
# analyzer results (potentially coming from presidio-analyzer) and
# Operators to get the anonymization output:
result = engine.anonymize(
    text=input,
    analyzer_results=analyzer_results,
    operators=operators
)

print('De-identified text')
print(result.text)
print('detailed result')

pprint(json.loads(result.to_json()))