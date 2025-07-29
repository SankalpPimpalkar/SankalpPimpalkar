import { Helmet } from "react-helmet";
import Link from "../components/ui/Link";
import { College, CSS, Express, Git, HTML, JS, Nextjs, Nodejs, React, TailwindCSS, Django, ReactNative } from "../data/links";

function About() {
    return (
        <main className="mt-20">
            <Helmet>
                <title>About | Sankalp Pimpalkar</title>
                <meta name="description" content="Learn more about Sankalp Pimpalkar, a full stack web developer from India with a passion for backend and frontend technologies." />
                <meta name="keywords" content="About Sankalp, Full Stack Developer, React Developer, Django Developer" />
                <meta property="og:title" content="About | Sankalp Pimpalkar" />
                <meta property="og:description" content="Background and journey of Sankalp, a full stack engineer with real-world project experience." />
                <meta property="og:image" content="https://shanky.in/logo.jpeg" />
                <meta property="og:url" content="https://shanky.in/about" />
                <link rel="canonical" href="https://shanky.in/about" />
            </Helmet>

            <div className="hidden sm:block">
                <img className="w-20 h-20 rounded-full" src="/logo.jpeg" alt="logo" />
            </div>

            <section className="mt-8 flex flex-col gap-4 items-start">
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    I&apos;m Sankalp Pimpalkar, an Engineering Student from
                    <Link href={College}>
                        {' '}Terna Engineering College, Navi Mumbai{' '}
                    </Link>.
                    I started my journey as a web developer in 2022 and since then, I have learned a lot of technologies.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    My journey began with the basics of
                    <Link href={HTML}>{' '}HTML{' '}</Link>,
                    <Link href={CSS}>{' '}CSS{' '}</Link>, and
                    <Link href={JS}>{' '}JavaScript{' '}</Link>,
                    which laid a strong foundation for my frontend development skills. Over time, I have expanded my expertise to include modern frameworks and libraries such as
                    <Link href={React}>{' '}React{' '}</Link>,
                    <Link href={Nextjs}>{' '}Next.js{' '}</Link>, and
                    <Link href={TailwindCSS}>{' '}Tailwind CSS{' '}</Link>.
                    I am passionate about building responsive and user-friendly web applications that provide a seamless experience across different devices and platforms.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    To broaden my backend development skills, I've also started working with
                    <Link href={Django}>{' '}Django{' '}</Link>,
                    a powerful Python framework that has helped me understand server-side development better. Additionally, I'm currently exploring mobile app development through
                    <Link href={ReactNative}>{' '}React Native{' '}</Link>,
                    which allows me to leverage my React knowledge to build cross-platform mobile applications.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    Throughout my projects, I have focused on writing clean, maintainable code and adhering to best practices in web development. I have experience working with version control systems like
                    <Link href={Git}>{' '}Git{' '}</Link>,
                    which has helped me collaborate effectively with other developers. Additionally, I have explored backend technologies like
                    <Link href={Nodejs}>{' '}Node.js{' '}</Link> and
                    <Link href={Express}>{' '}Express{' '}</Link>
                    to gain a holistic understanding of web development.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    Apart from technical skills, I am a strong advocate for continuous learning and staying updated with the latest industry trends. I actively participate in online communities, attend webinars, and contribute to open-source projects to enhance my knowledge and give back to the developer community.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                    My goal is to leverage my skills and knowledge to create impactful web applications that solve real-world problems. I am excited about the opportunities in both web and mobile development, and look forward to collaborating with like-minded professionals to build innovative solutions.
                </p>
            </section>
        </main>
    );
}

export default About;