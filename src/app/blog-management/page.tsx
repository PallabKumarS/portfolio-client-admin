import { Metadata } from "next";
import AdminBlogPage from "./AdminBlogPage";

export const metadata: Metadata = {
  title: "Dashboard | Blog Management",
  description: "Add, Edit, Delete, View Blogs",
};

const BlogManageMentPage = () => {
  return (
    <div>
      <AdminBlogPage />
    </div>
  );
};

export default BlogManageMentPage;
