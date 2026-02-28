import Project from "../components/ui/Project"
import Work from "../components/ui/Work"
import { skills, works, projects, tagLine } from "../data/data"
import { Helmet } from "react-helmet"

import * as LucideIcons from "lucide-react"

function Home() {

    const LucideIcon = ({ name, ...props }) => {
        const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
        return <Icon {...props} />;
    };

    return (
        <main>
            <Helmet>
                <title>Sankalp Pimpalkar | Backend Developer</title>
                <meta name="description" content="Portfolio of Sankalp Pimpalkar, a Backend Developer specializing in Node.js, Django, and AWS." />
                <meta name="keywords" content="Sankalp Pimpalkar, Backend Developer, Node.js, Django, AWS, Portfolio" />
                <meta property="og:title" content="Sankalp Pimpalkar | Portfolio" />
                <meta property="og:description" content="Explore Sankalp's projects, experience, and skills in backend systems." />
                <meta property="og:image" content="https://shanky.in/logo.jpeg" />
                <meta property="og:url" content="https://shanky.in/" />
                <link rel="canonical" href="https://shanky.in/" />
            </Helmet>


            <section className="mt-28 sm:mt-16 flex flex-col gap-6 items-start sm:flex-row-reverse sm:items-center justify-between">
                <div className="relative group">
                    <img className="w-32 h-32 my-2 rounded-2xl group-hover:scale-105 transition-transform duration-500" src="./enderman.gif" alt="enderman" />
                    <div className="absolute -inset-1 bg-green-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-widest animate-pulse">
                            System Active
                        </span>
                    </div>
                    
                    <h1 className="text-4xl font-bold dark:text-gray-100 text-gray-800 tracking-tight">
                        Sankalp Pimpalkar
                    </h1>
                    
                    <h2 className="text-xl font-mono text-green-500 mt-1 font-semibold flex items-center gap-2">
                        <span className="text-gray-400">&gt;</span> Backend Developer
                    </h2>

                    <p className="w-full max-w-md mt-4 text-base dark:text-gray-400 text-gray-600 leading-relaxed font-normal">
                        {tagLine}
                    </p>

                    <div className="flex items-center gap-3 mt-6">
                        <a href='/Sankalp-Pimpalkar-Resume.pdf' target="_blank" className="dark:bg-gray-secondary dark:text-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-200/20 px-5 py-2.5 text-xs font-medium rounded-lg border dark:border-gray-200/5 transition-all duration-300">
                            View Resume
                        </a>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-wider">Available for projects</span>
                    </div>
                </div>
            </section>

            <section className="mt-12">
                <h3 className="text-xl font-bold dark:text-gray-200 text-gray-800">
                    Specialties
                </h3>

                <div className="flex flex-col gap-8 mt-6">
                    {skills.map((category) => (
                        <div key={category.category}>
                            <h4 className="text-xs font-mono text-green-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-green-500/30"></span>
                                {category.category}
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {category.items.map((skill) => (
                                    <li key={skill.name} className="flex items-center gap-3 border dark:bg-gray-secondary/30 bg-white dark:border-gray-800 border-gray-200/60 p-3 rounded-xl hover:border-green-500/30 transition-all duration-300 group">
                                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 group-hover:text-green-500 transition-colors">
                                            <LucideIcon name={skill.icon} size={18} strokeWidth={2} />
                                        </div>
                                        <p className="text-sm font-medium dark:text-gray-300 text-gray-700">
                                            {skill.name}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
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
                                tech={project.tech}
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