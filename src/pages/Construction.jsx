import { Construction as ConstructionIcon, Home } from "lucide-react"
import { NavLink } from "react-router-dom"
import { Helmet } from "react-helmet"

function Construction() {
    return (
        <main className="min-h-[80vh] flex flex-col items-center justify-center animate-in zoom-in fade-in duration-700">
            <Helmet>
                <title>404 - Area Restricted | Sankalp Pimpalkar</title>
                <meta name="description" content="This section of the portfolio is currently undergoing optimization. Please return to the main hub." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <div className="relative mb-8">
                <ConstructionIcon size={64} className="text-green-500 animate-pulse" />
                <div className="absolute -inset-4 bg-green-500/10 rounded-full blur-xl animate-pulse"></div>
            </div>

            <h1 className="text-3xl font-bold dark:text-zinc-100 text-zinc-800 mb-4">
                Area Restricted
            </h1>
            
            <p className="text-base dark:text-zinc-400 text-zinc-600 text-center max-w-sm mb-12 font-normal">
                This sector of the portfolio is currently undergoing optimization. Please return to the main hub.
            </p>

            <NavLink to="/" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-green-500/20">
                <Home size={18} />
                Return Home
            </NavLink>
        </main>
    )
}

export default Construction