import { Routes, Route } from "react-router-dom";
import BlogLayout from "./components/layouts/BlogLayout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import RegionPage from "./pages/RegionPage";
import AllBlogs from "./pages/AllBlogs";
import AdminLayout from "./components/admin/AdminLayout";
import PanelPage from "./pages/admin/PanelPage";
import NewBlogPage from "./pages/admin/NewBlogPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/blog" element={<AllBlogs />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/blog/regions/:slug" element={<RegionPage />} />
        </Route>
        <Route path="/admin/" element={<AdminLayout />}>
          <Route index element={<PanelPage />} />
          <Route path="create-post" element={<NewBlogPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
