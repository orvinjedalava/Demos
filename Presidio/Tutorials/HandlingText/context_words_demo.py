from presidio_analyzer import Pattern, PatternRecognizer, RecognizerRegistry, AnalyzerEngine
from presidio_analyzer.context_aware_enhancers import LemmaContextAwareEnhancer

# types of inputs
input = "My zip code is 90210"
record_input = {"column_name": "zip", "text": "My code is 90210"}

# add a context aware enhancer
context_aware_enhancer = LemmaContextAwareEnhancer(context_similarity_factor=0.45, min_score_with_context_similarity=0.4)

# define the regex pattern
regex = r"(\b\d{5}(?:\-\d{4})?\b)" # very weak regex pattern
zipcode_pattern = Pattern(name="zip code (weak)", regex=regex, score=0.01)

# define the recognizer with the defined pattern
zipcode_recognizer = PatternRecognizer(supported_entity="US_ZIP_CODE", patterns=[zipcode_pattern])

# define the recognizer with the defined pattern AND context words
zipcode_recognizer_with_context = PatternRecognizer(supported_entity="US_ZIP_CODE", patterns=[zipcode_pattern], context=["zip", "zipcode"])

registry = RecognizerRegistry()
#registry.add_recognizer(zipcode_recognizer) # results in result.score of 0.01 ( as defined )
registry.add_recognizer(zipcode_recognizer_with_context) # results in result.score of 0.4
analyzer = AnalyzerEngine(registry=registry, context_aware_enhancer=context_aware_enhancer)

#results = analyzer.analyze(text=input, language='en')
results = analyzer.analyze(text=record_input["text"], language='en', context=[record_input["column_name"]]) # context is passed as a list of strings

print("Results:")
for result in results:
    print(f"- {input[result.start:result.end]} as {result.entity_type} with score {result.score}")