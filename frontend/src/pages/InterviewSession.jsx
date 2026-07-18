import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { evaluateInterview, getInterview, submitInterview } from "../api/interviewApi";
import { toast } from "sonner";



const InterviewSession = () => {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const [interview, setInterview] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isEvaluating, setIsEvaluating] = useState(false);

  const loadingSteps = [
    "Saving your answers...",
    "Analyzing technical answers...",
    "Generating AI feedback...",
    "Preparing recommendations..."
  ]

  const [currentStep, setCurrentStep] = useState(0);
  
  

  useEffect(()=> {

    const fetchInterview = async() => {

      try {
        const data = await getInterview(id);
        
        setInterview(data);
      }
      catch (err) {
        toast.error("Unable to load interview.");
      }
    };

    fetchInterview();

  }, [id]);


  useEffect(() => {
    if (!isEvaluating) return;

    const interval = setInterval(() => {

      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1){
          return prev + 1;
        }

        return prev;
      });

    }, 1000);

    return ()=> clearInterval(interval);
  }, [isEvaluating]);

  if (!interview) {
      return null;
  }



  if (isEvaluating) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-900 px-6">

            <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-800 p-10 text-center shadow-xl">

                <div className="text-6xl">
                    🧠
                </div>

                <h1 className="mt-6 text-3xl font-bold text-white">
                    AI Interview Coach
                </h1>

                <p className="mt-4 animate-pulse text-lg text-blue-400">
                    Evaluating your interview...
                </p>


                <div className="mt-10 space-y-4">
                    {
                      loadingSteps.map((step, index) => (
                        <p
                          key={index}
                          className="text-left text-slate-300"
                        >
                          {index < currentStep && "✅ "}
                          {index === currentStep && "⏳ "}
                          {index > currentStep && "⚪ "}

                          {step}
                        </p>
                      ))
                    }
                </div>

            </div>

        </main>
    );
}


  const handleSubmit = async()=>{

    const payload = {
      answers : Object.entries(answers).map(([questionId, answerText]) => ({
        question: Number(questionId),
        answer_text: answerText,
      })),
    } 
    
    try {

      setIsEvaluating(true);

      await submitInterview(id, payload);
      await evaluateInterview(id);

      // to see loading UI
      await new Promise((resolve) => setTimeout(resolve, 4000));

      navigate(`/result/${id}`);
    }
    catch (err) {
      toast.error("Failed to evaluate interview."); 
    }
    finally {
      setIsEvaluating(false);
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
                disabled={isEvaluating}
                className="rounded-xl bg-blue-600 px-6 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isEvaluating ? "Evaluating Interview..." : "Submit"}
            </button>

        </section>


      </div>
    </main>
  )
}

export default InterviewSession;