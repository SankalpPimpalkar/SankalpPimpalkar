/* eslint-disable react/prop-types */
import { getYear, timeAgo } from "../../functions/formatDate";

const difficultyThemeClasses = {
    Easy: {
        background: 'bg-green-500 dark:bg-green-900',
        text: 'text-green-100 dark:text-green-400',
    },
    Intermediate: {
        background: 'bg-yellow-500 dark:bg-yellow-900',
        text: 'text-yellow-100 dark:text-yellow-400',
    },
    Hard: {
        background: 'bg-red-500 dark:bg-red-900',
        text: 'text-red-100 dark:text-red-400',
    },
    Advanced: {
        background: 'bg-purple-500 dark:bg-purple-900',
        text: 'text-purple-100 dark:text-purple-400',
    },
};

function Project({ id, title, description, source, demo, publishedOn }) {
    return (
        <div key={id} className="dark:bg-gray-secondary bg-gray-200 p-4 rounded-lg w-full min-h-[15rem] h-full sm:max-w-xs border dark:border-gray-tertiary border-gray-300 flex flex-col items-start justify-between">

            <div>
                <p className="font-mono text-green-500 text-lg">
                    {getYear(publishedOn)}
                </p>

                <h3 className="text-xl font-bold mt-2 dark:text-gray-200 text-gray-800">
                    {String(title).replaceAll('-', ' ')}
                </h3>

                {/* Published Date */}
                <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                    Published {timeAgo(publishedOn)}
                </p>

                <p className="mt-2 dark:text-gray-300 text-gray-600">
                    {description || 'No description Added'}
                </p>
            </div>

            <div className="mt-4 flex items-center gap-3">
                <a
                    href={source}
                    target="_blank"
                    className="dark:text-gray-300 text-gray-800 bg-gray-300 font-medium dark:hover:border-gray-300/0 hover:bg-gray-100 dark:hover:bg-gray-300/10 w-fit px-2 py-1 rounded-md border dark:border-gray-dark dark:bg-gray-dark transition-all duration-300 flex items-center gap-2 text-base">
                    Source
                </a>

                {
                    demo && (
                        <a
                            href={demo}
                            target="_blank"
                            className="dark:text-gray-300 text-gray-800 bg-gray-300 font-medium dark:hover:border-gray-300/0 hover:bg-gray-100 dark:hover:bg-gray-300/10 w-fit px-2 py-1 rounded-md border dark:border-gray-dark dark:bg-gray-dark transition-all duration-300 flex items-center gap-2 text-base">
                            Demo
                        </a>
                    )
                }
            </div>
        </div>
    );
}

export default Project;
