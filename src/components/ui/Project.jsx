import PropTypes from 'prop-types';

const Project = ({ id, title, description, source, demo, created_year, tech }) => {
    return (
        <div
            key={id}
            className="w-full group bg-white dark:bg-zinc-800/20 border border-zinc-100 dark:border-white/5 p-6 rounded-2xl hover:border-zinc-200 dark:hover:border-white/10 transition-all hover:-translate-y-0.5"
        >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-500 text-[8px] font-mono tracking-widest uppercase border border-green-500/20">
                            {created_year}
                        </span>
                    </div>
                    
                    <h3 className="text-lg font-bold dark:text-zinc-100 text-zinc-900 group-hover:text-green-500 transition-colors tracking-tight">
                        {String(title).replaceAll('-', ' ')}
                    </h3>
                    
                    <p className="mt-2 text-xs dark:text-zinc-400 text-zinc-500 leading-relaxed font-normal">
                        {description || 'No description added.'}
                    </p>

                    {tech && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {tech.split(',').map((item, index) => (
                                <span key={index} className="text-[9px] px-2 py-0.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-700/50">
                                    {item.trim()}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    {source && (
                        <a
                            href={source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-100 dark:border-zinc-700 transition-all text-[10px] font-bold uppercase tracking-widest"
                        >
                            Source
                        </a>
                    )}

                    {demo && (
                        <a
                            href={demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 shadow-md shadow-green-500/10 transition-all text-[10px] font-bold uppercase tracking-widest"
                        >
                            Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}


Project.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    source: PropTypes.string,
    demo: PropTypes.string,
    created_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    tech: PropTypes.string,
};

export default Project;
