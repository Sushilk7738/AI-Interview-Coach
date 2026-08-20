import React, { useEffect, useState } from 'react'
import { ArrowRight, Target, CheckCircle2, Clock3, Star } from "lucide-react";
import StatCard from "../components/StatCard";
import InterviewCard from '../components/InterviewCard';
import AIRecommendationCard from "../components/AIRecommendationCard";
import PerformanceCard from '../components/PerfomanceCard';
import { getInterviews } from '../api/interviewApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";


const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);

  useEffect(()=>{

    const fetchInterviews = async () => {
        try {

          const interviewData = await getInterviews();

          setInterviews(interviewData.results || []);
          
        } catch (err) {

          console.error(err);

        }

      };

      fetchInterviews();
  }, []);



  const latestCompletedInterview = interviews
    .filter(
      (interview) => interview.status === "Completed"
    ).sort(
      (a, b)=> new Date(b.created_at) - new Date(a.created_at)
    )[0];
  

  // total interviews
  const totalInterviews = interviews.length;

  //completed interviews
  const completedInterview = interviews.filter(
    (interview) => interview.status === "Completed"
  ).length;

  // created interviews
  const createdInterviews = interviews.filter(
    (interview) => interview.status === "Created"
  ).length;


  // total score
  const totalScore = interviews.filter(
    (interview)=> interview.score !== null
  ).reduce(
    (total, interview) => total + interview.score,
    0
  ) 

  // avg score
  const averageScore = completedInterview > 0 ? Math.round(totalScore / completedInterview) : 0;
  const recentInterviews = [...interviews]
  .sort((a, b) =>new Date(b.created_at) - new Date(a.created_at))
  .slice(0, 4);

  return (
    <>

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
                  onClick={()=> navigate("/start")}
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
                    value={totalInterviews}
                    color="bg-blue-600"
                />

                <StatCard
                    icon={CheckCircle2}
                    title="Completed"
                    value={completedInterview}
                    color="bg-emerald-600"
                />

                <StatCard
                    icon={Clock3}
                    title="Pending"
                    value={createdInterviews}
                    color="bg-amber-500"
                />

                <StatCard
                    icon={Star}
                    title="Average Score"
                    value={averageScore}
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
                    onClick={()=>navigate("/interviews")}
                >
                    View All
                </button>

            </div>

            <div className="space-y-4">

              {recentInterviews.map((interview) =>(
                <InterviewCard
                  key={interview.id}
                  title={interview.role_name}
                  score={interview.score ?? "--"}
                  status={interview.status}
                  onClick={()=>
                    interview.status === "Completed"
                      ? navigate(`/result/${interview.id}`)
                      : navigate(`/interview/${interview.id}`)
                  }
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