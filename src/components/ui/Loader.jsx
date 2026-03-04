import { Terminal, Database, Server, Cpu, Globe } from "lucide-react";
import { useState, useEffect } from "react";

function Loader() {
    const [text, setText] = useState("INITIALIZING_KERNEL");
    const statuses = [
        "BOOTING_SYSTEM...",
        "LOADING_MODULES...",
        "ESTABLISHING_DATABASE_CONNECTION...",
        "SYNCING_NEURAL_LINKS...",
        "PREPARING_UI_GATEWAY...",
        "READY_FOR_DEPLOYMENT"
    ];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(statuses[i % statuses.length]);
            i++;
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#181818] transition-colors duration-500">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-500/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-green-500/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="relative">
                {/* Outer Rotating Ring */}
                <div className="w-32 h-32 rounded-full border-t-2 border-b-2 border-green-500/20 animate-spin duration-[3000ms]"></div>
                
                {/* Inner Pulsing Core */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-green-500/20 rounded-full blur-md animate-pulse"></div>
                        <div className="relative bg-white dark:bg-zinc-primary p-5 rounded-2xl border border-green-500/30 shadow-lg shadow-green-500/10">
                            <Terminal className="text-green-500 animate-bounce" size={32} />
                        </div>
                    </div>
                </div>

                {/* Satellite Icons */}
                <div className="absolute -top-4 -right-4 bg-white dark:bg-zinc-primary p-2 rounded-lg border border-zinc-100 dark:border-zinc-800 animate-bounce delay-100 shadow-sm">
                    <Database size={14} className="text-green-500/70" />
                </div>
                <div className="absolute -bottom-2 -left-4 bg-white dark:bg-zinc-primary p-2 rounded-lg border border-zinc-100 dark:border-zinc-800 animate-bounce delay-300 shadow-sm">
                    <Server size={14} className="text-green-500/70" />
                </div>
            </div>

            <div className="mt-12 text-center">
                <div className="flex items-center gap-2 mb-2 justify-center">
                    <Cpu size={14} className="text-green-500 animate-spin duration-[4000ms]" />
                    <h2 className="text-[10px] font-mono font-bold tracking-[0.3em] text-green-500 uppercase">
                        System Loading
                    </h2>
                </div>
                <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 tracking-wider">
                    {text}
                </p>
                
                {/* Progress Bar Mockup */}
                <div className="mt-6 w-48 h-[2px] bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                    <div className="absolute inset-y-0 left-0 bg-green-500 animate-[loading_2s_infinite_ease-in-out]"></div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes loading {
                    0% { width: 0%; left: 0%; }
                    50% { width: 40%; left: 30%; }
                    100% { width: 0%; left: 100%; }
                }
            `}} />
        </div>
    );
}

export default Loader;