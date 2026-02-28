import { Helmet } from "react-helmet";
import Link from "../components/ui/Link";
import { College, CSS, Express, Git, HTML, JS, Nextjs, Nodejs, React, TailwindCSS, Django, ReactNative } from "../data/links";

function About() {
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
                    <img className="w-24 h-24 rounded-2xl group-hover:rotate-3 transition-transform duration-500" src="/logo.jpeg" alt="logo" />
                    <div className="absolute -inset-1 bg-green-500/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold dark:text-gray-100 text-gray-800">
                        About Me
                    </h1>
                    <p className="text-sm font-mono text-green-500 mt-1 uppercase tracking-[0.2em]">
                        Systems Architect
                    </p>
                </div>
            </div>

            <section className="flex flex-col gap-6 items-start">
                <div className="space-y-6 text-base dark:text-gray-300 text-gray-600 leading-relaxed max-w-2xl font-normal">
                    <p>
                        I&apos;m <span className="dark:text-white text-gray-900 font-semibold">Sankalp Pimpalkar</span>, a Backend Developer and Engineering Student at
                        <Link href={College}>
                            {' '}Terna Engineering College, Navi Mumbai{' '}
                        </Link>.
                        My expertise lies in building high-performance server-side architectures that scale seamlessly.
                    </p>

                    <p>
                        My journey in technology is driven by a deep curiosity about how large-scale systems manage millions of transactions. I specialize in
                        <Link href={Nodejs}>{' '}Node.js{' '}</Link>,
                        <Link href={Django}>{' '}Django{' '}</Link>, and
                        <Link href={Express}>{' '}Express{' '}</Link>
                        to create secure, versioned, and documented RESTful APIs. 
                    </p>

                    <div className="p-6 border dark:bg-gray-secondary/30 bg-gray-50 dark:border-gray-800 border-gray-200 rounded-2xl my-8">
                        <h3 className="text-xs font-mono text-green-500 uppercase tracking-widest mb-4">Core Philosophy</h3>
                        <p className="italic text-sm text-gray-500 dark:text-gray-400">
                            "I believe that backend development isn't just about moving data from A to B; it's about ensuring data integrity, security, and extreme performance at every hop in the network."
                        </p>
                    </div>

                    <p>
                        Beyond traditional web frameworks, I enjoy exploring cloud infrastructure on
                        <Link href={Git}>{' '}AWS{' '}</Link>,
                        containerization with Docker, and optimizing database schemas in 
                        <Link href={React}>{' '}PostgreSQL{' '}</Link> and <Link href={HTML}>{' '}MongoDB{' '}</Link>. 
                        I am a strong advocate for clean code, test-driven development, and modular architecture.
                    </p>

                    <p>
                        When I&apos;m not architecting systems, I stay active in the developer community, contributing to open-source projects and constantly iterating on personal tools to improve developer workflows.
                    </p>
                </div>

                <div className="mt-12 flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800"></div>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">End of transmission</p>
                </div>
            </section>
        </main>
    );
}

export default About;