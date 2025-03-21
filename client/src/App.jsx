import { Routes, Route } from "react-router-dom";
import BlogLayout from "./components/layouts/BlogLayout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import RegionPage from "./pages/RegionPage";

import AdminLayout from "./components/admin/AdminLayout";
import PanelPage from "./pages/admin/PanelPage";
import NewBlogPage from "./pages/admin/NewBlogPage";
import AllBlogsAd from "./pages/admin/AllBlogsAd";
import AllBlogs from "./pages/AllBlogs";
import EditBlogPage from "./pages/admin/EditBlogPage";
import AllUsersAd from "./pages/admin/AllUsersAd";
import NotFoundPage from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import AllComments from "./pages/admin/AllComments";
import UserPage from "./pages/UserPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogLayout />}>
          <Route path="/user/:id" element={<UserPage />} />
          <Route index element={<HomePage />} />
          <Route path="/blog" element={<AllBlogs />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/blog/regions/:slug" element={<RegionPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin/" element={<AdminLayout />}>
          <Route index element={<PanelPage />} />
          <Route path="create-post" element={<NewBlogPage />} />
          <Route path="allblogs" element={<AllBlogsAd />} />
          <Route path="allcomments" element={<AllComments />} />
          <Route path="allusers" element={<AllUsersAd />} />
          <Route path="edit/:slug" element={<EditBlogPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
