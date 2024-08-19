from presidio_analyzer import AnalyzerEngine
input = "My favorite website is bing.com, his is microsoft.com"
analyzer = AnalyzerEngine()
results = analyzer.analyze(text = input, language = 'en', allow_list = ['bing.com'])

print("Results:")
for result in results:
    print(f"- {input[result.start:result.end]} as {result.entity_type} with score {result.score}")