import requests
import json

def evaluate_interview(interview):
    answers = interview.answers.all()

    prompt = """
You are an expert technical interviewer.

Evaluate the candidate's entire interview.

Instructions:
1. Evaluate the interview as a whole.
2. Consider all answers together.
3. Be fair and objective.
"""

    #* Build dynamic prompt
    for answer in answers:
        prompt += f"""

Question:
{answer.question.question_text}

Candidate Answer:
{answer.answer_text}

"""

    # Add output instructions ONLY ONCE
    prompt += """

IMPORTANT RULES:

- Return ONLY valid JSON.
- Do NOT write explanations.
- Do NOT write markdown.
- Do NOT use ```json.
- Do NOT write any text before or after the JSON.
- The response must be a single valid JSON object.

Return exactly in this format:

{
    "score": 0,
    "strengths": "",
    "weaknesses": "",
    "feedback": ""
}
"""

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False,
            },
            timeout=120,
        )
        
        response.raise_for_status()

        ai_response = response.json().get("response")

        if not ai_response:
            raise Exception(
                "Empty response from AI model"
            )

        result = json.loads(ai_response)

        required_fields = [
            "score",
            "strengths",
            "weaknesses",
            "feedback"
        ]
        
        for field in required_fields:
            if field not in result:
                raise Exception(
                    f"Missing AI field : {field}" 
                )

        return result

    except json.JSONDecodeError:
        raise Exception(
            "AI returned invalid JSON format"
        )
        
    except requests.exceptions.RequestException:
        raise Exception(
            "Unable to connect AI service!"
        )