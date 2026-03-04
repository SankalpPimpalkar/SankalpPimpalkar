import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs, getCategories } from "../functions/blogService";
import { Search, Calendar, ChevronRight, Hash } from "lucide-react";
import { timeAgo } from "../functions/formatDate";
import { Helmet } from "react-helmet";

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const [blogsData, catsData] = await Promise.all([
                    getAllBlogs(),
                    getCategories()
                ]);
                setBlogs(blogsData);
                setFilteredBlogs(blogsData);
                setCategories(["All", ...catsData]);
            } catch (error) {
                console.error("Fetch Blogs Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        let result = blogs;
        if (activeCategory !== "All") {
            result = result.filter(b => b.category === activeCategory);
        }
        if (searchQuery) {
            result = result.filter(b => 
                b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredBlogs(result);
    }, [activeCategory, searchQuery, blogs]);

    if (loading) return <div className="mt-28 flex justify-center">Loading...</div>;

    return (
        <main className="mt-28 sm:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-4xl mx-auto">
            <Helmet>
                <title>Writing & Insights | Sankalp Pimpalkar</title>
                <meta name="description" content="Explore articles on backend architecture, system design, modern web development, and cloud computing by Sankalp Pimpalkar." />
                <meta name="keywords" content="Backend Blog, System Design Articles, Node.js, Django, Cloud Computing, Software Engineering Blog" />
                <meta property="og:title" content="Writing & Insights | Sankalp Pimpalkar" />
                <meta property="og:description" content="Technical articles and insights on building scalable backend systems." />
                <meta property="og:url" content="https://shanky.in/blogs" />
                <meta property="og:type" content="blog" />
                <link rel="canonical" href="https://shanky.in/blogs" />
            </Helmet>

            <header className="mb-10">
                <h1 className="text-2xl font-semibold mb-3 dark:text-zinc-100 text-zinc-800 tracking-tight">Writing & Insights</h1>
                <p className="text-sm dark:text-zinc-400 text-zinc-600 max-w-lg leading-relaxed">
                    Exploring backend architecture, modern web development, and system design.
                </p>
            </header>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-secondary/20 border border-zinc-100 dark:border-white/5 rounded-xl focus:ring-1 focus:ring-zinc-300 dark:focus:ring-white/10 transition-all outline-none text-sm"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar sm:pb-0">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                                activeCategory === cat
                                ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                                : "bg-zinc-50 dark:bg-zinc-800/20 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800/40"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-5">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                        <Link 
                            key={blog.id} 
                            to={`/blogs/${blog.slug || blog.id}`}
                            className="group block bg-white dark:bg-zinc-800/20 border border-zinc-100 dark:border-white/5 p-6 rounded-2xl hover:border-zinc-200 dark:hover:border-white/10 transition-all hover:-translate-y-0.5"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-start">
                                    <span className="px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-[9px] font-mono tracking-widest uppercase">
                                        {blog.category}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-tighter text-zinc-400">
                                        <Calendar size={10} />
                                        {timeAgo(blog.createdAt)}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold mb-2 dark:text-zinc-100 text-zinc-900 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors tracking-tight">
                                        {blog.title}
                                    </h2>
                                    <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed font-normal">
                                        {blog.content.find(b => b.type === 'paragraph' || b.type === 'text')?.content || "No preview available..."}
                                    </p>
                                </div>
                                <div className="flex items-center text-[9px] uppercase tracking-widest font-semibold text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                                    Read Article <ChevronRight size={12} className="ml-1 group-hover:translate-x-0.5 transition-all" />
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="py-16 text-center border border-dashed border-zinc-200 dark:border-white/5 rounded-2xl">
                        <p className="text-zinc-400 text-sm">No articles found.</p>
                    </div>
                )}
            </div>

            <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-800 flex justify-center">
                <Link 
                    to="/admin" 
                    className="text-[10px] uppercase tracking-widest text-zinc-300 dark:text-zinc-700 hover:text-zinc-500 transition-colors"
                >
                    Admin Portal
                </Link>
            </div>
        </main>
    );
}

export default Blogs;