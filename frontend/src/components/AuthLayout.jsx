const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-lg rounded-2xl bg-slate-900 p-8 shadow-2xl animate__animated animate__fadeInUp">

                <div className="mb-6 text-center">

                    <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
                        ⚡AI Interview Coach
                    </span>

                </div>

                <div className="mb-8">

                    <h2 className="text-3xl font-bold text-white">
                        {title}
                    </h2>

                    <p className="mt-2 text-slate-400 leading-relaxed">
                        {subtitle}
                    </p>

                </div>

                {children}

            </div>

        </div>
    );
};

export default AuthLayout;