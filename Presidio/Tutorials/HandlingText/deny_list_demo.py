from presidio_analyzer import PatternRecognizer, AnalyzerEngine

text1 = "I suspect Professor Plum, in the Dining Room, with the candlestick"

titles_list = [
    "Sir",
    "Ma'am",
    "Madam",
    "Mr.",
    "Mrs.",
    "Ms.",
    "Miss",
    "Dr.",
    "Professor",
]
analyzer = AnalyzerEngine()

titles_recognizer = PatternRecognizer(supported_entity="TITLE", deny_list=titles_list)
analyzer.registry.add_recognizer(titles_recognizer)

results = titles_recognizer.analyze(text1, entities=["TITLE"])

print('Identified these PII entities')
for result in results:
    print(f"- {text1[result.start:result.end]} as {result.entity_type}")


