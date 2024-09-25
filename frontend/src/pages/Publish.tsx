import { EditorInput } from "../components/EditorInput";
import { EditorTitle } from "../components/EditorTtitle";
import { useCheckLoggedIn } from "../hooks";

import { NavPublish } from "../components/NavPublish";
import { useState } from "react";
import { CreatePostInput } from "@lbringer237/medium-clone-common";
import axios from "axios";
import { BROWSER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";

const Publish = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newPost, setnewPost] = useState<CreatePostInput>({
    title: "",
    content: "",
  });
  const setTitle = (title: string) => {
    setnewPost({ ...newPost, title });
  };
  const setContent = (content: string) => {
    setnewPost({ ...newPost, content });
  };
  useCheckLoggedIn();
  const handleClick = async () => {
    console.log(newPost);
    try {
      setLoading(true);
      const res = await axios.post(`${BROWSER_URL}/api/v1/post`, newPost, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setLoading(false);
      navigate(`/blog/${res.data.id}`);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <div className="min-w-screen h-screen px-10 md:px-20 flex flex-col items-center">
      <NavPublish handleClick={handleClick} />
      <div className="w-3/4 h-4/5 overflow-y-scroll overflow-x-hidden">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="w-full items-center mt-10">
              <EditorTitle setTitle={setTitle} />
            </div>
            <div className="grow w-full items-center">
              <EditorInput setContent={setContent} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Publish;
