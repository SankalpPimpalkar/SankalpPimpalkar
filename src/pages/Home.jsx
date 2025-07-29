import Project from "../components/ui/Project"
import Work from "../components/ui/Work"
import { skills, works, projects, tagLine } from "../data/data"
import { Helmet } from "react-helmet"

function Home() {

    return (
        <main>
            <Helmet>
                <title>Sankalp Pimpalkar | Full Stack Developer</title>
                <meta name="description" content="Welcome to the portfolio of Sankalp Pimpalkar, a full stack developer specializing in React, Django, and AWS." />
                <meta name="keywords" content="Sankalp Pimpalkar, Full Stack Developer, React.js, Django, Portfolio" />
                <meta property="og:title" content="Sankalp Pimpalkar | Portfolio" />
                <meta property="og:description" content="Explore Sankalp's projects, experience, and skills as a backend and frontend developer." />
                <meta property="og:image" content="https://shanky.in/logo.jpeg" />
                <meta property="og:url" content="https://shanky.in/" />
                <link rel="canonical" href="https://shanky.in/" />
            </Helmet>


            <section className="mt-28 sm:mt-16 flex flex-col gap-4 items-start sm:flex-row-reverse sm:items-center justify-between">
                <img className="w-32 h-32 my-2" src="./enderman.gif" alt="enderman" />

                <span>
                    <h1 className="text-3xl font-bold dark:text-gray-200 text-gray-800">
                        Hey, I&apos;m Sankalp
                    </h1>
                    <p className="w-full max-w-sm mt-2 text-sm dark:text-gray-200 text-gray-600 leading-relaxed">
                        {tagLine}
                    </p>

                    <a href='/Sankalp-Pimpalkar-Resume.pdf' target="_blank" className="border border-gray-300 dark:border-none text-gray-600 dark:bg-gray-secondary dark:text-gray-300 active:bg-gray-100 dark:active:bg-gray-secondary/40 px-4 py-2 text-xs mt-2 inline-block rounded-md">
                        View Resume
                    </a>
                </span>
            </section>

            <section className="mt-8">
                <h3 className="text-xl font-bold dark:text-gray-200 text-gray-600">
                    Specialties
                </h3>

                <ul className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4 items-start">
                    {
                        skills.map(skill => (
                            <li key={skill.description} className="flex items-center gap-2 border border-gray-150 bg-gray-50 dark:bg-gray-secondary/30 dark:border-gray-secondary p-3 rounded-lg w-full md:max-w-xs h-full md:h-20">
                                <i className={`${skill.iconClass} text-3xl`} alt="skillIcon" />
                                <p className="text-sm font-medium dark:text-gray-200 text-gray-700">
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

                <ul className="flex flex-wrap gap-2 mt-4">
                    {
                        projects.map(project => (
                            <Project
                                key={project.id}
                                id={project.id}
                                title={project.name}
                                created_year={project.created_year}
                                description={project.description}
                                source={project.source_code}
                                demo={project.demo}
                            />
                        ))
                    }
                </ul>
            </section>


            <section className="mt-8">
                <h3 className="text-xl font-bold dark:text-gray-200 text-gray-600">
                    Work Experience
                </h3>

                <ul className="mt-4 flex flex-col gap-2 items-start w-full">
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