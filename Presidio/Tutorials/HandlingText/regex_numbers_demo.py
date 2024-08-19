from presidio_analyzer import Pattern, PatternRecognizer

text1 = "I live in 510 Broad st."

numbers_pattern = Pattern(name="numbers_pattern", regex=r"\d+", score=0.5)

numbers_recognizer = PatternRecognizer(supported_entity="NUMBER", patterns=[numbers_pattern])

results = numbers_recognizer.analyze(text=text1, entities=["NUMBER"])

print("Results:")
for result in results:
    print(f"- {text1[result.start:result.end]} as {result.entity_type}")