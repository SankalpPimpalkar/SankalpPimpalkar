/* eslint-disable react/prop-types */
import { useState } from "react"

function Work({ companyName, role, companylocation, description, respAndAchievements = [], skillUtilized = [] }) {

    const [showState, setShowState] = useState(false)

    return (
        <div className="border rounded-2xl dark:bg-zinc-800/20 bg-zinc-50/50 dark:border-white/5 border-zinc-200/60 p-6 w-full max-w-[40rem] hover:-translate-y-0.5 transition-all duration-300 group">
            <div className="flex flex-col gap-4 items-start md:flex-row md:items-center md:gap-0 justify-between">
                <span>
                    <h3 className="text-xl mb-1 font-bold dark:text-zinc-100 text-zinc-800 group-hover:text-green-500 transition-colors duration-300">
                        {companyName}
                    </h3>
                    <h4 className="text-sm mb-1 dark:text-green-500 text-green-600 font-semibold tracking-wide">
                        {role}
                    </h4>
                    <h4 className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                        {companylocation}
                    </h4>
                </span>

                <button className="dark:text-zinc-300 text-zinc-600 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 px-4 py-2 rounded-xl border dark:border-zinc-700 border-zinc-200 transition-all duration-300 flex items-center gap-2 mr-2 text-xs font-semibold"
                    onClick={() => setShowState(!showState)}
                >
                    {
                        showState ? "Show less" : "Show more"
                    }
                </button>
            </div>

            <div className={`mt-8 ${showState ? "animate-in slide-in-from-top-4 fade-in duration-500 block" : "hidden"}`}>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] mb-3 font-bold text-zinc-400 dark:text-zinc-500">
                            Context
                        </h3>
                        <p className="text-sm dark:text-zinc-300 text-zinc-600 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] mb-3 font-bold text-zinc-400 dark:text-zinc-500">
                            Key Impact
                        </h3>
                        <ul className="dark:text-zinc-300 text-zinc-600 space-y-3">
                            {
                                respAndAchievements.map((item, index) => (
                                    <li key={index} className="flex gap-3 text-sm">
                                        <span className="text-green-500 font-bold">•</span>
                                        {item}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[10px] uppercase tracking-[0.2em] mb-3 font-bold text-zinc-400 dark:text-zinc-500">
                            Technologies
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {
                                skillUtilized.map((item, index) => (
                                    <span key={index} className="px-2.5 py-1 rounded-lg bg-green-500/5 text-green-600 dark:text-green-400 text-[10px] font-bold border border-green-500/10 uppercase tracking-tighter">
                                        {item}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Work