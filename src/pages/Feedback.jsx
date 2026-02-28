import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import { feedbackFunction, fetchFeedbacks } from "../functions/feedbackForm"
import { Helmet } from "react-helmet"
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

        const response = await feedbackFunction(feedbackForm)
        setResponse(response)

        setFeedbackForm(initialState)
        setIsPending(false);

        setTimeout(() => {
            setResponse(false)
        }, 5000)
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
                <title>Feedback | Sankalp Pimpalkar</title>
                <meta name="description" content="Send feedback or get in touch with Sankalp Pimpalkar. Let's collaborate or discuss projects." />
                <meta name="keywords" content="Feedback, Contact, Sankalp Pimpalkar, Hire Developer" />
                <meta property="og:title" content="Feedback | Sankalp Pimpalkar" />
                <meta property="og:description" content="Share your thoughts or reach out to Sankalp for web development work." />
                <meta property="og:image" content="https://shanky.in/logo.jpeg" />
                <meta property="og:url" content="https://shanky.in/feedback" />
                <link rel="canonical" href="https://shanky.in/feedback" />
            </Helmet>

            <div className="flex flex-col gap-12">
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <MessageSquare className="text-green-500" size={24} />
                        <h1 className="text-3xl font-bold dark:text-gray-100 text-gray-800">
                            Wall of Feedback
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {feedbacks?.map(feedback => (
                            <div key={feedback.$id} className="p-6 border dark:bg-gray-secondary/20 bg-white dark:border-gray-800 border-gray-200 rounded-2xl hover:border-green-500/20 transition-all duration-300 group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm dark:text-gray-100 text-gray-800">
                                            {feedback.name}
                                        </h3>
                                        <p className="text-[10px] font-mono text-green-500 uppercase">
                                            {feedback.type}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm dark:text-gray-400 text-gray-600 leading-relaxed italic">
                                    "{feedback.feedback}"
                                </p>
                            </div>
                        ))}
                        
                        {!feedbacks.length && (
                            <div className="col-span-full py-12 text-center border-2 border-dashed dark:border-gray-800 border-gray-100 rounded-3xl">
                                <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">
                                    The wall is waiting for its first stone.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="p-8 border dark:bg-gray-secondary/10 bg-gray-50/50 dark:border-gray-800 border-gray-200 rounded-3xl">
                    <div className="max-w-xl">
                        <h2 className="text-2xl font-bold dark:text-gray-100 text-gray-800 mb-2">
                            Drop a Note
                        </h2>
                        <p className="text-sm dark:text-gray-400 text-gray-600 mb-8 font-normal">
                            Have a suggestion or just want to say hi? I&apos;d love to hear from you.
                        </p>

                        {!response ? (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={16} />
                                        <input
                                            id="name"
                                            value={feedbackForm.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border dark:bg-gray-800/50 bg-white dark:border-gray-700 border-gray-200 dark:text-white text-gray-900 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all text-sm"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors" size={16} />
                                        <input
                                            id="email"
                                            type="email"
                                            value={feedbackForm.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border dark:bg-gray-800/50 bg-white dark:border-gray-700 border-gray-200 dark:text-white text-gray-900 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all text-sm"
                                            placeholder="Your Email"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 py-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="feedback-type"
                                            checked={feedbackForm.type === "comment"}
                                            value="comment"
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-green-500"
                                        />
                                        <span className="text-xs font-medium dark:text-gray-400 text-gray-600 group-hover:text-green-500 transition-colors">Comment</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="radio"
                                            name="feedback-type"
                                            checked={feedbackForm.type === "suggestion"}
                                            value="suggestion"
                                            onChange={handleChange}
                                            className="w-4 h-4 accent-green-500"
                                        />
                                        <span className="text-xs font-medium dark:text-gray-400 text-gray-600 group-hover:text-green-500 transition-colors">Suggestion</span>
                                    </label>
                                </div>

                                <textarea
                                    id="feedback"
                                    value={feedbackForm.feedback}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 rounded-xl border dark:bg-gray-800/50 bg-white dark:border-gray-700 border-gray-200 dark:text-white text-gray-900 focus:border-green-500 dark:focus:border-green-500 outline-none transition-all text-sm resize-none"
                                    placeholder="Tell me what's on your mind..."
                                    rows="4"
                                />

                                <div className="flex items-center gap-3 mt-4">
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
                                    >
                                        {isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="py-3 px-6 rounded-xl border dark:border-gray-700 border-gray-200 dark:text-gray-300 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all text-sm font-semibold"
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
                                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">Feedback Received!</h3>
                                <p className="text-sm dark:text-gray-400 text-gray-600">
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