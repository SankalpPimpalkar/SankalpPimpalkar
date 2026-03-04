/* eslint-disable react/prop-types */

function Button({ children, className = "", ...props }) {
    return (
        <button className={`w-fit px-6 py-2.5 rounded-xl border dark:bg-zinc-800 bg-white dark:border-zinc-800 border-zinc-200 dark:text-zinc-100 text-zinc-700 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:border-green-500/20 transition-all duration-300 flex items-center gap-2 text-sm shadow-sm hover:shadow-lg hover:shadow-black/5 ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button