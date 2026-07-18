from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import SystemMessage, HumanMessage
import json
import os

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
    "feedback": "",
    "recommendation": ""
}


Rules:
- Score must be an integer between 0 and 100.
- 100 means an outstanding interview.
- 0 means a completely unsatisfactory interview.
- Recommendation must be a short actionable next step (1–2 sentences).
"""

    try:
        load_dotenv()
        llm = ChatGroq(
            model="llama-3.3-70b-versatile",
            temperature=0,
        )

        response = llm.invoke(
            [
                HumanMessage(
                    content=prompt
                )
            ]
        )

        ai_response = response.content

        print(ai_response)
        print(repr(ai_response))
        
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
        
    except Exception as e:
        print(type(e))
        print(e)
        raise