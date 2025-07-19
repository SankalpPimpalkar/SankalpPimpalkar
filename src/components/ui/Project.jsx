/* eslint-disable react/prop-types */
import { getYear, timeAgo } from "../../functions/formatDate";

function Project({ id, title, description, source, demo, created_year }) {
    return (
        <div
            key={id}
            className="dark:bg-gray-secondary bg-gray-50 p-4 rounded-lg w-full min-h-[15rem] h-full sm:max-w-xs border dark:border-gray-200/10 border-gray-150 flex flex-col items-start justify-between">

            <div>
                <p className="font-mono text-green-500 text-lg">
                    {created_year}
                </p>

                <h3 className="text-lg font-bold mt-2 dark:text-gray-200 text-gray-800">
                    {String(title).replaceAll('-', ' ')}
                </h3>

                <p className="mt-2 text-sm dark:text-gray-300 text-gray-600">
                    {description || 'No description added.'}
                </p>
            </div>

            <div className="mt-4 flex items-center gap-2">
                {source && (
                    <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dark:text-gray-300 text-gray-500 bg-gray-100 font-medium dark:hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-300/10 w-fit px-3 py-1 rounded-md border dark:border-gray-dark dark:bg-gray-dark transition-all duration-300 flex items-center gap-2 text-xs">
                        Source
                    </a>
                )}

                {demo && (
                    <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dark:text-gray-300 text-gray-500 bg-gray-100 font-medium dark:hover:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-300/10 w-fit px-3 py-1 rounded-md border dark:border-gray-dark dark:bg-gray-dark transition-all duration-300 flex items-center gap-2 text-xs">
                        Demo
                    </a>
                )}
            </div>
        </div>
    );
}

export default Project;
