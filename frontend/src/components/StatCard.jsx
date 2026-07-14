import React from 'react'

const StatCard = ({icon: Icon, title, value, color}) => {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-800 hover:shadow-lg hover:shadow-blue-500/10">
            <div 
                className= {`flex h-12 w-12 items-center justify-center rounded-xl ${color} shadow-lg`}
            >
                <Icon size = {22} className="text-white" />
            </div>

            <h3 className='mt-5 text-3xl font-bold tracking-tight text-white'>
                {value}
            </h3>

            <p className='mt-2 text-sm text-slate-400'>
                {title}
            </p>
        </div>
    )
}

export default StatCard;