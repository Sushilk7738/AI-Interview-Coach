import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { createInterview, getRoles } from '../api/interviewApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';



const StartInterview = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);



  const navigate = useNavigate();

  const handleStartInterview = async() => {
    try {
      const interview = await createInterview(selectedRole);
      toast.success("Interview created successfully.");
      navigate(`/interview/${interview.id}`);
    }
    catch (err) {
      toast.error("Failed to start interview.");
    }
  }


  useEffect(()=>{
    const fetchRoles = async ()=> {
      try {
        const data = await getRoles();
        setRoles(data);
      }
      catch (err) {
        toast.error("Unable to load roles.");
      }
    };

    fetchRoles();
  }, []);
  
  
  return (
    <>
      <main className='bg-slate-900'>
        <div className='mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <section className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
              Start New Interview
            </h1> 

            <p className='text-slate-400'>
              Choose a role to begin your interview.
            </p>
          </section>

          <section className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {
              roles.map((role) => (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                          selectedRole === role.id
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-slate-800 bg-slate-800/50 hover:border-blue-500 hover:bg-slate-800"
                  }`}
                  
                >
                  <h3 className='text-lg font-semibold text-white'>
                    {role.name}
                  </h3>
                </div>
              ))
            }
          </section>

          <section className="mt-10 flex justify-end">

              <button
                  type="button"
                  disabled={!selectedRole}
                  className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                      selectedRole
                          ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "cursor-not-allowed bg-slate-700 text-slate-400"
                  }`}

                  onClick={handleStartInterview}
              >
                  Start Interview
              </button>

          </section>
        </div>
      </main>
    </>
  )
}

export default StartInterview;