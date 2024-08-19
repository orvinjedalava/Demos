from typing import List
from presidio_analyzer import EntityRecognizer, RecognizerResult, AnalyzerEngine
from presidio_analyzer.nlp_engine import NlpArtifacts

class NumbersRecognizer(EntityRecognizer):

    expected_confidence_level = 0.7

    def load(self) -> None:
        # No loading is required.
        pass

    def analyze(
        self, text: str, entities: List[str], nlp_artifacts: NlpArtifacts
    ) -> List[RecognizerResult]:
        
        self.supported_entities = entities
        self.text = text

        # Logic for detecting a specific PII
        results = []

        # iterate over the spaCy tokens, and call `token.like_num`
        for token in nlp_artifacts.tokens:
            if token.like_num:
                results.append(
                    RecognizerResult(
                        entity_type="NUMBER",
                        start=token.idx,
                        end=token.idx + len(token.text),
                        score=self.expected_confidence_level,
                    )
                )

        return results
    
input = "Roberto lives in Five 10 Broad st."
    
# instantiate the custom class NumbersRecognizer
new_numbers_recognizer = NumbersRecognizer(supported_entities=["NUMBER"])

analyzer = AnalyzerEngine()
analyzer.registry.add_recognizer(new_numbers_recognizer)

results = analyzer.analyze(text=input, language="en")
print("Results:")
for result in results:
    print(f"- {input[result.start:result.end]} as {result.entity_type}")


