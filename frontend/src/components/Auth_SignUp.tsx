import { useState } from "react";
import { Caption } from "./Caption";
import { Heading } from "./Heading";
import { InputForm } from "./InputForm";
import { SubmitBtn } from "./SubmitBtn";
import { SignupInput } from "@lbringer237/medium-clone-common";
import axios from "axios";
import { BROWSER_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ErrorAuth } from "./ErrorAuth";

export const Auth_SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<{ msg: string; isVisible: boolean }>({
    msg: "",
    isVisible: false,
  });
  const handleBtnClick = async () => {
    try {
      const res = await axios.post(`${BROWSER_URL}/api/v1/user/signup`, data);
      const { jwt } = res.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error: any) {
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
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {error.isVisible ? <ErrorAuth errMsg={error.msg} /> : ""}
      <Heading type={"signup"} />
      <Caption type={"signup"} />
      <InputForm
        label={"Username"}
        placeholder={"Enter your username"}
        onChange={(e) => {
          setData({ ...data, name: e.target.value });
        }}
      />
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
      <SubmitBtn type={"signup"} onClick={handleBtnClick} />
    </div>
  );
};
