import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvaluation } from "../api/interviewApi";


const Result = () => {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState(null);
  

  useEffect(()=> {
    const fetchEvaluation = async()=> {
      try {
        const response = await getEvaluation(id);
        setEvaluation(response.data);
      }
      catch (err) {
        console.error(err);
      };
    }

    fetchEvaluation();
  }, [id]);
  
  console.log(evaluation);
  
  if (!evaluation) {
    return null;
  }
  return (
    <main className="bg-slate-900 min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl font-bold text-white">
          Interview Result
        </h1>

        <div className="mt-8 rounded-2xl bg-slate-800 p-8">

            <h2 className="text-lg text-slate-400">
                Overall Score
            </h2>

            <p className="mt-2 text-6xl font-bold text-blue-500">
                {evaluation.score}/100
            </p>

            <hr className="my-8 border-slate-700" />

            <h2 className="text-xl font-semibold text-white">
                Strengths
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
                {evaluation.strengths}
            </p>
            <hr className="my-8 border-slate-700" />

            <h2 className="text-xl font-semibold text-white">
              Weaknesses
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              {evaluation.weaknesses}
            </p>
            <hr className="my-8 border-slate-700" />

            <h2 className="text-xl font-semibold text-white">
              Feedback
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              {evaluation.feedback}
            </p>
            
            <hr className="my-8 border-slate-700"/>

            <h2 className="text-xl font-semibold text-white">
              Recommendation
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              {evaluation.feedback}
            </p>
        </div>
      </div>
      
    </main>
  )
}

export default Result;