import {  CheckCircle2, Clock3, Star, Target, Trophy, User } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import { getInterviews } from '../api/interviewApi';
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
    const { user } = useAuth();
    const [interviews, setInterviews] = useState([]);

    
    useEffect(()=>{

        const fetchInterviews = async ()=>{
            try {
                const interviewData = await getInterviews();

                setInterviews(interviewData);
            } catch (err) {
                toast.error("Failed to load profile statistics.");
            }
        };
        fetchInterviews();
    })
    
    const totalInterviews = interviews.length;

    const completedInterviews = interviews.filter(
        (interview) => interview.status === "Completed"
    ).length;

    const pendingInterviews = interviews.filter(
        (interview) => interview.status !== "Completed"
    ).length;
    
    const totalScore = interviews
        .filter((interview) => interview.score !== null)
        .reduce(
            (total, interview) => total + interview.score,
            0
        )

    const averageScore = 
        completedInterviews > 0
            ? Math.round(totalScore / completedInterviews)
            : 0;

    const bestScore = interviews.length > 0
        ? Math.max(
            ...interviews
                .filter((interview) => interview.score !== null)
                .map((interview) => interview.score)
        )
        : 0;
    
    return (
        <main className='bg-slate-900'>
            <div className='mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
                <div className='mb-10'>
                    <h1 className='text-4xl font-bold text-white'>
                        Profile
                    </h1>

                    <p className='mt-2 text-slate-400'>
                        View your account information and interview progress
                    </p>
                </div>

                <div className='rounded-2xl border border-slate-800 bg-slate-800/50 p-6'>
                    <div className='flex flex-col items-center gap-6 md:flex-row'>
                        <div className='flex h-24 w-24 items-center justify-center rounded-full bg-blue-600/10 ring-2 ring-blue-500/20'>
                            <User
                                size={42}
                                className="text-blue-500"
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-white">
                                {user?.username}
                            </h2>

                            <p className="mt-2 text-slate-400">
                                {user?.email}
                            </p>
                        </div>

                        <div className="rounded-xl bg-emerald-500/10 px-6 py-4 text-center">
                            <p className="text-xs font-medium uppercase tracking-wide text-emerald-400">
                                Account
                            </p>

                            <p className="mt-1 font-semibold text-white">
                                Active
                            </p>
                        </div>
                    </div>
    
                </div>

                <section className="mt-10">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            Interview Statistics
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Track your overall interview performance
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
                        <StatCard
                            icon={Target}
                            title="Total Interviews"
                            value={totalInterviews}
                            color="bg-blue-600"
                        />

                        <StatCard
                            icon={CheckCircle2}
                            title= "Completed"
                            value={completedInterviews}
                            color="bg-emerald-600"
                        />

                        <StatCard
                            icon={Clock3}
                            title="Pending"
                            value={pendingInterviews}
                            color= "bg-amber-500"
                        />

                        <StatCard
                            icon={Star}
                            title="Average Score"
                            value={averageScore}
                            color= "bg-violet-600"
                        />

                        <StatCard
                            icon={Trophy}
                            title="Best Score"
                            value={bestScore}
                            color= "bg-yellow-500"
                        />
                    </div>
                </section>
            </div>
                
        </main>
    )
}

export default Profile;