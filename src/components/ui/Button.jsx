/* eslint-disable react/prop-types */

function Button({ children, className = "", ...props }) {
    return (
        <button className={`w-fit px-6 py-2.5 rounded-xl border dark:bg-gray-800 bg-white dark:border-gray-800 border-gray-200 dark:text-gray-100 text-gray-700 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-green-500/20 transition-all duration-300 flex items-center gap-2 text-sm shadow-sm hover:shadow-lg hover:shadow-black/5 ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button