import React, { useEffect, useState } from 'react'
import { ArrowRight, Target, CheckCircle2, Clock3, Star } from "lucide-react";
import Navbar from '../components/Navbar';
import { getCurrentUser } from '../api/authApi';
import StatCard from "../components/StatCard";
import InterviewCard from '../components/InterviewCard';
import AIRecommendationCard from "../components/AIRecommendationCard";
import PerformanceCard from '../components/PerfomanceCard';
import { getInterviews } from '../api/interviewApi';



const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [interviews, setInterviews] = useState([]);

  useEffect(()=>{

    const fetchCurrentUser = async()=>{

      try{
        const data = await getCurrentUser();
        setUser(data);
        
        const interviewData = await getInterviews();
        setInterviews(interviewData);

        console.log(interviewData);

      } catch (err) {
        console.error(err);
      }
    };

    fetchCurrentUser()
  }, []);



  const latestCompletedInterview = interviews
    .filter(
      (interview) => interview.status === "Completed"
    ).sort(
      (a, b)=> new Date(b.created_at) - new Date(a.created_at)
    )[0];
  


  return (
    <>
      <Navbar user= {user} />

      <main className='bg-slate-900'>
        <div className='mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <section className='flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
            <div className='space-y-3'>
              <h1 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
                Welcome back, {user?.username || "User"} 
              </h1>

              <p className='max-w-2xl text-slate-400'>
                Continue practicing interviews, track your progress, and improve your confidence with AI-powered feedback.
              </p>
            </div>

            <div className="w-full lg:w-auto">

              <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 lg:w-auto"
              >
                Start Interview
                <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

            </div>
          </section>

          <section className="mt-12">

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    icon={Target}
                    title="Total Interviews"
                    value="24"
                    color="bg-blue-600"
                />

                <StatCard
                    icon={CheckCircle2}
                    title="Completed"
                    value="18"
                    color="bg-emerald-600"
                />

                <StatCard
                    icon={Clock3}
                    title="Pending"
                    value="6"
                    color="bg-amber-500"
                />

                <StatCard
                    icon={Star}
                    title="Average Score"
                    value="82%"
                    color="bg-violet-600"
                />

            </div>

        </section>

        <section className="mt-12">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold text-white">
                    Recent Interviews
                </h2>

                <button
                    type="button"
                    className="text-sm font-medium text-blue-400 transition-colors duration-300 hover:text-blue-300"
                >
                    View All
                </button>

            </div>

            <div className="space-y-4">

              {interviews.map((interview) =>(
                <InterviewCard
                  key={interview.id}
                  title={interview.role_name}
                  score={interview.score ?? "--"}
                  status={interview.status}
                />
              ))}

            </div>

        </section>

            {
              latestCompletedInterview && (
                <section className='mt-12'>
                  <AIRecommendationCard
                    title = "AI Recommendation"
                    recommendation={latestCompletedInterview.recommendation}
                  />
                </section>
              )
            }

            
        <section className="mt-12">

            <PerformanceCard/>
        </section>
        </div>
      </main>
    </>
  )
}

export default Dashboard;