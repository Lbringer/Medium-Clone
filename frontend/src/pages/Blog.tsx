import { useParams } from "react-router-dom";
import { useCheckLoggedIn, useGetBlog } from "../hooks";
import { NavBlog } from "../components/NavBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
  useCheckLoggedIn();
  const { id } = useParams();
  const { blog, loading } = useGetBlog(id);
  return (
    <div className="min-h-screen w-screen px-10 md:px-20 pb-10 flex flex-col items-center">
      <NavBlog />
      {loading ? (
        <BlogSkeleton />
      ) : (
        <div className="h-full w-3/4">
          <div
            className="text-3xl md:text-4xl mt-10 mb-2"
            dangerouslySetInnerHTML={{ __html: blog.title }}
          ></div>
          <div
            className="text-xs md:text-sm text-stone-500 mb-5 md:mb-10"
            dangerouslySetInnerHTML={{
              __html: blog.publishedDate.slice(0, 10),
            }}
          ></div>
          <div
            className="text-sm md:text-base"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};
