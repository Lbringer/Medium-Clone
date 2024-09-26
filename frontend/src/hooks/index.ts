import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BROWSER_URL } from "../config";
import { BlogCardProps } from "../components/BlogCard";

export const useCheckLoggedIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (location.pathname.startsWith("/blog")) {
        navigate("/signin");
      }
    } else {
      if (!location.pathname.startsWith("/blog")) {
        navigate("/blogs");
      }
    }
  }, []);
};

export const useWhoami = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${BROWSER_URL}/api/v1/post/whoami`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setName(res.data.name);
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/signin");
      });
  }, []);

  return { name };
};

export const useGetBlog = (id: string | undefined) => {
  const [blog, setBlog] = useState<BlogCardProps>({
    content: "",
    title: "",
    publishedDate: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BROWSER_URL}/api/v1/post/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  return { loading, blog };
};
