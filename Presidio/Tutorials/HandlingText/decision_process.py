from presidio_analyzer import AnalyzerEngine, Pattern, PatternRecognizer, RecognizerRegistry
import pprint

# define the regex pattern
regex = r"(\b\d{5}(?:\-\d{4})?\b)" # very weak regex pattern
zipcode_pattern = Pattern(name="zip code (weak)", regex=regex, score=0.01)

# define the recognizer with the defined pattern
zipcode_recognizer = PatternRecognizer(supported_entity="US_ZIP_CODE", patterns=[zipcode_pattern])

# define the recognizer with the defined pattern AND context words
zipcode_recognizer_with_context = PatternRecognizer(supported_entity="US_ZIP_CODE", patterns=[zipcode_pattern], context=["zip", "zipcode"])

registry = RecognizerRegistry()
registry.add_recognizer(zipcode_recognizer_with_context) # results in result.score of 0.4

analyzer = AnalyzerEngine(registry=registry)

results = analyzer.analyze(text='My zip code is 90210', language='en', return_decision_process=True)

decision_process = results[0].analysis_explanation

pp = pprint.PrettyPrinter()
print('Decision process output:\n')
pp.pprint(decision_process.__dict__)