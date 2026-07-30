import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getInterviews } from "../api/interviewApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Interviews = () => {
    const navigate = useNavigate();
    const[interviews, setInterviews] = useState([]);

    useEffect(() => {

        const fetchInterviews = async () => {
            try {
                const interviewData = await getInterviews();
                setInterviews(interviewData);
            }
            catch (err) {
                toast.error("failed to load interviews.");
            }
        };
        fetchInterviews();
    }, []);

    console.log(interviews);


    return (
        <main className='bg-slate-900'>
            <div className='mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
                <div className='mb-10'>
                    <h1 className='text-4xl font-bold text-white'>
                        Interview History
                    </h1>

                    <p className='mt-2 text-slate-400'>
                        View and manage all your interview sessions.
                    </p>
                </div>

                <section className='space-y-6'>
                    {
                        interviews.map((interview) => (
                            <div
                                key={interview.id}
                                className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/10"
                            >
                                <div className='flex items-start justify-between'>
                                    <h2 className='text-xl font-semibold text-white'>
                                        {interview.role_name}
                                    </h2>

                                    <span 
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            interview.status === "Completed"
                                                ? "bg-emerald-500/15 text-emerald-400"
                                                : interview.status === "Submitted"
                                                ? "bg-purple-500/15 text-purple-400"
                                                : "bg-amber-500/15 text-amber-400"
                                        }`}
                                    >
                                        {interview.status}
                                    </span>
                                </div>
                                <p className="mt-3 text-sm text-slate-400">
                                    {new Date(interview.created_at).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>

                                <div className='mt-6 flex items-center justify-between border-t border-slate-700 pt-4'>
                                    <div>
                                        <p className='text-sm text-slate-400'>
                                            Score
                                        </p>

                                        <h3 className="mt-1 text-2xl font-bold text-white">
                                            {interview.score !== null ? `${interview.score}%` : "--"}
                                        </h3>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            interview.status === "Completed"
                                                ? navigate(`/result/${interview.id}`)
                                                : navigate(`/interview/${interview.id}`)
                                        }

                                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                            interview.status === "Completed"
                                                ? "text-blue-400 hover:bg-slate-700 hover:text-white"
                                                : "bg-blue-600 text-white hover:bg-blue-500"
                                        }`}
                                    >
                                        {interview.status === "Completed" ? "View Report" : "Continue"}

                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                    
                </section>
            </div>
        </main>
    )
}

export default Interviews;