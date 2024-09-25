import axios from "axios";
import BlogCard from "../components/BlogCard";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import Nav from "../components/Nav";
import NoBlogs from "../components/NoBlogs";
import { SearchBar } from "../components/SearchBar";
import { useCheckLoggedIn, useGetAllBlogs } from "../hooks";
import { BROWSER_URL } from "../config";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../components/Loader";

export const Blogs = () => {
  const [query, setQuery] = useState("");
  let timeoutId: ReturnType<typeof setTimeout>;
  const debouncedHandlChange = (e: any) => {
    console.log("Here");
    clearInterval(timeoutId);
    timeoutId = setTimeout(() => {
      handleChange(e);
    }, 400);
  };
  const handleChange = async (e: any) => {
    setQuery(e.target.value);
    setPage(1);
  };
  useCheckLoggedIn();
  const { blogs, loading, setBlogs, setLoading } = useGetAllBlogs();
  console.log(blogs);

  //Inifnite Scroll
  const [page, setPage] = useState(1);
  const [loadingNewPosts, setLoadingNewPosts] = useState(false);
  const loaderRef = useRef(null);

  let timeoutId2: ReturnType<typeof setTimeout>;
  const debouncedFetchBlogs = (page: number, query: string) => {
    clearInterval(timeoutId2);
    timeoutId2 = setTimeout(() => {
      fetchBlogs(page, query);
    }, 400);
  };
  const fetchBlogs = (page: number, query: string) => {
    if (page == 1) {
      setLoading(true);
      axios
        .get(`${BROWSER_URL}/api/v1/post/bulk?search=${query}&page=${page}`, {
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
    } else {
      setLoadingNewPosts(true);
      axios
        .get(`${BROWSER_URL}/api/v1/post/bulk?search=${query}&page=${page}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setLoadingNewPosts(false);
          setBlogs((blogs) => [...blogs, ...res.data]);
        })
        .catch(() => {
          setLoadingNewPosts(false);
        });
    }
  };

  useEffect(() => {
    debouncedFetchBlogs(page, query);
  }, [page, query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);
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
        <div ref={loaderRef} className="mt-10 mb-10">
          {loadingNewPosts ? <Loader /> : <div></div>}
        </div>
      </div>
    </div>
  );
};
