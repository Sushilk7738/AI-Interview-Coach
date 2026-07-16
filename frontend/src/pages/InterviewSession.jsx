import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { evaluateInterview, getInterview, submitInterview } from "../api/interviewApi";
import { toast } from "sonner";


const InterviewSession = () => {
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [answers, setAnswers] = useState({});
  

  useEffect(()=> {

    const fetchInterview = async() => {

      try {
        const data = await getInterview(id);
        console.log(data);
        
        setInterview(data);
      }
      catch (err) {
        toast.error("Unable to load interview.");
      }
    };

    fetchInterview();

  }, [id]);
  
  if (!interview) {
      return null;
  }


  const handleSubmit = async()=>{

    const payload = {
      answers : Object.entries(answers).map(([questionId, answerText]) => ({
        question: Number(questionId),
        answer_text: answerText,
      })),
    } 
    
    try {

      console.log(payload);
      await submitInterview(id, payload);
      await evaluateInterview(id);

      toast.success("Interview evaluated successfully.");
    }
    catch (err) {
      toast.error("Failed to evaluate interview."); 
    }
    
  };




  
  return (
    <main className="bg-slate-900">
      <div className="mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {interview.role_name}
          </h1>

          <p className="text-slate-400">
            Answer all questions before submitting your interview.
          </p>

        </section>

        <section className="mt-10 space-y-6">
          {
            interview.questions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6"
              > 
                <h2 className="text-lg font-semibold text-white">
                  Question {index + 1}
                </h2>

                <p className="mt-3 text-slate-300">
                  {question.question_text}
                </p>

                <textarea
                  rows={5}
                  value={answers[question.id] || ""}
                  onChange={(e) => setAnswers({
                    ...answers,
                    [question.id]: e.target.value,
                  })
                  }
                  placeholder="Type your answer..."
                  className="mt-5 w-full rounded-xl border border-slate-700 p-4 text-white outline-none transition-all duration-300 focus:border-blue-500"
                />
              </div>
            ))
          }
        </section>

        <section className="mt-8 flex justify-end">

            <button
                onClick={handleSubmit}
                className="rounded-xl bg-blue-600 px-6 py-3 text-white"
            >
                Test Payload
            </button>

        </section>


      </div>
    </main>
  )
}

export default InterviewSession;