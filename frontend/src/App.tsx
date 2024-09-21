import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import Publish from "./pages/Publish";

function App() {
  return (
    <div className="bg-stone-50 text-stone-950">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/signup"} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="blog/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
