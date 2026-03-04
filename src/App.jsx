import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Feedback from "./pages/Feedback"
import Blogs from "./pages/Blogs"
import BlogDetail from "./pages/BlogDetail"
import AdminDashboard from "./pages/AdminDashboard"
import Construction from "./pages/Construction"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Feedback />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="*" element={<Construction />} />
      </Route>
    </Routes>
  )
}


export default App