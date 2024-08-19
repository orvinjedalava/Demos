from presidio_anonymizer import AnonymizerEngine, DeanonymizeEngine
from presidio_anonymizer.entities import RecognizerResult, OperatorConfig, OperatorResult

crypto_key = 'WmZq4t7w!z%C&F)J'

anonymizer_engine = AnonymizerEngine()

# Invoke the anonymize function with the text,
# analyzer results (potentially coming from presidio-analyzer)
# and an 'encrypt' operator to get an encrypted anonymization output:
anonymize_result = anonymizer_engine.anonymize(
    text='My name is James Bond',
    analyzer_results=[
        RecognizerResult(entity_type='PERSON', start=11, end=21, score=0.8)
    ],
    operators={'PERSON': OperatorConfig('encrypt', {'key': crypto_key})}
)

print('Anonymized Result Text:\n')
print(f'{anonymize_result.text}\n')

print('Anonymized Entities:\n')
print(f'{anonymize_result.items}\n')

# Initialize the DeanonymizeEngine
deanonymizer_engine = DeanonymizeEngine()

# Invoke the deanonymize function with the text, anonymizer results
# and a 'decrypt' operator to get the original text as output.
deanonymized_result = deanonymizer_engine.deanonymize(
    text=anonymize_result.text,
    entities=anonymize_result.items,
    operators={"DEFAULT": OperatorConfig("decrypt", {"key": crypto_key})},
)

print('Deanonymized Result Text:\n')
print(f'{deanonymized_result.text}\n')