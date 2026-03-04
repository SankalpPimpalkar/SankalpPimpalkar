/* eslint-disable react/prop-types */

function Input({ className = "", ...props }) {
    return (
        <input className={`w-full px-4 py-3 rounded-xl border dark:bg-zinc-800/50 bg-white dark:border-zinc-800 border-zinc-200 dark:text-white text-zinc-900 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-500 ${className}`} type="text" {...props} />
    )
}

export default Input