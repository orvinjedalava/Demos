from presidio_anonymizer import AnonymizerEngine
from presidio_anonymizer.entities import OperatorConfig, EngineResult, RecognizerResult

# create a custom function
def custom_function(entity:str):
    return f'Hello World to {entity}'

# create custom operator for the PERSON entity
operators = {'PERSON': OperatorConfig('custom', {'lambda': custom_function})}

# analyzer output
analyzer_results = [RecognizerResult(entity_type='PERSON', start=11, end=18, score=0.8)]

input = 'My name is Raphael and I like to fish.'

anonymizer = AnonymizerEngine()

result = anonymizer.anonymize(text=input, analyzer_results=analyzer_results, operators=operators)

print(result.text)