import BlogCard from "../components/BlogCard";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import Nav from "../components/Nav";
import NoBlogs from "../components/NoBlogs";
import { useCheckLoggedIn, useGetAllBlogs } from "../hooks";

export const Blogs = () => {
  useCheckLoggedIn();
  const { blogs, loading } = useGetAllBlogs();
  return (
    <div className="min-w-screen min-h-screen px-10 md:px-20">
      <Nav />
      <div className="w-full flex flex-col items-center">
        {loading ? (
          <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </>
        ) : blogs.length == 0 ? (
          <NoBlogs />
        ) : (
          <>
            {blogs.map((blog) => {
              return (
                <BlogCard
                  content={blog.content}
                  title={blog.title}
                  publishedDate={blog.publishedDate}
                  key={blog.id}
                  id={blog.id}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
