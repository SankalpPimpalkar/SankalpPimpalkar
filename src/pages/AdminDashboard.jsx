import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, googleProvider } from "../functions/firebase";
import { isAdmin } from "../functions/admin";
import { createBlog, uploadImageToEnderChest, deleteImageFromEnderChest, getCategories } from "../functions/blogService";
import { getSiteSettings, updateSiteSettings } from "../functions/siteSettingsService";
import { 
    Plus, Trash2, Image as ImageIcon, Save, LogIn, LogOut, 
    GripVertical, Type, Heading1, Heading2, Code, Link as LinkIcon, Youtube,
    Sparkles, Copy, Check, Wand2, X, List, Quote, PlusCircle, MinusCircle,
    LayoutDashboard, Settings, User as UserIcon, Briefcase, Rocket, Globe, User, Camera
} from "lucide-react";

function AdminDashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("blog"); // "blog" or "site"
    
    // Blog State
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [blocks, setBlocks] = useState([{ type: "paragraph", content: "" }]);
    
    // Site Settings State
    const [siteSettings, setSiteSettings] = useState(null);
    
    const [saving, setSaving] = useState(false);
    const [existingCategories, setExistingCategories] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [draggedItemIndex, setDraggedItemIndex] = useState(null);
    const [showMagicPaste, setShowMagicPaste] = useState(false);
    const [magicContent, setMagicContent] = useState("");
    const [copiedPrompt, setCopiedPrompt] = useState(false);

    const LANGUAGES = [
        "javascript", "typescript", "python", "html", "css", 
        "json", "markdown", "java", "cpp", "go", "rust", "sql", "bash"
    ];

    const CONTENT_PROMPT = `Generate a blog post as a JSON object with this structure:
{
  "title": "Stunning Article Title",
  "category": "Technology",
  "blocks": [
    { "type": "header", "content": "Main Section" },
    { "type": "paragraph", "content": "Insightful content..." },
    { "type": "list", "items": ["Key point 1", "Key point 2"] },
    { "type": "quote", "content": "Inspirational quote or key takeaway" },
    { "type": "code", "content": "print('hello')", "language": "python" },
    { "type": "embed", "url": "https://youtube.com/...", "caption": "Watch this" }
  ]
}

Block Types:
- header, subheader, paragraph, quote: content (string)
- list: items (array of strings)
- code: content (string), language (string)
- embed: url (string), caption (string)

Return ONLY the JSON object. Do not include markdown code blocks.`;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && isAdmin(user.email)) {
                setUser(user);
                const [cats, settings] = await Promise.all([
                    getCategories(),
                    getSiteSettings()
                ]);
                setExistingCategories(cats);
                setSiteSettings(settings);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            if (!isAdmin(result.user.email)) {
                alert("You are not authorized as an admin.");
                await signOut(auth);
            }
        } catch {
            console.error("Login Error");
        }
    };

    const handleLogout = () => signOut(auth);

    const addBlock = (type) => {
        const newBlocks = [...blocks];
        if (type === "image") {
            newBlocks.push({ type: "image", url: "", fileId: "", caption: "" });
        } else if (type === "code") {
            newBlocks.push({ type: "code", content: "", language: "javascript" });
        } else if (type === "embed") {
            newBlocks.push({ type: "embed", url: "", caption: "" });
        } else if (type === "list") {
            newBlocks.push({ type: "list", items: [""] });
        } else if (type === "quote") {
            newBlocks.push({ type: "quote", content: "" });
        } else {
            newBlocks.push({ type, content: "" });
        }
        setBlocks(newBlocks);
    };

    const removeBlock = async (index) => {
        const block = blocks[index];
        if (block.type === "image" && block.fileId) {
            try {
                await deleteImageFromEnderChest(block.fileId);
            } catch {
                console.error("Failed to delete image from EnderChest");
            }
        }
        const newBlocks = blocks.filter((_, i) => i !== index);
        setBlocks(newBlocks);
    };

    const handleDragStart = (e, index) => {
        setDraggedItemIndex(index);
        e.dataTransfer.effectAllowed = "move";
        // Required for Firefox
        e.dataTransfer.setData("text/html", e.target.parentNode);
        
        // Custom drag ghost
        const ghost = e.target.closest('.group');
        if (ghost) {
            ghost.style.opacity = '0.4';
        }
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedItemIndex === null || draggedItemIndex === index) return;

        const newBlocks = [...blocks];
        const draggedItem = newBlocks[draggedItemIndex];
        newBlocks.splice(draggedItemIndex, 1);
        newBlocks.splice(index, 0, draggedItem);
        setDraggedItemIndex(index);
        setBlocks(newBlocks);
    };

    const handleDragEnd = (e) => {
        const ghost = e.target.closest('.group');
        if (ghost) {
            ghost.style.opacity = '1';
        }
        setDraggedItemIndex(null);
    };

    const updateBlock = (index, data) => {
        const newBlocks = [...blocks];
        newBlocks[index] = { ...newBlocks[index], ...data };
        setBlocks(newBlocks);
    };

    const handleImageUpload = async (index, file) => {
        try {
            const data = await uploadImageToEnderChest(file);
            updateBlock(index, { url: data.url, fileId: data.fileId });
        } catch {
            alert("Failed to upload image.");
        }
    };

    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // Remove non-word chars
            .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with -
            .replace(/^-+|-+$/g, ""); // Trim - from ends
    };

    const copyPrompt = () => {
        navigator.clipboard.writeText(CONTENT_PROMPT);
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
    };

    const handleMagicPaste = () => {
        try {
            const parsed = JSON.parse(magicContent);
            let incomingBlocks = [];
            
            if (Array.isArray(parsed)) {
                incomingBlocks = parsed;
            } else if (parsed && typeof parsed === 'object') {
                if (parsed.title) setTitle(parsed.title);
                if (parsed.category) setCategory(parsed.category);
                incomingBlocks = parsed.blocks || [];
            } else {
                throw new Error("Invalid format");
            }
            
            // Validate block types
            const validTypes = ["header", "subheader", "paragraph", "code", "embed", "list", "quote"];
            const cleaned = incomingBlocks.filter(block => validTypes.includes(block.type));
            
            // If only one empty paragraph, replace it
            if (blocks.length === 1 && blocks[0].type === "paragraph" && !blocks[0].content) {
                setBlocks(cleaned);
            } else {
                setBlocks(prev => [...prev, ...cleaned]);
            }
            
            setMagicContent("");
            setShowMagicPaste(false);
        } catch {
            alert("Invalid JSON format. Please ensure you paste a valid JSON object or array.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !category) return alert("Title and Category are required.");
        
        setSaving(true);
        try {
            const blogData = {
                title,
                slug: generateSlug(title),
                category,
                content: blocks,
                author: user.displayName,
                authorEmail: user.email,
            };
            await createBlog(blogData);
            navigate(`/blogs/${blogData.slug}`);
        } catch {
            console.error("Submit Error");
            alert("Failed to publish blog.");
        } finally {
            setSaving(false);
        }
    };

    const handleSiteSettingsSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSiteSettings(siteSettings);
            alert("Site settings updated successfully!");
        } catch (error) {
            console.error("Update Site Settings Error:", error);
            alert("Failed to update site settings.");
        } finally {
            setSaving(false);
        }
    };

    const handleCodeKeyDown = (e, index) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const { selectionStart, selectionEnd, value } = e.target;
            const newValue = value.substring(0, selectionStart) + "  " + value.substring(selectionEnd);
            updateBlock(index, { content: newValue });
            
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = selectionStart + 2;
            }, 0);
        }

        if (e.key === 'Enter') {
            const { selectionStart, value } = e.target;
            const lines = value.substring(0, selectionStart).split('\n');
            const currentLine = lines[lines.length - 1];
            const indentation = currentLine.match(/^\s*/)[0];

            if (indentation) {
                e.preventDefault();
                const newValue = value.substring(0, selectionStart) + "\n" + indentation + value.substring(selectionStart);
                updateBlock(index, { content: newValue });
                setTimeout(() => {
                    e.target.selectionStart = e.target.selectionEnd = selectionStart + indentation.length + 1;
                }, 0);
            }
        }
    };

    if (loading) return <div className="mt-28 flex justify-center">Loading...</div>;

    if (!user) {
        return (
            <main className="mt-28 flex flex-col items-center justify-center min-h-[40vh]">
                <h1 className="text-xl font-semibold mb-5">Admin Access</h1>
                <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all font-medium text-sm shadow-lg"
                >
                    <LogIn size={18} />
                    Sign in with Google
                </button>
            </main>
        );
    }

    return (
        <main className="mt-28 animate-in fade-in duration-700 max-w-2xl mx-auto text-zinc-900 dark:text-zinc-100">
            <div className="flex justify-between items-center mb-8 border-b dark:border-white/5 pb-6">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">Writing Desk</h1>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 mt-1">Manage your {activeTab === "blog" ? "articles" : "website"}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-zinc-100 dark:bg-white/5 p-1 rounded-xl border dark:border-white/5">
                        <button
                            onClick={() => setActiveTab("blog")}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === "blog" ? "bg-white dark:bg-zinc-primary text-black dark:text-white shadow-sm" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"}`}
                        >
                            <LayoutDashboard size={12} />
                            Blog Post
                        </button>
                        <button
                            onClick={() => setActiveTab("site")}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === "site" ? "bg-white dark:bg-zinc-primary text-black dark:text-white shadow-sm" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"}`}
                        >
                            <Settings size={12} />
                            Site Settings
                        </button>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-red-500 hover:bg-red-500/5 transition-all border border-zinc-100 dark:border-white/5"
                    >
                        <LogOut size={12} />
                        Logout
                    </button>
                </div>
            </div>

            {activeTab === "blog" ? (
                <form 
                    onSubmit={handleSubmit} 
                    className="space-y-8"
                    onKeyDown={(e) => {
                        if (e.key === 'Tab') e.preventDefault();
                    }}
                >
                <div className="space-y-6 px-1">
                    <div className="relative group">
                        <textarea
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Article Title"
                            className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-3xl font-bold placeholder:opacity-20 resize-none overflow-hidden"
                            rows={1}
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = e.target.scrollHeight + 'px';
                            }}
                            required
                        />
                    </div>
                    
                    <div className="relative">
                        <div className="flex items-center gap-2 text-zinc-400 focus-within:text-zinc-900 dark:focus-within:text-zinc-100 transition-colors">
                            <Plus size={14} className="opacity-40" />
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                placeholder="Add Category..."
                                className="bg-transparent border-none outline-none focus:ring-0 p-0 text-sm font-medium placeholder:opacity-40 w-full"
                                required
                            />
                        </div>
                        
                        {showSuggestions && category && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-zinc-primary border border-zinc-100 dark:border-white/5 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
                                {existingCategories
                                    .filter(cat => cat.toLowerCase().includes(category.toLowerCase()))
                                    .map(cat => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => {
                                                setCategory(cat);
                                                setShowSuggestions(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-xs hover:bg-zinc-50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            {cat}
                                        </button>
                                    ))
                                }
                                {!existingCategories.some(cat => cat.toLowerCase() === category.toLowerCase()) && (
                                    <button
                                        type="button"
                                        onClick={() => setShowSuggestions(false)}
                                        className="w-full text-left px-4 py-2 text-[10px] text-zinc-400 italic border-t dark:border-white/5"
                                    >
                                        New Category: &quot;{category}&quot;
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* AI Tools Toolbar */}
                <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-zinc-100 dark:border-white/5">
                    <button
                        type="button"
                        onClick={copyPrompt}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-zinc-50 dark:bg-white/5 text-zinc-500 hover:text-black dark:hover:text-white transition-all border border-transparent hover:border-zinc-200 dark:hover:border-white/10"
                    >
                        {copiedPrompt ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                        {copiedPrompt ? "Prompt Copied" : "Copy AI Prompt"}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowMagicPaste(true)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-zinc-50 dark:bg-zinc-primary/20 text-indigo-500 dark:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-primary/40 transition-all border border-transparent hover:border-zinc-200 dark:hover:border-white/10"
                    >
                        <Sparkles size={12} />
                        Magic Paste
                    </button>
                </div>

                {/* Magic Paste Modal */}
                {showMagicPaste && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                            <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                                        <Wand2 size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold dark:text-zinc-100 text-zinc-900">Magic Content Importer</h3>
                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Paste your LLM-generated JSON blocks</p>
                                    </div>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => setShowMagicPaste(false)}
                                    className="w-8 h-8 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/5 flex items-center justify-center text-zinc-400 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="p-6">
                                <textarea
                                    value={magicContent}
                                    onChange={(e) => setMagicContent(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                                            e.preventDefault();
                                            handleMagicPaste();
                                        }
                                    }}
                                    placeholder='[{"type": "header", "content": "New Blog Post"}, ...]'
                                    className="w-full h-64 bg-zinc-50 dark:bg-black/20 border border-zinc-100 dark:border-white/5 rounded-2xl p-4 text-xs font-mono focus:ring-1 focus:ring-indigo-500/30 outline-none resize-none no-scrollbar dark:text-zinc-300"
                                />
                                <div className="mt-6 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleMagicPaste}
                                        className="flex-grow flex items-center justify-center gap-2 h-12 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-black/10"
                                    >
                                        <Sparkles size={14} />
                                        Ingest Blocks
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowMagicPaste(false)}
                                        className="px-6 h-12 bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 dark:hover:bg-white/10 transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {blocks.map((block, index) => (
                        <div 
                            key={index} 
                            draggable="false"
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnter={(e) => handleDragOver(e, index)}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnd={handleDragEnd}
                            className={`relative group bg-white dark:bg-zinc-secondary/20 p-6 rounded-2xl border border-zinc-100 dark:border-white/5 transition-all hover:border-zinc-200 dark:hover:border-white/10 ${draggedItemIndex === index ? 'opacity-20 border-dashed border-zinc-300 scale-[0.98]' : ''}`}
                        >
                            <div 
                                className="absolute -left-16 top-0 bottom-0 w-16 flex items-center justify-center cursor-grab active:cursor-grabbing text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-100 transition-all opacity-20 group-hover:opacity-100"
                                onMouseDown={(e) => {
                                    // Enable dragging only when handle is clicked
                                    e.currentTarget.parentElement.setAttribute('draggable', 'true');
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.parentElement.setAttribute('draggable', 'false');
                                }}
                            >
                                <GripVertical size={20} />
                            </div>
                            
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    {block.type === 'header' && <Heading1 size={12} className="text-zinc-400" />}
                                    {block.type === 'subheader' && <Heading2 size={12} className="text-zinc-400" />}
                                    {block.type === 'paragraph' && <Type size={12} className="text-zinc-400" />}
                                    {block.type === 'code' && <Code size={12} className="text-zinc-400" />}
                                    {block.type === 'image' && <ImageIcon size={12} className="text-zinc-400" />}
                                    {block.type === 'embed' && <LinkIcon size={12} className="text-zinc-400" />}
                                    {block.type === 'list' && <List size={12} className="text-zinc-400" />}
                                    {block.type === 'quote' && <Quote size={12} className="text-zinc-400" />}
                                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest opacity-60">{block.type}</span>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => removeBlock(index)}
                                    className="p-1.5 text-zinc-300 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            {block.type === "header" && (
                                <textarea
                                    value={block.content}
                                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                                    placeholder="Heading 1"
                                    className="w-full bg-transparent border-none focus:ring-0 p-0 resize-none font-bold text-2xl leading-tight placeholder:opacity-30 outline-none"
                                    rows={1}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                />
                            )}
                            {block.type === "subheader" && (
                                <textarea
                                    value={block.content}
                                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                                    placeholder="Heading 2"
                                    className="w-full bg-transparent border-none focus:ring-0 p-0 resize-none font-semibold text-xl leading-tight placeholder:opacity-30 outline-none"
                                    rows={1}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                />
                            )}
                            {block.type === "paragraph" && (
                                <textarea
                                    value={block.content}
                                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                                    placeholder="Tell your story..."
                                    className="w-full min-h-[4rem] bg-transparent border-none outline-none focus:ring-0 p-0 resize-none font-sans text-base leading-relaxed placeholder:opacity-30"
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                />
                            )}
                            {block.type === "quote" && (
                                <div className="border-l-4 border-indigo-500/30 pl-6 py-2">
                                    <textarea
                                        value={block.content}
                                        onChange={(e) => updateBlock(index, { content: e.target.value })}
                                        placeholder="Add an impactful quote..."
                                        className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 resize-none font-serif text-xl italic leading-relaxed placeholder:opacity-30 dark:text-zinc-200"
                                        onInput={(e) => {
                                            e.target.style.height = 'auto';
                                            e.target.style.height = e.target.scrollHeight + 'px';
                                        }}
                                    />
                                </div>
                            )}
                            {block.type === "list" && (
                                <div className="space-y-4">
                                    {(block.items || [""]).map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex gap-3 group/item">
                                            <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-indigo-500/40 shrink-0" />
                                            <textarea
                                                value={item}
                                                onChange={(e) => {
                                                    const newItems = [...block.items];
                                                    newItems[itemIndex] = e.target.value;
                                                    updateBlock(index, { items: newItems });
                                                }}
                                                placeholder="List item..."
                                                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 resize-none text-base leading-relaxed placeholder:opacity-30"
                                                onInput={(e) => {
                                                    e.target.style.height = 'auto';
                                                    e.target.style.height = e.target.scrollHeight + 'px';
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newItems = block.items.filter((_, i) => i !== itemIndex);
                                                    if (newItems.length === 0) {
                                                        removeBlock(index);
                                                    } else {
                                                        updateBlock(index, { items: newItems });
                                                    }
                                                }}
                                                className="opacity-0 group-hover/item:opacity-40 hover:!opacity-100 text-zinc-400 hover:text-red-500 transition-all p-1"
                                            >
                                                <MinusCircle size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            updateBlock(index, { items: [...(block.items || []), ""] });
                                        }}
                                        className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-indigo-500 transition-colors mt-2"
                                    >
                                        <PlusCircle size={12} />
                                        Add Item
                                    </button>
                                </div>
                            )}
                            {block.type === "code" && (
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <select 
                                            value={block.language || "javascript"}
                                            onChange={(e) => updateBlock(index, { language: e.target.value })}
                                            className="bg-zinc-50 dark:bg-zinc-primary px-3 py-1.5 rounded-lg text-[10px] font-mono border-none outline-none focus:ring-0 w-32 appearance-none cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors uppercase tracking-widest text-zinc-500 font-semibold"
                                        >
                                            {LANGUAGES.map(lang => (
                                                <option key={lang} value={lang}>{lang}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <textarea
                                        value={block.content}
                                        onChange={(e) => updateBlock(index, { content: e.target.value })}
                                        onKeyDown={(e) => handleCodeKeyDown(e, index)}
                                        placeholder="// console.log('hello world');"
                                        className="w-full h-32 bg-zinc-50 dark:bg-zinc-primary/50 p-4 rounded-xl font-mono text-sm border-none outline-none focus:ring-0 resize-none no-scrollbar"
                                    />
                                </div>
                            )}
                            {block.type === "image" && (
                                <div className="space-y-3">
                                    {block.url ? (
                                        <img src={block.url} alt="Uploaded" className="w-full rounded-xl h-48 object-cover border border-zinc-100 dark:border-white/5" />
                                    ) : (
                                        <div className="w-full h-48 rounded-xl border border-dashed border-zinc-200 dark:border-white/10 flex flex-col items-center justify-center gap-2 bg-zinc-50/50 dark:bg-white/[0.01] hover:bg-zinc-50 dark:hover:bg-white/[0.02] transition-all relative">
                                            <ImageIcon size={30} className="text-zinc-200 dark:text-white/5" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(index, e.target.files[0])}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                            <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">Select Asset</p>
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        value={block.caption}
                                        onChange={(e) => updateBlock(index, { caption: e.target.value })}
                                        placeholder="Add a subtle caption..."
                                        className="w-full bg-zinc-50 dark:bg-zinc-primary rounded-lg p-2 text-xs border-none outline-none focus:ring-0 italic placeholder:font-serif"
                                    />
                                </div>
                            )}
                            {block.type === "embed" && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-primary p-2 rounded-lg border dark:border-white/5">
                                        <LinkIcon size={14} className="text-zinc-400 ml-1" />
                                        <input
                                            type="text"
                                            value={block.url}
                                            onChange={(e) => updateBlock(index, { url: e.target.value })}
                                            placeholder="Paste Image or Video URL (YouTube supported)..."
                                            className="w-full bg-transparent border-none outline-none focus:ring-0 text-xs py-1"
                                        />
                                    </div>
                                    {block.url && (
                                        <div className="w-full aspect-video rounded-xl bg-zinc-50 dark:bg-zinc-primary flex items-center justify-center overflow-hidden border dark:border-white/5">
                                            {block.url.includes('youtube.com') || block.url.includes('youtu.be') ? (
                                                <div className="flex flex-col items-center gap-2 text-zinc-400">
                                                    <Youtube size={32} />
                                                    <span className="text-[10px] font-mono uppercase tracking-widest">YouTube Embed Preview</span>
                                                </div>
                                            ) : (
                                                <img src={block.url} alt="Embed Preview" className="w-full h-full object-cover" onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }} />
                                            )}
                                            <div className="hidden flex-col items-center gap-2 text-zinc-400">
                                                <LinkIcon size={32} />
                                                <span className="text-[10px] font-mono uppercase tracking-widest">Invalid or Private URL</span>
                                            </div>
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        value={block.caption}
                                        onChange={(e) => updateBlock(index, { caption: e.target.value })}
                                        placeholder="Add a context caption..."
                                        className="w-full bg-zinc-50 dark:bg-zinc-primary rounded-lg p-2 text-xs border-none outline-none focus:ring-0 italic placeholder:font-serif"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    <button
                        type="button"
                        onClick={() => addBlock("header")}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-200 dark:border-white/10 text-zinc-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all bg-white dark:bg-transparent shadow-sm group"
                    >
                        <Heading1 size={14} />
                        <span className="text-[10px] font-medium">H1</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock("subheader")}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-200 dark:border-white/10 text-zinc-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all bg-white dark:bg-transparent shadow-sm group"
                    >
                        <Heading2 size={14} />
                        <span className="text-[10px] font-medium">H2</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock("paragraph")}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-200 dark:border-white/10 text-zinc-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all bg-white dark:bg-transparent shadow-sm group"
                    >
                        <Type size={14} />
                        <span className="text-[10px] font-medium">Text</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock("code")}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-200 dark:border-white/10 text-zinc-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all bg-white dark:bg-transparent shadow-sm group"
                    >
                        <Code size={14} />
                        <span className="text-[10px] font-medium">Code</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock("image")}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-200 dark:border-white/10 text-zinc-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all bg-white dark:bg-transparent shadow-sm group"
                    >
                        <ImageIcon size={14} />
                        <span className="text-[10px] font-medium">Asset</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock("embed")}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-200 dark:border-white/10 text-zinc-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all bg-white dark:bg-transparent shadow-sm group"
                    >
                        <LinkIcon size={14} />
                        <span className="text-[10px] font-medium">Embed</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock("list")}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-200 dark:border-white/10 text-zinc-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all bg-white dark:bg-transparent shadow-sm group"
                    >
                        <List size={14} />
                        <span className="text-[10px] font-medium">List</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => addBlock("quote")}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-zinc-200 dark:border-white/10 text-zinc-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all bg-white dark:bg-transparent shadow-sm group"
                    >
                        <Quote size={14} />
                        <span className="text-[10px] font-medium">Quote</span>
                    </button>
                </div>

                <div className="pt-8 pb-16">
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 p-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-semibold text-base hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all disabled:opacity-50 shadow-lg shadow-black/5 dark:shadow-white/5"
                    >
                        {saving ? "Deploying..." : <><Save size={18} /> Publish Article</>}
                    </button>
                </div>
            </form>
            ) : (
                <SiteSettingsForm 
                    settings={siteSettings} 
                    setSettings={setSiteSettings} 
                    onSubmit={handleSiteSettingsSubmit}
                    saving={saving}
                />
            )}
        </main>
    );
}

