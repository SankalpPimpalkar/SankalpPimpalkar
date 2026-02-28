/* eslint-disable react/prop-types */

function Link({ children, href, ...props }) {
    return (
        <a
            className="text-green-600 dark:text-green-500 hover:underline transition-all font-medium"
            target="_blank"
            href={href} {...props}>
            {children}
        </a>
    )
}

export default Link