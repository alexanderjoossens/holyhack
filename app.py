import openai
import os

openai.api_key = "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" # Make sure to set your API key as an environment variable

def generate_response(question):
    prompt = f"Q: {question}\nA:"
    response = openai.Completion.create(
      engine="davinci",
      prompt=prompt,
      max_tokens=1024,
      n=1,
      stop="Q:",
      temperature=0.7,
    )

    answer = response.choices[0].text.strip()
    return answer

question = "What is the capital of France?"
response = generate_response(question)
print(response)

