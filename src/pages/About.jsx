import { Helmet } from "react-helmet";
import Link from "../components/ui/Link";
import { College, Git, HTML, Nodejs, Django, ReactNative } from "../data/links";
import { useState, useEffect } from "react";
import { getSiteSettings } from "../functions/siteSettingsService";
import BlockRenderer from "../components/ui/BlockRenderer";

function About() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            const data = await getSiteSettings();
            if (data) setSettings(data);
        };
        fetchSettings();
    }, []);

    return (
        <main className="mt-28 sm:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Helmet>
                <title>About | Sankalp Pimpalkar</title>
                <meta name="description" content="Learn more about Sankalp Pimpalkar, a Backend Developer from India with a passion for scalable systems and cloud architecture." />
                <meta name="keywords" content="About Sankalp, Backend Developer, Node.js Developer, Django Developer" />
                <meta property="og:title" content="About | Sankalp Pimpalkar" />
                <meta property="og:description" content="Background and journey of Sankalp, a logic-driven backend engineer." />
                <meta property="og:image" content="https://shanky.in/logo.jpeg" />
                <meta property="og:url" content="https://shanky.in/about" />
                <link rel="canonical" href="https://shanky.in/about" />
            </Helmet>

            <div className="flex items-center gap-6 mb-12">
                <div className="relative group">
                    <img className="w-24 h-24 object-cover rounded-2xl group-hover:rotate-3 transition-all duration-500" src={settings?.profileImage || "/me.jpeg"} alt="profile" />
                    <div className="absolute -inset-1 bg-white/5 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold dark:text-zinc-100 text-zinc-800 tracking-tight">
                        About Me
                    </h1>
                    <p className="text-sm font-mono text-green-500 mt-1 uppercase tracking-[0.2em]">
                        Full Stack & AI Engineer
                    </p>
                </div>
            </div>

            <section className="flex flex-col gap-6 items-start">
                <div className="space-y-6 text-base dark:text-zinc-300 text-zinc-600 leading-relaxed max-w-2xl font-normal">
                    {settings?.aboutBlocks && settings.aboutBlocks.length > 0 ? (
                        <BlockRenderer blocks={settings.aboutBlocks} />
                    ) : (
                        <>
                            <p>
                                I&apos;m <span className="dark:text-white text-zinc-900 font-semibold">Sankalp Pimpalkar</span>, a Full Stack & AI Engineer and Engineering Student at
                                <Link href={College}>
                                    {' '}Terna Engineering College, Navi Mumbai{' '}
                                </Link>.
                                I specialize in architecting intelligent, high-performance systems that bridge the gap between complex backends and intuitive user experiences.
                            </p>

                            <p>
                                My work is defined by a modular approach to engineering. I specialize in building cross-platform applications with 
                                <Link href={ReactNative}>{' '}React Native{' '}</Link>, 
                                integrating advanced <span className="dark:text-white text-zinc-900 font-semibold whitespace-nowrap">AI & LLM workflows</span>, 
                                and designing rock-solid backends using 
                                <Link href={Nodejs}>{' '}Node.js{' '}</Link> and 
                                <Link href={Django}>{' '}Django{' '}</Link>.
                            </p>

                            <div className="p-6 border dark:bg-zinc-800/20 bg-zinc-50/50 dark:border-white/5 border-zinc-200/60 rounded-2xl my-8 hover:-translate-y-0.5 transition-all duration-300">
                                <h3 className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4">Core Philosophy</h3>
                                <p className="italic text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                    &quot;I believe that engineering is about solving human problems with elegant code. Whether it&apos;s an AI-driven agent, a mobile interface, or a complex API, the goal is always speed, security, and seamless integration.&quot;
                                </p>
                            </div>

                            <p>
                                Beyond traditional web frameworks, I enjoy exploring cloud infrastructure on
                                <Link href={Git}>{' '}AWS{' '}</Link>,
                                containerization with Docker, and optimizing database schemas in 
                                <span className="dark:text-white text-zinc-900 font-semibold">PostgreSQL</span> and <Link href={HTML}>{' '}MongoDB{' '}</Link>. 
                                I am a strong advocate for clean code, test-driven development, and modular architecture.
                            </p>

                            <p>
                                When I&apos;m not architecting systems, I stay active in the developer community, contributing to open-source projects and constantly iterating on personal tools to improve developer workflows.
                            </p>
                        </>
                    )}
                </div>

                <div className="mt-12 flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-zinc-200 dark:bg-zinc-800"></div>
                    <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">End of transmission</p>
                </div>
            </section>
        </main>
    );
}

export default About;