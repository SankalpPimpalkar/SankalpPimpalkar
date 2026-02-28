import { Outlet } from "react-router-dom"
import { Navbar } from "./components"
import Footer from "./components/Footer"

function Layout() {
    return (
        <div className="w-full h-full min-h-screen p-5 animate-in fade-in duration-700">
            <Navbar />

            <div className="w-full max-w-[41rem] mx-auto py-10">
                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

export default Layout