import { useEffect, useState } from "react"
import Project from "../components/ui/Project"
import Work from "../components/ui/Work"
import { skills, works } from "../data/data"

function Home() {

    const [repos, setRepos] = useState([])

    const fetchRepos = async () => {
        try {
            const response = await fetch('https://api.github.com/users/SankalpPimpalkar/repos?sort=created')
            const data = await response.json()
            setRepos(data)
            console.log(data)
        } catch (error) {
            setRepos([])
        }
    }

    useEffect(() => {
        if (repos.length == 0) {
            fetchRepos()
        }

    }, [])

    return (
        <main>
            <section className="mt-28 sm:mt-16 flex flex-col gap-4 items-start sm:flex-row-reverse sm:items-center justify-between">
                <img className="w-32 h-32 my-2" src="./enderman.gif" alt="enderman" />

                <span>
                    <h1 className="text-3xl font-bold dark:text-gray-200 text-gray-800">
                        Hey, I&apos;m Sankalp
                    </h1>
                    <p className="w-full max-w-sm mt-2 font-medium dark:text-gray-200 text-gray-600 text-lg leading-relaxed">
                        I&apos;m a full stack developer with a dream of becoming a senior software engineer one day 👨‍🎓
                    </p>
                </span>
            </section>

            <section className="mt-8">
                <h3 className="text-xl font-bold dark:text-gray-200 text-gray-600">
                    Specialties
                </h3>

                <ul className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4 items-start">
                    {
                        skills.map(skill => (
                            <li key={skill.description} className="flex items-center gap-2 md:border border-gray-300 dark:md:border-gray-secondary md:p-3 rounded-lg w-full md:max-w-xs h-full md:h-20">
                                <i className={`${skill.iconClass} text-3xl`} alt="skillIcon" />
                                <p className="text-base font-medium dark:text-gray-200 text-gray-700">
                                    {skill.description}
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </section>

            <section className="mt-8">
                <h3 className="text-xl font-bold dark:text-gray-200 text-gray-600">
                    My Work
                </h3>

                {repos && repos.length > 0 ? (
                    <ul className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4 items-start">
                        {repos.map(repo => (
                            <Project
                                key={repo.id}
                                id={repo.id}
                                title={repo.name}
                                publishedOn={repo.created_at}
                                description={repo.description}
                                source={repo.html_url}
                                demo={repo.homepage}
                                level={repo.level}
                                language={repo.language}
                            />
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Failed to fetch Repositories. 
                        Please try again later.
                    </p>
                )}
            </section>


            <section className="mt-8">
                <h3 className="text-xl font-bold dark:text-gray-200 text-gray-600">
                    Work Experience
                </h3>

                <ul className="mt-4 flex flex-col items-start w-full">
                    {
                        works.map((work) => (
                            <Work
                                key={work.id}
                                companyName={work.companyName}
                                role={work.role}
                                companylocation={work.location}
                                description={work.companyDescription}
                                respAndAchievements={work.respAndAchievements}
                                skillUtilized={work.skillUtilized}
                            />
                        ))
                    }
                </ul>
            </section>
        </main>
    )
}

export default Home