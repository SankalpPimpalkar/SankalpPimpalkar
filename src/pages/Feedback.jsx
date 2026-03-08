import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import { feedbackFunction, fetchFeedbacks } from "../functions/feedbackForm"
import { Helmet } from "react-helmet-async";
import { MessageSquare, ThumbsUp, Send, User, AtSign, Loader2, CheckCircle2 } from "lucide-react"

function Feedback() {

    const initialState = {
        name: "",
        email: "",
        type: "comment",
        feedback: ""
    }

    const [feedbacks, setFeedbacks] = useState([])
    const [feedbackForm, setFeedbackForm] = useState(initialState)
    const [isPending, setIsPending] = useState(false)
    const [response, setResponse] = useState(false)

    function handleChange(e) {

        const { id, value, type } = e.target

        setFeedbackForm(
            state => ({
                ...state,
                [type === "radio" ? "type" : id]: value
            })
        )
    }

    function handleClear(e) {
        e.preventDefault();
        setFeedbackForm(initialState)
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setIsPending(true);
        const isfeedbackValid = feedbackForm.name.trim() && feedbackForm.email.trim() && feedbackForm.feedback.trim()

        if (!isfeedbackValid) {
            setIsPending(false);
            return;
        }

        try {
            const response = await feedbackFunction(feedbackForm)
            if (response) {
                setFeedbacks(prev => [response, ...prev])
                setResponse(true)
                setFeedbackForm(initialState)
            } else {
                setResponse(false)
            }
        } catch (error) {
            console.error("Submission error:", error)
            setResponse(false)
        } finally {
            setIsPending(false);
            setTimeout(() => {
                setResponse(false)
            }, 5000)
        }
    }

    useEffect(() => {
        (async () => {
            const response = await fetchFeedbacks()
            if (response) {
                setFeedbacks(response)
            }
        })()
    }, [])

    return (
        <main className="mt-28 sm:mt-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Helmet>
                <title>Contact & Inquiries | Sankalp Pimpalkar</title>
                <meta name="description" content="Get in touch with Sankalp Pimpalkar for AI integration, Full Stack development, or Mobile app projects. Let's build something exceptional together." />
                <meta name="keywords" content="Hire Developer, Contact Sankalp, AI Engineer, Full Stack Developer, Mobile App Developer, Project Inquiry" />
                <meta property="og:title" content="Contact & Inquiries | Sankalp Pimpalkar" />
                <meta property="og:description" content="Build your next AI or Full Stack project with Sankalp. Reach out for collaboration or hiring." />
                <meta property="og:image" content="https://shanky.in/logo.jpeg" />
                <meta property="og:url" content="https://shanky.in/community" />
                <link rel="canonical" href="https://shanky.in/community" />
            </Helmet>

            <div className="flex flex-col gap-12">
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <MessageSquare className="text-green-500" size={24} />
                        <h1 className="text-3xl font-bold dark:text-zinc-100 text-zinc-800">
                            Community & Clients
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {feedbacks?.filter(f => f.type !== 'hiring').map(feedback => (
                            <div key={feedback.id} className="p-6 border dark:bg-zinc-800/20 bg-zinc-50/50 dark:border-white/5 border-zinc-200/60 rounded-2xl hover:-translate-y-0.5 transition-all duration-300 group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm dark:text-zinc-100 text-zinc-800">
                                            {feedback.name}
                                        </h3>
                                        <p className="text-[10px] font-mono text-green-500 uppercase">
                                            {feedback.type}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm dark:text-zinc-400 text-zinc-600 leading-relaxed italic">
                                    "{feedback.feedback}"
                                </p>
                            </div>
                        ))}
                        
                        {!feedbacks.length && (
                            <div className="col-span-full py-12 text-center border-2 border-dashed dark:border-zinc-800 border-zinc-100 rounded-3xl">
                                <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                                    The wall is waiting for its first stone.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="p-8 border dark:bg-zinc-800/20 bg-zinc-50/50 dark:border-white/5 border-zinc-200/60 rounded-3xl">
                    <div className="max-w-xl">
                        <h2 className="text-2xl font-bold dark:text-zinc-100 text-zinc-800 mb-2 tracking-tight">
                            Work with me
                        </h2>
                        <p className="text-sm dark:text-zinc-400 text-zinc-600 mb-8 font-normal leading-relaxed">
                            Looking for a developer to build your next <b>
                                AI agent</b>, <b>Mobile app</b>, or <b>Full Stack system</b>? I&apos;m currently available for interesting projects and partnerships.
                        </p>

                        {!response ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-200 transition-colors" size={16} />
                                        <input
                                            id="name"
                                            value={feedbackForm.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border dark:bg-zinc-800/20 bg-white dark:border-white/5 border-zinc-200/60 dark:text-white text-zinc-900 focus:border-zinc-300 dark:focus:border-white/10 outline-none transition-all text-sm"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-200 transition-colors" size={16} />
                                        <input
                                            id="email"
                                            type="email"
                                            value={feedbackForm.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border dark:bg-zinc-800/20 bg-white dark:border-white/5 border-zinc-200/60 dark:text-white text-zinc-900 focus:border-zinc-300 dark:focus:border-white/10 outline-none transition-all text-sm"
                                            placeholder="Your Email"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 py-2 overflow-x-auto no-scrollbar">
                                    <label className="flex items-center gap-2 cursor-pointer group shrink-0">
                                        <input
                                            type="radio"
                                            name="feedback-type"
                                            checked={feedbackForm.type === "hiring"}
                                            value="hiring"
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-green-500"
                                        />
                                        <span className="text-xs font-bold dark:text-zinc-100 text-zinc-800 group-hover:text-green-500 transition-colors">Hiring / Project</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group shrink-0">
                                        <input
                                            type="radio"
                                            name="feedback-type"
                                            checked={feedbackForm.type === "suggestion"}
                                            value="suggestion"
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-green-500"
                                        />
                                        <span className="text-xs font-medium dark:text-zinc-400 text-zinc-600 group-hover:text-green-500 transition-colors">Suggestion</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group shrink-0">
                                        <input
                                            type="radio"
                                            name="feedback-type"
                                            checked={feedbackForm.type === "comment"}
                                            value="comment"
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-green-500"
                                        />
                                        <span className="text-xs font-medium dark:text-zinc-400 text-zinc-600 group-hover:text-green-500 transition-colors">General</span>
                                    </label>
                                </div>

                                <textarea
                                    id="feedback"
                                    value={feedbackForm.feedback}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 rounded-xl border dark:bg-zinc-800/20 bg-white dark:border-white/5 border-zinc-200/60 dark:text-white text-zinc-900 focus:border-zinc-300 dark:focus:border-white/10 outline-none transition-all text-sm resize-none"
                                    placeholder="Tell me what's on your mind..."
                                    rows="4"
                                />

                                <div className="flex items-center gap-3 mt-4">
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg dark:shadow-white/5"
                                    >
                                        {isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="py-3 px-6 rounded-xl border dark:border-zinc-700 border-zinc-200 dark:text-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-sm font-semibold"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="py-10 text-center animate-in zoom-in duration-500">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-4">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3 className="text-xl font-bold dark:text-white text-zinc-900 mb-2">Feedback Received!</h3>
                                <p className="text-sm dark:text-zinc-400 text-zinc-600">
                                    Thank you for your thoughts. I appreciate you taking the time!
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Feedback