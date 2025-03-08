import { Routes, Route } from "react-router-dom";
import BlogLayout from "./components/layouts/BlogLayout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BlogLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          {/*<Route path="/category/:slug" element={<CategoryPage />} />
           <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/blog/:slug" element={<BlogPage />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
