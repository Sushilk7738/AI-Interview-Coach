import { TrendingUp } from "lucide-react";

const PerformanceCard = () => {
    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6">

            <div className="mb-6 flex items-center gap-3">

                <TrendingUp
                    size={24}
                    className="text-blue-500"
                />

                <h2 className="text-xl font-semibold text-white">
                    Performance Overview
                </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

                <div>

                    <h3 className="mb-3 text-lg font-medium text-emerald-400">
                        Strengths
                    </h3>

                    <ul className="space-y-2 text-slate-300">
                        <li>• Python Fundamentals</li>
                        <li>• Django REST Framework</li>
                        <li>• Problem Solving</li>
                    </ul>

                </div>

                <div>

                    <h3 className="mb-3 text-lg font-medium text-amber-400">
                        Areas to Improve
                    </h3>

                    <ul className="space-y-2 text-slate-300">
                        <li>• SQL Optimization</li>
                        <li>• System Design</li>
                        <li>• Time Management</li>
                    </ul>

                </div>

            </div>

        </section>
    );
};

export default PerformanceCard;