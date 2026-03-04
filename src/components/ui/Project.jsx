/* eslint-disable react/prop-types */
import { getYear, timeAgo } from "../../functions/formatDate";

function Project({ id, title, description, source, demo, created_year, tech }) {
    return (
        <div
            key={id}
            className="dark:bg-zinc-800/20 bg-zinc-50/50 p-6 rounded-2xl w-full min-h-[16rem] h-full sm:max-w-xs border dark:border-white/5 border-zinc-200/60 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-start justify-between group">

            <div>
                <p className="font-mono text-green-500 text-xs font-semibold mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    {created_year}
                </p>

                <h3 className="text-xl font-bold dark:text-zinc-100 text-zinc-800 group-hover:text-green-500 transition-colors">
                    {String(title).replaceAll('-', ' ')}
                </h3>

                <p className="mt-3 text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed">
                    {description || 'No description added.'}
                </p>

                {tech && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {tech.split(',').map((item, index) => (
                            <span key={index} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50">
                                {item.trim()}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-6 flex items-center gap-3 w-full">
                {source && (
                    <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center dark:text-zinc-300 text-zinc-600 dark:bg-zinc-800 bg-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700 px-3 py-2 rounded-lg border dark:border-zinc-700 border-zinc-200 transition-all duration-300 text-xs font-medium">
                        Source
                    </a>
                )}

                {demo && (
                    <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center dark:text-zinc-100 text-white bg-green-600 hover:bg-green-700 dark:bg-green-500/20 dark:hover:bg-green-500/30 dark:border dark:border-green-500/30 px-3 py-2 rounded-lg transition-all duration-300 text-xs font-medium">
                        Live Demo
                    </a>
                )}
            </div>
        </div>
    );
}

export default Project;
