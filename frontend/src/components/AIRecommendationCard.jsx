import { Sparkles } from "lucide-react";

const AIRecommendationCard = ({ title, recommendation }) => {
    return (
        <section className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-slate-800/50 p-6">

            <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
                    <Sparkles size={24} className="text-white" />
                </div>

                <div>

                    <h2 className="text-xl font-semibold text-white">
                        {title}
                    </h2>

                    <p className="mt-3 leading-7 text-slate-300">
                        {recommendation}
                    </p>
                </div>

            </div>

        </section>
    );
};

export default AIRecommendationCard;