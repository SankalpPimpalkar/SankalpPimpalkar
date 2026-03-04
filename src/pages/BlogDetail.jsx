import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogBySlug, getBlogById } from "../functions/blogService";
import { Helmet } from "react-helmet";
import { ChevronLeft, Calendar, Tag, User } from "lucide-react";
import { formatDate } from "../functions/formatDate";

function BlogDetail() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // Try fetching by slug first
                let data = await getBlogBySlug(slug);
                
                // Fallback to ID for backward compatibility
                if (!data) {
                    data = await getBlogById(slug);
                }
                
                setBlog(data);
            } catch (error) {
                console.error("Fetch Blog Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) return <div className="mt-28 flex justify-center">Loading...</div>;
    if (!blog) return <div className="mt-28 flex justify-center flex-col items-center gap-4">
        <p>Blog not found.</p>
        <Link to="/blogs" className="text-zinc-600 hover:underline">Back to Blogs</Link>
    </div>;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "author": {
            "@type": "Person",
            "name": blog.author
        },
        "datePublished": blog.createdAt?.toISOString(),
        "genre": blog.category,
        "articleBody": blog.content.filter(b => b.type === 'paragraph' || b.type === 'text').map(b => b.content).join(' ')
    };

    return (
        <main className="mt-28 animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-2xl mx-auto">
            <Helmet>
                <title>{blog.title} | Sankalp Pimpalkar</title>
                <meta name="description" content={blog.content.find(b => b.type === 'paragraph' || b.type === 'text')?.content?.substring(0, 160) || (blog.title + " - A blog post by Sankalp Pimpalkar in " + blog.category)} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.content.find(b => b.type === 'paragraph' || b.type === 'text')?.content?.substring(0, 160) || (blog.title + " - Read more on Sankalp Pimpalkar's portfolio.")} />
                <meta property="og:url" content={`https://shanky.in/blogs/${blog.slug || blog.id}`} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                {blog.createdAt && <meta property="article:published_time" content={blog.createdAt.toISOString()} />}
                <meta property="article:author" content={blog.author} />
                <meta property="article:section" content={blog.category} />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>

            <Link 
                to="/blogs" 
                className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-black dark:hover:text-white mb-10 transition-colors group"
            >
                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to all articles
            </Link>

            <header className="mb-12">
                <div className="flex items-center gap-3 mb-5">
                    <span className="px-2 py-0.5 rounded-lg bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 text-[9px] font-mono tracking-widest uppercase">
                        {blog.category}
                    </span>
                    <span className="text-zinc-200 dark:text-white/5 tracking-tighter">—</span>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-tighter text-zinc-400">
                        <Calendar size={10} />
                        {formatDate(blog.createdAt)}
                    </div>
                </div>
                <h1 className="text-2xl sm:text-4xl font-semibold leading-snug mb-8 dark:text-zinc-50 text-zinc-900 tracking-tight">
                    {blog.title}
                </h1>
                <div className="flex items-center gap-3 border-t border-zinc-100 dark:border-white/5 pt-6">
                    <div className="w-8 h-8 rounded-full bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 flex items-center justify-center text-zinc-400">
                        <User size={14} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold dark:text-zinc-200 text-zinc-800">{blog.author}</p>
                        <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-mono">Article Author</p>
                    </div>
                </div>
            </header>

            <article className="space-y-8">
                {blog.content.map((block, index) => {
                    switch (block.type) {
                        case "header":
                            return <h2 key={index} className="text-2xl sm:text-3xl font-bold dark:text-zinc-50 text-zinc-900 mt-12 mb-4 tracking-tight">{block.content}</h2>;
                        case "subheader":
                            return <h3 key={index} className="text-xl sm:text-2xl font-semibold dark:text-zinc-100 text-zinc-800 mt-10 mb-3 tracking-tight">{block.content}</h3>;
                        case "paragraph":
                        case "text":
                            return (
                                <p key={index} className="text-base sm:text-lg leading-relaxed dark:text-zinc-300 text-zinc-700 font-sans whitespace-pre-wrap">
                                    {block.content}
                                </p>
                            );
                        case "code":
                            return (
                                <div key={index} className="my-8 rounded-2xl overflow-hidden border border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-zinc-primary/50">
                                    {block.language && (
                                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-white/5 border-b dark:border-white/5">
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{block.language}</span>
                                        </div>
                                    )}
                                    <pre className="p-4 sm:p-6 overflow-x-auto no-scrollbar">
                                        <code className="text-xs sm:text-sm font-mono leading-relaxed text-zinc-700 dark:text-zinc-300">
                                            {block.content}
                                        </code>
                                    </pre>
                                </div>
                            );
                        case "image":
                            return (
                                <figure key={index} className="space-y-3 my-12">
                                    <img 
                                        src={block.url} 
                                        alt={block.caption || blog.title} 
                                        className="w-full rounded-2xl border border-zinc-100 dark:border-white/5 shadow-xl shadow-black/5"
                                    />
                                    {block.caption && (
                                        <figcaption className="text-center text-xs text-zinc-400 font-light italic opacity-70">
                                            {block.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            );
                        case "embed":
                            const getYoutubeId = (url) => {
                                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                                const match = url.match(regExp);
                                return (match && match[2].length === 11) ? match[2] : null;
                            };
                            const youtubeId = getYoutubeId(block.url);

                            return (
                                <figure key={index} className="space-y-3 my-12">
                                    {youtubeId ? (
                                        <div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-100 dark:border-white/5 shadow-xl shadow-black/5 bg-black">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <img 
                                            src={block.url} 
                                            alt={block.caption || blog.title} 
                                            className="w-full rounded-2xl border border-zinc-100 dark:border-white/5 shadow-xl shadow-black/5"
                                        />
                                    )}
                                    {block.caption && (
                                        <figcaption className="text-center text-xs text-zinc-400 font-light italic opacity-70">
                                            {block.caption}
                                        </figcaption>
                                    )}
                                </figure>
                            );
                        default:
                            return null;
                    }
                })}
            </article>

            <footer className="mt-16 pt-8 border-t border-zinc-100 dark:border-white/5">
                <div className="bg-zinc-50 dark:bg-zinc-secondary/20 rounded-2xl p-6 sm:p-10 text-center">
                    <h3 className="text-lg font-semibold mb-2">Thanks for reading!</h3>
                    <p className="text-zinc-500 text-sm mb-6 max-w-sm mx-auto">If you enjoyed this, feel free to check out other articles.</p>
                    <Link 
                        to="/blogs" 
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all"
                    >
                        Browse more blogs
                    </Link>
                </div>
            </footer>


        </main>
    );
}

export default BlogDetail;