function SiteSettingsForm({ settings, setSettings, onSubmit, saving }) {
    if (!settings) return <div className="p-8 text-center text-zinc-400">Loading settings...</div>;

    const updateNested = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const addAboutBlock = (type) => {
        const newBlocks = [...(settings.aboutBlocks || [])];
        if (type === "image") {
            newBlocks.push({ type: "image", url: "", fileId: "", caption: "" });
        } else if (type === "list") {
            newBlocks.push({ type: "list", items: [""] });
        } else if (type === "embed") {
            newBlocks.push({ type: "embed", url: "", caption: "" });
        } else {
            newBlocks.push({ type, content: "" });
        }
        updateNested("aboutBlocks", newBlocks);
    };

    const updateAboutBlock = (index, content) => {
        const newBlocks = [...(settings.aboutBlocks || [])];
        newBlocks[index] = { ...newBlocks[index], ...content };
        updateNested("aboutBlocks", newBlocks);
    };

    const removeAboutBlock = (index) => {
        const newBlocks = (settings.aboutBlocks || []).filter((_, i) => i !== index);
        updateNested("aboutBlocks", newBlocks);
    };

    const handleAboutImageUpload = async (index, file) => {
        if (!file) return;
        try {
            const data = await uploadImageToEnderChest(file);
            updateAboutBlock(index, { url: data.url, fileId: data.fileId });
        } catch (error) {
            console.error("Image Upload Error:", error);
            alert("Failed to upload image.");
        }
    };

    const handleProfileImageUpload = async (file) => {
        if (!file) return;
        try {
            const data = await uploadImageToEnderChest(file);
            updateNested("profileImage", data.url);
        } catch (error) {
            console.error("Profile Image Upload Error:", error);
            alert("Failed to upload profile image.");
        }
    };

    const updateSocial = (platform, url) => {
        setSettings(prev => ({
            ...prev,
            socials: { ...prev.socials, [platform]: url }
        }));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Profile Picture */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                    <User size={14} />
                    Profile Picture
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl">
                    <div className="relative group">
                        <img 
                            src={settings.profileImage || './me.jpeg'} 
                            alt="profile" 
                            className="w-24 h-24 rounded-2xl object-cover border-2 border-green-500/20"
                        />
                        <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Camera size={20} className="text-white" />
                        </div>
                    </div>
                    <div className="flex-1 space-y-2">
                        <h4 className="text-sm font-bold dark:text-zinc-100">Upload new avatar</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">JPG, PNG or GIF. Max size of 2MB.</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleProfileImageUpload(e.target.files[0])}
                            className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-green-500/10 file:text-green-500 hover:file:bg-green-500/20 cursor-pointer"
                        />
                    </div>
                </div>
            </section>

            {/* Tagline */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                    <Type size={14} />
                    Homepage Tagline
                </div>
                <textarea
                    value={settings.tagLine}
                    onChange={(e) => updateNested("tagLine", e.target.value)}
                    placeholder="Describe yourself..."
                    className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl p-6 text-base leading-relaxed focus:ring-1 focus:ring-green-500/30 outline-none resize-none min-h-[120px]"
                />
            </section>

            {/* Socials */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                    <Globe size={14} />
                    Social Media & Links
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(settings.socials || {}).map(([platform, url]) => (
                        <div key={platform} className="flex flex-col gap-1.5">
                            <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1">{platform}</label>
                            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-xl px-4 py-3">
                                <LinkIcon size={14} className="text-zinc-400 shrink-0" />
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => updateSocial(platform, e.target.value)}
                                    className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                        <Briefcase size={14} />
                        Work Experience
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            const newWorks = [...(settings.works || []), {
                                id: Date.now(),
                                companyName: "",
                                role: "",
                                location: "",
                                companyDescription: "",
                                respAndAchievements: [""],
                                skillUtilized: [""]
                            }];
                            updateNested("works", newWorks);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-lg text-[10px] uppercase tracking-widest font-bold hover:bg-green-500/20 transition-all"
                    >
                        <Plus size={12} />
                        Add Experience
                    </button>
                </div>

                <div className="space-y-4">
                    {(settings.works || []).map((work, index) => (
                        <div key={work.id || index} className="group relative bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl p-6">
                            <button
                                type="button"
                                onClick={() => {
                                    const newWorks = settings.works.filter((_, i) => i !== index);
                                    updateNested("works", newWorks);
                                }}
                                className="absolute top-4 right-4 p-2 text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Company</label>
                                    <input
                                        type="text"
                                        value={work.companyName}
                                        onChange={(e) => {
                                            const newWorks = [...settings.works];
                                            newWorks[index].companyName = e.target.value;
                                            updateNested("works", newWorks);
                                        }}
                                        className="w-full bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-green-500/30 outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Role</label>
                                    <input
                                        type="text"
                                        value={work.role}
                                        onChange={(e) => {
                                            const newWorks = [...settings.works];
                                            newWorks[index].role = e.target.value;
                                            updateNested("works", newWorks);
                                        }}
                                        className="w-full bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-green-500/30 outline-none"
                                    />
                                </div>
                            </div>
                            
                            <div className="mb-4 space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Location & Duration</label>
                                <input
                                    type="text"
                                    value={work.location}
                                    onChange={(e) => {
                                        const newWorks = [...settings.works];
                                        newWorks[index].location = e.target.value;
                                        updateNested("works", newWorks);
                                    }}
                                    placeholder="City, State | Mon Year – Mon Year"
                                    className="w-full bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-green-500/30 outline-none"
                                />
                            </div>

                            <div className="mb-4 space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Company Description</label>
                                <textarea
                                    value={work.companyDescription}
                                    onChange={(e) => {
                                        const newWorks = [...settings.works];
                                        newWorks[index].companyDescription = e.target.value;
                                        updateNested("works", newWorks);
                                    }}
                                    className="w-full bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-green-500/30 outline-none resize-none"
                                    rows={2}
                                />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1 mb-2 block">Achievements</label>
                                    <div className="space-y-2">
                                        {(work.respAndAchievements || []).map((resp, rIndex) => (
                                            <div key={rIndex} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={resp}
                                                    onChange={(e) => {
                                                        const newWorks = [...settings.works];
                                                        newWorks[index].respAndAchievements[rIndex] = e.target.value;
                                                        updateNested("works", newWorks);
                                                    }}
                                                    className="w-full bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-green-500/30 outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newWorks = [...settings.works];
                                                        newWorks[index].respAndAchievements = newWorks[index].respAndAchievements.filter((_, i) => i !== rIndex);
                                                        updateNested("works", newWorks);
                                                    }}
                                                    className="p-2 text-zinc-400 hover:text-red-500"
                                                >
                                                    <MinusCircle size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newWorks = [...settings.works];
                                                newWorks[index].respAndAchievements.push("");
                                                updateNested("works", newWorks);
                                            }}
                                            className="text-[10px] font-mono text-zinc-400 hover:text-green-500 ml-1"
                                        >
                                            + Add Achievement
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                        <Rocket size={14} />
                        My Work (Projects)
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            const newProjects = [...(settings.projects || []), {
                                id: Date.now(),
                                name: "",
                                created_year: new Date().getFullYear().toString(),
                                tech: "",
                                description: "",
                                source_code: "",
                                demo: ""
                            }];
                            updateNested("projects", newProjects);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-lg text-[10px] uppercase tracking-widest font-bold hover:bg-green-500/20 transition-all"
                    >
                        <Plus size={12} />
                        Add Project
                    </button>
                </div>

                <div className="space-y-4">
                    {(settings.projects || []).map((project, index) => (
                        <div key={project.id || index} className="group relative bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl p-6">
                            <button
                                type="button"
                                onClick={() => {
                                    const newProjects = settings.projects.filter((_, i) => i !== index);
                                    updateNested("projects", newProjects);
                                }}
                                className="absolute top-4 right-4 p-2 text-zinc-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                            
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="col-span-2 space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Project Name</label>
                                    <input
                                        type="text"
                                        value={project.name}
                                        onChange={(e) => {
                                            const newProjects = [...settings.projects];
                                            newProjects[index].name = e.target.value;
                                            updateNested("projects", newProjects);
                                        }}
                                        className="w-full bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-green-500/30 outline-none"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Year</label>
                                    <input
                                        type="text"
                                        value={project.created_year}
                                        onChange={(e) => {
                                            const newProjects = [...settings.projects];
                                            newProjects[index].created_year = e.target.value;
                                            updateNested("projects", newProjects);
                                        }}
                                        className="w-full bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-green-500/30 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="mb-4 space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Tech Stack</label>
                                <input
                                    type="text"
                                    value={project.tech}
                                    onChange={(e) => {
                                        const newProjects = [...settings.projects];
                                        newProjects[index].tech = e.target.value;
                                        updateNested("projects", newProjects);
                                    }}
                                    placeholder="React, Node.js, MongoDB..."
                                    className="w-full bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-xl px-4 py-2 text-xs focus:ring-1 focus:ring-green-500/30 outline-none"
                                />
                            </div>

                            <div className="mb-4 space-y-1.5">
                                <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Description</label>
                                <textarea
                                    value={project.description}
                                    onChange={(e) => {
                                        const newProjects = [...settings.projects];
                                        newProjects[index].description = e.target.value;
                                        updateNested("projects", newProjects);
                                    }}
                                    className="w-full bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-green-500/30 outline-none resize-none"
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Source Code</label>
                                    <div className="flex items-center gap-2 bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-xl px-3 py-2">
                                        <Code size={12} className="text-zinc-400" />
                                        <input
                                            type="text"
                                            value={project.source_code}
                                            onChange={(e) => {
                                                const newProjects = [...settings.projects];
                                                newProjects[index].source_code = e.target.value;
                                                updateNested("projects", newProjects);
                                            }}
                                            className="w-full bg-transparent border-none outline-none focus:ring-0 text-xs"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-mono ml-1">Live Demo</label>
                                    <div className="flex items-center gap-2 bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-xl px-3 py-2">
                                        <LinkIcon size={12} className="text-zinc-400" />
                                        <input
                                            type="text"
                                            value={project.demo}
                                            onChange={(e) => {
                                                const newProjects = [...settings.projects];
                                                newProjects[index].demo = e.target.value;
                                                updateNested("projects", newProjects);
                                            }}
                                            className="w-full bg-transparent border-none outline-none focus:ring-0 text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Me Section with Rich Blocks */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                        <UserIcon size={14} />
                        About Me Content (Rich Blocks)
                    </div>
                </div>

                <div className="space-y-4">
                    {(settings.aboutBlocks || []).map((block, index) => (
                        <div key={index} className="group relative bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest opacity-60 bg-zinc-100 dark:bg-white/5 px-2 py-0.5 rounded">{block.type}</span>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => removeAboutBlock(index)}
                                    className="p-1.5 text-zinc-300 hover:text-red-500 transition-all"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            {block.type === "header" && (
                                <textarea
                                    value={block.content}
                                    onChange={(e) => updateAboutBlock(index, { content: e.target.value })}
                                    placeholder="Section Title"
                                    className="w-full bg-transparent border-none focus:ring-0 p-0 resize-none font-bold text-xl leading-tight placeholder:opacity-30 outline-none"
                                    rows={1}
                                />
                            )}
                            {block.type === "subheader" && (
                                <textarea
                                    value={block.content}
                                    onChange={(e) => updateAboutBlock(index, { content: e.target.value })}
                                    placeholder="Sub-section title"
                                    className="w-full bg-transparent border-none focus:ring-0 p-0 resize-none font-semibold text-lg leading-tight placeholder:opacity-30 outline-none"
                                    rows={1}
                                />
                            )}
                            {block.type === "paragraph" && (
                                <textarea
                                    value={block.content}
                                    onChange={(e) => updateAboutBlock(index, { content: e.target.value })}
                                    placeholder="Write your story..."
                                    className="w-full min-h-[4rem] bg-transparent border-none outline-none focus:ring-0 p-0 resize-none font-sans text-sm leading-relaxed placeholder:opacity-30"
                                />
                            )}
                            {block.type === "list" && (
                                <div className="space-y-3">
                                    {(block.items || [""]).map((item, itemIndex) => (
                                        <div key={itemIndex} className="flex gap-2">
                                            <div className="mt-2 w-1 h-1 rounded-full bg-green-500/40 shrink-0" />
                                            <input
                                                type="text"
                                                value={item}
                                                onChange={(e) => {
                                                    const newItems = [...block.items];
                                                    newItems[itemIndex] = e.target.value;
                                                    updateAboutBlock(index, { items: newItems });
                                                }}
                                                className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newItems = block.items.filter((_, i) => i !== itemIndex);
                                                    updateAboutBlock(index, { items: newItems });
                                                }}
                                                className="text-zinc-400 hover:text-red-500"
                                            >
                                                <MinusCircle size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => updateAboutBlock(index, { items: [...(block.items || []), ""] })}
                                        className="text-[9px] font-mono text-zinc-400 hover:text-green-500"
                                    >
                                        + Add Item
                                    </button>
                                </div>
                            )}
                            {block.type === "image" && (
                                <div className="space-y-3">
                                    {block.url ? (
                                        <div className="relative group/img">
                                            <img src={block.url} alt="About Me" className="w-full rounded-xl h-40 object-cover" />
                                            <button 
                                                type="button"
                                                onClick={() => updateAboutBlock(index, { url: "", fileId: "" })}
                                                className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="w-full h-32 rounded-xl border border-dashed border-zinc-200 dark:border-white/10 flex flex-col items-center justify-center gap-2 bg-zinc-100/30 dark:bg-white/[0.01] relative">
                                            <ImageIcon size={20} className="text-zinc-300" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleAboutImageUpload(index, e.target.files[0])}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                            <span className="text-[9px] uppercase tracking-widest text-zinc-400">Upload Image</span>
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        value={block.caption || ""}
                                        onChange={(e) => updateAboutBlock(index, { caption: e.target.value })}
                                        placeholder="Image caption..."
                                        className="w-full bg-white dark:bg-black/20 border border-zinc-100 dark:border-white/10 rounded-lg px-3 py-1.5 text-[10px] outline-none"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2">
                    {["header", "subheader", "paragraph", "list", "image"].map(type => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => addAboutBlock(type)}
                            className="px-3 py-1.5 bg-zinc-100 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all"
                        >
                            + {type}
                        </button>
                    ))}
                </div>
            </section>

            <div className="fixed bottom-8 left-0 right-0 max-w-2xl mx-auto px-4 pointer-events-none">
                <button
                    type="submit"
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2 p-4 bg-green-500 text-white rounded-2xl font-semibold text-base hover:bg-green-600 transition-all disabled:opacity-50 shadow-2xl shadow-green-500/20 pointer-events-auto"
                >
                    {saving ? "Synchronizing..." : <><Save size={18} /> Update Website Content</>}
                </button>
            </div>
        </form>
    );
}


SiteSettingsForm.propTypes = {
    settings: PropTypes.shape({
        tagLine: PropTypes.string,
        profileImage: PropTypes.string,
        socials: PropTypes.object,
        works: PropTypes.array,
        projects: PropTypes.array,
        aboutBlocks: PropTypes.array,
    }),
    setSettings: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    saving: PropTypes.bool,
};

export default AdminDashboard;
