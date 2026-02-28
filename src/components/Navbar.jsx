import { NavLink } from "react-router-dom"
import Button from "./ui/Button"
import { useEffect, useState } from "react"
import { Github } from "../data/links"
import Carousel from "./ui/Carousel"

const navs = [
    {
        id: 1,
        name: "Home",
        path: "/",
        icon: "/house.png",
        className: "w-4 h-4"
    },
    {
        id: 2,
        name: "About",
        path: "/about",
        icon: "/about.png",
        className: "w-4 h-4"
    },
    // {
    //     id: 3,
    //     name: "Blogs",
    //     path: "/blogs",
    //     icon: "/article.png",
    //     className: "w-4 h-4"
    // },
    {
        id: 4,
        name: "Feedback",
        path: "/feedback",
        icon: "/feedback.png",
        className: "w-4 h-4"
    },
    {
        id: 5,
        name: "Github",
        path: Github,
        icon: "/github.png",
        className: "w-4 h-4 dark:invert"
    },
]

function Navbar() {

    const [isdarkMode, setIsDarkMode] = useState(true)

    function handleTheme() {

        const htmlElement = document.getElementsByTagName("html")[0].classList;

        if (htmlElement.contains("dark")) {
            htmlElement.replace("dark", "light");
            setIsDarkMode(false);
            localStorage.setItem("theme", "light")
        } else {
            htmlElement.replace("light", "dark");
            setIsDarkMode(true);
            localStorage.setItem("theme", "dark")
        }
    }

    useEffect(() => {

        const htmlElement = document.getElementsByTagName("html")[0].classList;
        const themeState = localStorage.getItem("theme")

        // Sets dark as default
        if (!themeState) {
            localStorage.setItem("theme", "dark");
            htmlElement.add("dark");
        } else {
            htmlElement.add(themeState)
        }
    }, [])

    return (
        <nav className="fixed top-0 py-3 sm:py-5 px-5 md:px-0 inset-x-0 w-full mx-auto bg-white/80 dark:bg-gray-primary/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800/50 z-50">
            <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="w-full py-1 flex items-center justify-between sm:hidden ">
                    <img className="w-10 h-10 rounded-full" src="/logo.jpeg" alt="logo" />

                    <Button onClick={handleTheme} className="gap-0 rounded-[30rem] px-2 py-2">
                        {
                            !isdarkMode ?
                                (
                                    <img className="w-4 h-4" src="/sun.png" alt="light-mode" />
                                ) :
                                (
                                    <img className="w-4 h-4" src="/moon.png" alt="dark-mode" />
                                )
                        }
                    </Button>
                </div>

                <Carousel>
                    {navs.map((nav) => (
                        <li key={nav.id} className="min-w-fit">
                            <NavLink
                                to={nav.path}
                                className={({ isActive }) =>
                                    `dark:hover:bg-gray-secondary hover:bg-gray-100 w-fit p-2 rounded-xl border dark:border-gray-800 border-gray-200 text-gray-500 dark:text-gray-400 transition-all duration-300 flex items-center gap-2 snap-end text-xs font-semibold ${isActive && 'dark:bg-gray-secondary/80 bg-gray-100 dark:text-white text-gray-900 border-green-500/20 shadow-sm shadow-black/5'}`
                                }
                            >
                                <img className={nav.className} src={nav.icon} alt="navIcon" />
                                <p>{nav.name}</p>
                            </NavLink>
                        </li>
                    ))}
                </Carousel>

                <Button onClick={handleTheme} className="gap-0 hidden sm:block w-14 rounded-[30rem] px-2 py-2">
                    {
                        !isdarkMode ?
                            (
                                <img className="w-4 h-4" src="/sun.png" alt="light-mode" />
                            ) :
                            (
                                <img className="w-4 h-4" src="/moon.png" alt="dark-mode" />
                            )
                    }
                </Button>
            </div>
        </nav>
    )
}

export default Navbar