import { NavLink } from "react-router-dom"
import Button from "./ui/Button"
import { useEffect, useState } from "react"
import { Github as GithubLink } from "../data/links"
import Carousel from "./ui/Carousel"
import { Home, User, FileText, MessageSquare, Github, Sun, Moon, Settings } from "lucide-react"

const navs = [
    {
        id: 1,
        name: "Home",
        path: "/",
        icon: Home,
    },
    {
        id: 2,
        name: "About",
        path: "/about",
        icon: User,
    },
    {
        id: 3,
        name: "Blogs",
        path: "/blogs",
        icon: FileText,
    },
    {
        id: 4,
        name: "Community & Clients",
        path: "/community",
        icon: MessageSquare,
    },
    {
        id: 5,
        name: "Github",
        path: GithubLink,
        icon: Github,
    },
    {
        id: 6,
        name: "Admin",
        path: "/admin",
        icon: Settings,
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
        <nav className="fixed top-0 py-3 sm:py-5 px-5 md:px-0 inset-x-0 w-full mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800/50 z-50">
            <div className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="w-full py-1 flex items-center justify-between sm:hidden ">
                    <img className="w-10 h-10 rounded-full" src="/logo.jpeg" alt="logo" />

                    <Button onClick={handleTheme} className="gap-0 rounded-full w-10 h-10 p-0 flex items-center justify-center border border-zinc-100 dark:border-zinc-800 bg-transparent">
                        {
                            !isdarkMode ?
                                <Sun size={18} className="text-zinc-600" /> :
                                <Moon size={18} className="text-zinc-400" />
                        }
                    </Button>
                </div>

                <Carousel>
                    {navs.map((nav) => (
                        <li key={nav.id} className="min-w-fit">
                            <NavLink
                                to={nav.path}
                                className={({ isActive }) =>
                                    `dark:hover:bg-zinc-800 hover:bg-zinc-100 w-fit p-2 px-3 rounded-xl border dark:border-zinc-800 border-zinc-200 text-zinc-500 dark:text-zinc-400 transition-all duration-300 flex items-center gap-2 snap-end text-xs font-semibold ${isActive && 'dark:bg-zinc-800/80 bg-zinc-100 dark:text-white text-zinc-900 border-zinc-300 dark:border-zinc-700 shadow-sm'}`
                                }
                            >
                                <nav.icon size={14} strokeWidth={2.5} />
                                <p>{nav.name}</p>
                            </NavLink>
                        </li>
                    ))}
                </Carousel>

                <Button onClick={handleTheme} className="gap-0 hidden sm:flex w-10 h-10 rounded-full p-0 items-center justify-center border dark:border-zinc-800 border-zinc-200 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    {
                        !isdarkMode ?
                            <Sun size={18} className="text-zinc-600" /> :
                            <Moon size={18} className="text-zinc-400" />
                    }
                </Button>
            </div>
        </nav>
    )
}

export default Navbar