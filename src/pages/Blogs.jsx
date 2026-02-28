import { Terminal, Construction as ConstructionIcon } from "lucide-react"

function Blogs() {
    return (
        <main className="mt-28 sm:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="w-full min-h-[50vh] flex flex-col items-center justify-center border-2 border-dashed dark:border-gray-800 border-gray-100 rounded-[3rem] p-12">
                <div className="p-4 rounded-3xl bg-green-500/10 text-green-500 mb-6">
                    <ConstructionIcon size={32} />
                </div>
                <h1 className="text-2xl font-bold dark:text-gray-100 text-gray-800 mb-3">
                    Knowledge Base Syncing
                </h1>
                <p className="text-sm dark:text-gray-400 text-gray-600 text-center max-w-xs font-normal">
                    The blogs are currently being compiled into the neural network. Check back soon for deep dives into backend architecture.
                </p>
                <div className="mt-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    <Terminal size={12} />
                    <span>Status: indexing_in_progress</span>
                </div>
            </div>
        </main>
    )
}

export default Blogs