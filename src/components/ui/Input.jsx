/* eslint-disable react/prop-types */

function Input({ className = "", ...props }) {
    return (
        <input className={`w-full px-4 py-3 rounded-xl border dark:bg-gray-800/50 bg-white dark:border-gray-800 border-gray-200 dark:text-white text-gray-900 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 ${className}`} type="text" {...props} />
    )
}

export default Input