import { Logo } from "./Logo";
import Logout from "./Logout";
import publish from "../assets/publish.svg";
import React from "react";

type NavPublishProps = {
  handleClick: () => void;
};

export const NavPublish: React.FC<NavPublishProps> = ({ handleClick }) => {
  return (
    <div className="sticky bg-stone-50 top-0 w-full py-3 flex justify-between items-center border-b">
      <Logo type="static" />
      <div className="flex justify-between items-center">
        <button
          onClick={handleClick}
          className="bg-stone-950 rounded-full p-2 flex justify-center items-center mr-4"
        >
          <img width={"19px"} src={publish} alt="publish" />
        </button>
        <Logout />
      </div>
    </div>
  );
};
