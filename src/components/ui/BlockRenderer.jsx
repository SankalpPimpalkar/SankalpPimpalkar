import PropTypes from 'prop-types';

const BlockRenderer = ({ blocks }) => {
    if (!blocks || !Array.isArray(blocks)) return null;

    return blocks.map((block, index) => {
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
            case "quote":
                return (
                    <blockquote key={index} className="my-10 pl-6 border-l-4 border-zinc-200 dark:border-white/10 italic text-xl sm:text-2xl text-zinc-800 dark:text-zinc-200 font-serif leading-relaxed">
                        {block.content}
                    </blockquote>
                );
            case "list":
                return (
                    <ul key={index} className="my-8 space-y-3">
                        {block.items.map((item, i) => (
                            <li key={i} className="flex gap-4 text-base sm:text-lg dark:text-zinc-300 text-zinc-700">
                                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-white/20 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                );
            case "image":
                return (
                    <figure key={index} className="space-y-3 my-12">
                        <img 
                            src={block.url} 
                            alt={block.caption || "Image"} 
                            className="w-full rounded-2xl border border-zinc-100 dark:border-white/5 shadow-xl shadow-black/5"
                        />
                        {block.caption && (
                            <figcaption className="text-center text-xs text-zinc-400 font-light italic opacity-70">
                                {block.caption}
                            </figcaption>
                        )}
                    </figure>
                );
            case "embed": {
                const getYoutubeId = (url) => {
                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
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
                                alt={block.caption || "Embed"} 
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
            }
            default:
                return null;
        }
    });
};


BlockRenderer.propTypes = {
    blocks: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string.isRequired,
            content: PropTypes.string,
            items: PropTypes.arrayOf(PropTypes.string),
            url: PropTypes.string,
            caption: PropTypes.string,
            language: PropTypes.string,
        })
    ).isRequired,
};

export default BlockRenderer;
