import axios from "axios";
import BlogCard from "../components/BlogCard";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import Nav from "../components/Nav";
import NoBlogs from "../components/NoBlogs";
import { SearchBar } from "../components/SearchBar";
import { useCheckLoggedIn, useGetAllBlogs } from "../hooks";
import { BROWSER_URL } from "../config";

export const Blogs = () => {
  let timeoutId: ReturnType<typeof setTimeout>;
  const debouncedHandlChange = (e: any) => {
    console.log("Here");
    clearInterval(timeoutId);
    timeoutId = setTimeout(() => {
      handleChange(e);
    }, 400);
  };
  const handleChange = async (e: any) => {
    setLoading(true);
    axios
      .get(`${BROWSER_URL}/api/v1/post/bulk?search=${e.target.value}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLoading(false);
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useCheckLoggedIn();
  const { blogs, loading, setBlogs, setLoading } = useGetAllBlogs();
  console.log(blogs);

  return (
    <div className="min-w-screen min-h-screen px-10 md:px-20">
      <Nav />
      <div className="w-full flex flex-col items-center">
        <SearchBar debouncedHandlChange={debouncedHandlChange} />
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
