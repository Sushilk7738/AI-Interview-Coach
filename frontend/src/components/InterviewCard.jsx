import { ArrowRight } from "lucide-react";

const InterviewCard = ({ title, score, status }) => {
    const buttonText = status === "Completed" ? "View Report" : "Continue";

    return (
        <div className="flex items-center justify-between rounded-2xl border 
            border-slate-800 bg-slate-800/50 p-5 transition-all duration-300 
            hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-800 
            hover:shadow-lg hover:shadow-blue-500/10"
        >
            <div className="flex-1">
                <h3 className="truncate text-lg font-semibold text-white">
                    {title}
                </h3>

                <div className="mt-3 flex items-center gap-3">

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            status === "Completed"
                                ? "bg-emerald-500/15 text-emerald-400"
                                : "bg-amber-500/15 text-amber-400"
                        }`}
                    >
                        {status}
                    </span>

                    <span className="text-sm font-medium text-slate-300">
                        {score}
                    </span>

                </div>
            </div>

            <button
                type="button"
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    status === "Completed"
                        ? "text-blue-400 hover:bg-slate-700 hover:text-white"
                        : "bg-blue-600 text-white hover:bg-blue-500"
                }`}
            >
                {buttonText}

                <ArrowRight size={18} />
            </button>

        </div>
    );
};

export default InterviewCard;