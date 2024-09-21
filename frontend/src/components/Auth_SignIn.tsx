import { SigninInput } from "@lbringer237/medium-clone-common";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BROWSER_URL } from "../config";
import { Heading } from "./Heading";
import { Caption } from "./Caption";
import { InputForm } from "./InputForm";
import { SubmitBtn } from "./SubmitBtn";
import { ErrorAuth } from "./ErrorAuth";
import { Loader } from "./Loader";

export const Auth_SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<{ msg: string; isVisible: boolean }>({
    msg: "",
    isVisible: false,
  });
  const handleBtnClick = async () => {
    try {
      setisLoading(true);
      const res = await axios.post(`${BROWSER_URL}/api/v1/user/signin`, data);
      const { jwt } = res.data;
      localStorage.setItem("token", jwt);
      setisLoading(false);
      navigate("/blogs");
    } catch (error: any) {
      setisLoading(false);
      setError({
        msg:
          error.response?.data.error ||
          error.response?.data.message ||
          "Something went wrong",
        isVisible: true,
      });
      console.log(error);
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {error.isVisible ? <ErrorAuth errMsg={error.msg} /> : ""}
      <Heading type={"signin"} />
      <Caption type={"signin"} />
      <InputForm
        label={"Email"}
        placeholder={"Enter your email"}
        typeOfInput="email"
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
        }}
      />
      <InputForm
        label={"Password"}
        placeholder={"Enter your password"}
        typeOfInput="password"
        onChange={(e) => {
          setData({ ...data, password: e.target.value });
        }}
      />
      <SubmitBtn type={"signin"} onClick={handleBtnClick} />
    </div>
  );
};
