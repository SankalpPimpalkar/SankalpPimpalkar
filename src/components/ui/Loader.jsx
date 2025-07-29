import { LoaderCircle } from "lucide-react"

function Loader() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white  dark:bg-gray-primary">
            <LoaderCircle size={32} className="text-yellow-300 dark:text-yellow-400 animate-spin"/>
            <h1 className="mt-4 text-gray-600 dark:text-gray-500 text-sm">
                Please Wait...
            </h1>
        </div>
    )
}

export default Loader