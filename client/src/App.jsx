import { Routes, Route } from "react-router-dom";
import BlogLayout from "./components/layouts/BlogLayout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import RegionPage from "./pages/RegionPage";
import AllBlogs from "./pages/AllBlogs";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/blog" element={<AllBlogs />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/blog/regions/:slug" element={<RegionPage />} />
          {/* <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/blog/:slug" element={<BlogPage />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
