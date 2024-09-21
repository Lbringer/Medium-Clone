import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BROWSER_URL } from "../config";
import { BlogCardProps } from "../components/BlogCard";

export const useCheckLoggedIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loadingAuth, setLoadingAuth] = useState(true);
  useEffect(() => {
    axios
      .get(`${BROWSER_URL}/api/v1/post/whoami`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        if (location.pathname != "/blogs") {
          navigate("/blogs");
        }
        setLoadingAuth(false);
      })
      .catch(() => {
        if (location.pathname == "/blogs") {
          navigate("/signin");
        }
        setLoadingAuth(false);
      });
  }, []);

  return { loadingAuth };
};

export const useWhoami = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    axios
      .get(`${BROWSER_URL}/api/v1/post/whoami`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setName(res.data.name);
      });
  }, []);

  return { name };
};

export const useGetAllBlogs = () => {
  const [blogs, setBlogs] = useState<Array<BlogCardProps>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${BROWSER_URL}/api/v1/post/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      });
  }, []);
  return { blogs, loading };
};
