import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvaluation } from "../api/interviewApi";

const Result = () => {
  const { id } = useParams();
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await getEvaluation(id);
        setEvaluation(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvaluation();
  }, [id]);

  if (!evaluation) {
    return null;
  }

  const scoreColor =
    evaluation.score >= 80
      ? "text-green-400"
      : evaluation.score >= 60
      ? "text-yellow-400"
      : "text-red-400";

  const performance =
    evaluation.score >= 80
      ? "Excellent 🔥"
      : evaluation.score >= 60
      ? "Good 👍"
      : "Needs Improvement 💪";

  const badgeColor =
    evaluation.score >= 80
      ? "bg-green-500/20 text-green-400 border border-green-500/30"
      : evaluation.score >= 60
      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
      : "bg-red-500/20 text-red-400 border border-red-500/30";

  return (
    <main className="min-h-screen bg-slate-900 py-8 md:py-12">
      <div className="mx-auto w-full max-w-4xl px-4">

        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Interview Result
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            AI-Powered Interview Perfomance Report
          </p>
        </header>

        
        {/* SCORE CARD */}

        <div className="mt-5 rounded-3xl border border-slate-700 bg-slate-800 p-8 text-center shadow-xl md:p-12">

          <h2 className="text-lg font-medium text-slate-400">
            Overall Score
          </h2>

          <p
            className={`mt-6 text-6xl font-extrabold md:text-8xl ${scoreColor}`}
          >
            {evaluation.score}
            <span className="text-3xl text-slate-500 md:text-5xl">
              /100
            </span>
          </p>

          <span
            className={`mt-6 inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold md:text-base ${badgeColor}`}
          >
            {performance}
          </span>

        </div>

        {/* REPORT CARD */}

        <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-xl md:p-10">

          {/* Strengths */}

          <section>

            <h2 className="text-2xl font-bold text-white">
              💪 Strengths
            </h2>

            <p className="mt-4 leading-8 text-slate-300">
              {evaluation.strengths}
            </p>

          </section>

          <hr className="my-8 border-slate-700" />

          {/* Weaknesses */}

          <section>

            <h2 className="text-2xl font-bold text-white">
              ⚠️ Weaknesses
            </h2>

            <p className="mt-4 leading-8 text-slate-300">
              {evaluation.weaknesses}
            </p>

          </section>

          <hr className="my-8 border-slate-700" />

          {/* Feedback */}

          <section>

            <h2 className="text-2xl font-bold text-white">
              📝 Feedback
            </h2>

            <p className="mt-4 leading-8 text-slate-300">
              {evaluation.feedback}
            </p>

          </section>

          <hr className="my-8 border-slate-700" />

          {/* Recommendation */}

          <section>

            <h2 className="text-2xl font-bold text-white">
              🚀 Recommendation
            </h2>

            <p className="mt-4 leading-8 text-slate-300">
              {evaluation.recommendation}
            </p>

          </section>

        </div>

      </div>
    </main>
  );
};

export default Result;