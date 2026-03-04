import { Github as GithubIcon, Instagram as InstagramIcon, Linkedin as LinkedinIcon, Twitter as TwitterIcon, Heart } from "lucide-react"
import { Github, Instagram, LinkedIn, X } from "../data/links"

function Footer() {
    return (
        <div className="p-8 flex flex-col items-center mt-12 border-t dark:border-zinc-800 border-zinc-100 w-full max-w-2xl mx-auto">
            <p className="dark:text-zinc-400 text-zinc-500 text-sm flex items-center gap-2">
                Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Sankalp Pimpalkar
            </p>
            <ul className="mt-6 flex flex-wrap justify-center items-center gap-6">
                <li>
                    <a className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" target="_blank" href={Github} aria-label="Github">
                        <GithubIcon size={20} />
                    </a>
                </li>
                <li>
                    <a className="text-zinc-400 hover:text-[#E4405F] transition-colors" target="_blank" href={Instagram} aria-label="Instagram">
                        <InstagramIcon size={20} />
                    </a>
                </li>
                <li>
                    <a className="text-zinc-400 hover:text-[#0A66C2] transition-colors" target="_blank" href={LinkedIn} aria-label="LinkedIn">
                        <LinkedinIcon size={20} />
                    </a>
                </li>
                <li>
                    <a className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" target="_blank" href={X} aria-label="Twitter">
                        <TwitterIcon size={20} />
                    </a>
                </li>
            </ul>
            <p className="mt-8 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                © {new Date().getFullYear()} • Systems Architect
            </p>
        </div>
    )
}

export default Footer