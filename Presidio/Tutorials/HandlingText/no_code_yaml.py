from presidio_analyzer import AnalyzerEngine, RecognizerRegistry

input = 'Mr, and Mrs. Smith. Mr Plum wrote a book'

yaml_file = 'example_recognizers.yaml'
registry = RecognizerRegistry()
registry.load_predefined_recognizers()  # Loads all the predefined recognizers (Credit card, phone number etc.)
registry.add_recognizers_from_yaml(yaml_file)

analyzer = AnalyzerEngine(registry=registry)
results = analyzer.analyze(text=input, language='en')

print("Results:")
for result in results:
    print(f"- {input[result.start:result.end]} as {result.entity_type} with score {result.score}")