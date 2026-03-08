import Project from "../components/ui/Project";
import Work from "../components/ui/Work";
import {
	skills as defaultSkills,
	works as defaultWorks,
	projects as defaultProjects,
	tagLine as defaultTagline,
} from "../data/data";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { getAllBlogs } from "../functions/blogService";
import { getSiteSettings } from "../functions/siteSettingsService";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

import * as LucideIcons from "lucide-react";

/**
 * A wrapper component for Lucide icons that dynamically renders an icon based on its name.
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the Lucide icon to render.
 */
const LucideIcon = ({ name, ...props }) => {
	const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
	return <Icon {...props} />;
};

LucideIcon.propTypes = {
	name: PropTypes.string.isRequired,
};

function Home() {
	const [blogs, setBlogs] = useState([]);
	const [settings, setSettings] = useState({
		tagLine: defaultTagline,
		skills: defaultSkills,
		projects: defaultProjects,
		works: defaultWorks,
	});
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [allBlogs, siteSettings] = await Promise.all([
					getAllBlogs(),
					getSiteSettings(),
				]);
				setBlogs(allBlogs.slice(0, 3));
				if (siteSettings) {
					setSettings(siteSettings);
				}
			} catch (error) {
				console.error("Error fetching data for home:", error);
			}
		};
		fetchData();
	}, []);

	const timeAgo = (date) => {
		if (!date) return "";
		const now = new Date();
		const seconds = Math.floor((now - date) / 1000);

		let interval = Math.floor(seconds / 31536000);
		if (interval >= 1) return interval + "y ago";
		interval = Math.floor(seconds / 2592000);
		if (interval >= 1) return interval + "mo ago";
		interval = Math.floor(seconds / 86400);
		if (interval >= 1) return interval + "d ago";
		interval = Math.floor(seconds / 3600);
		if (interval >= 1) return interval + "h ago";
		interval = Math.floor(seconds / 60);
		if (interval >= 1) return interval + "m ago";
		return "now";
	};

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Sankalp Pimpalkar",
		jobTitle: "Backend Developer",
		url: "https://shanky.in",
		sameAs: [
			"https://github.com/sankalppimpalkar",
			"https://linkedin.com/in/sankalppimpalkar",
		],
		description:
			"Backend Developer specializing in Node.js, Django, and cloud architecture.",
	};

	return (
		<main>
			<Helmet>
				<title>Sankalp Pimpalkar | Full Stack & AI Engineer</title>
				<meta
					name="description"
					content="Portfolio of Sankalp Pimpalkar, a Full Stack & AI Engineer specializing in Node.js, React Native, and AWS. Building scalable architectures and intelligent systems."
				/>
				<meta
					name="keywords"
					content="Sankalp Pimpalkar, Full Stack Developer, AI Engineer, Mobile Developer, React Native, Node.js, Systems Architect, Portfolio"
				/>
				<meta
					property="og:title"
					content="Sankalp Pimpalkar | Portfolio"
				/>
				<meta
					property="og:description"
					content="Explore Sankalp's projects, experience, and insights on backend systems and architecture."
				/>
				<meta
					property="og:image"
					content="https://shanky.in/logo.jpeg"
				/>
				<meta property="og:url" content="https://shanky.in/" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<link rel="canonical" href="https://shanky.in/" />
				<script type="application/ld+json">
					{JSON.stringify(structuredData)}
				</script>
			</Helmet>

			<section className="mt-28 sm:mt-16 flex flex-col gap-6 items-start sm:flex-row-reverse sm:items-center justify-between">
				<div className="relative group">
					<img
						className="w-32 h-32 my-2 rounded-2xl group-hover:scale-105 duration-500 object-cover"
						src={"/enderman.gif"}
						alt="cute-enderman"
					/>
				</div>

				<div className="flex-1">
					<div className="flex items-center gap-2 mb-2">
						<span className="px-2 py-0.5 rounded text-[10px] font-mono bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-widest animate-pulse">
							System Active
						</span>
					</div>

					<h1 className="text-4xl font-bold dark:text-zinc-100 text-zinc-800 tracking-tight">
						Sankalp Pimpalkar
					</h1>

					<h2 className="text-xl font-mono text-green-500 mt-1 font-semibold flex items-center gap-2">
						<span className="text-zinc-400">&gt;</span> Full Stack &
						AI Engineer
					</h2>

					<p className="w-full max-w-md mt-4 text-base dark:text-zinc-400 text-zinc-600 leading-relaxed font-normal">
						{settings.tagLine}
					</p>

					<div className="flex items-center gap-3 mt-6">
						<a
							href="/Sankalp-Pimpalkar-Resume.pdf"
							target="_blank"
							className="dark:bg-zinc-secondary dark:text-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-200/20 px-5 py-2.5 text-xs font-medium rounded-lg border dark:border-zinc-200/5 transition-all duration-300"
						>
							View Resume
						</a>
						<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
						<span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">
							Available for projects
						</span>
					</div>
				</div>
			</section>

			<section className="mt-12">
				<h3 className="text-xl font-bold dark:text-zinc-200 text-zinc-800">
					Specialties
				</h3>

				<div className="flex flex-col gap-8 mt-6">
					{settings.skills.map((category) => (
						<div key={category.category}>
							<h4 className="text-xs font-mono text-green-500 uppercase tracking-widest mb-4 flex items-center gap-2">
								<span className="w-8 h-[1px] bg-green-500/30"></span>
								{category.category}
							</h4>
							<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
								{category.items.map((skill) => (
									<li
										key={skill.name}
										className="flex items-center gap-3 border dark:bg-zinc-800/20 bg-zinc-50/50 dark:border-white/5 border-zinc-200/60 p-3 rounded-xl hover:-translate-y-0.5 transition-all duration-300 group"
									>
										<div className="p-2 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 group-hover:text-green-500 transition-colors">
											<LucideIcon
												name={skill.icon}
												size={18}
												strokeWidth={2}
											/>
										</div>
										<p className="text-sm font-medium dark:text-zinc-300 text-zinc-700">
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
				<h3 className="text-xl font-bold dark:text-zinc-200 text-zinc-600">
					My Work
				</h3>

				<ul className="grid grid-cols-1 gap-4 mt-4 w-full">
					{settings.projects.map((project) => (
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
					))}
				</ul>
			</section>

			{blogs.length > 0 && (
				<section className="mt-8">
					<div className="flex justify-between items-end mb-6">
						<h3 className="text-xl font-bold dark:text-zinc-200 text-zinc-600">
							Latest Articles
						</h3>
						<Link
							to="/blogs"
							className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-500 hover:text-green-600 transition-colors group"
						>
							Read All{" "}
							<ArrowRight
								size={12}
								className="group-hover:translate-x-0.5 transition-transform"
							/>
						</Link>
					</div>

					<div className="grid grid-cols-1 gap-3">
						{blogs.map((blog) => (
							<Link
								key={blog.id}
								to={`/blogs/${blog.slug || blog.id}`}
								className="group block dark:bg-zinc-800/20 bg-zinc-50/50 border dark:border-white/5 border-zinc-200/60 p-5 rounded-2xl hover:-translate-y-0.5 transition-all duration-300"
							>
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
									<div className="flex-1">
										<div className="flex items-center gap-2 mb-2">
											<span className="px-1.5 py-0.5 rounded bg-green-500/10 text-green-500 text-[8px] font-mono tracking-widest uppercase border border-green-500/20">
												{blog.category}
											</span>
											<span className="text-[8px] font-mono text-zinc-500 uppercase flex items-center gap-1">
												<Calendar size={8} />
												{timeAgo(blog.createdAt)}
											</span>
										</div>
										<h4 className="text-sm font-bold dark:text-zinc-100 text-zinc-800 group-hover:text-green-500 transition-colors line-clamp-1">
											{blog.title}
										</h4>
										<p className="mt-2 text-xs dark:text-zinc-400 text-zinc-500 line-clamp-2 leading-relaxed font-normal">
											{blog.content.find(
												(b) =>
													b.type === "paragraph" ||
													b.type === "text",
											)?.content ||
												"Explore the full article to learn more..."}
										</p>
									</div>
									<div className="flex items-center text-[9px] uppercase tracking-widest font-bold text-zinc-400 group-hover:text-zinc-100 transition-colors">
										Open{" "}
										<ChevronRight
											size={12}
											className="group-hover:translate-x-0.5 transition-transform"
										/>
									</div>
								</div>
							</Link>
						))}
					</div>
				</section>
			)}

			<section className="mt-8">
				<h3 className="text-xl font-bold dark:text-zinc-200 text-zinc-600">
					Work Experience
				</h3>

				<ul className="mt-4 flex flex-col gap-2 items-start w-full">
					{settings.works.map((work) => (
						<Work
							key={work.id}
							companyName={work.companyName}
							role={work.role}
							companylocation={work.location}
							description={work.companyDescription}
							respAndAchievements={work.respAndAchievements}
							skillUtilized={work.skillUtilized}
						/>
					))}
				</ul>
			</section>
		</main>
	);
}

export default Home;
