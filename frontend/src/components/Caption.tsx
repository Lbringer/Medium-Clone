import React from "react";

import { AuthProps } from "./Heading";
import { Link } from "react-router-dom";

export const Caption: React.FC<AuthProps> = ({ type }) => {
  return (
    <div className="text-sm mt-1 mb-4 text-stone-500">
      {type == "signup"
        ? "Already have an account? "
        : "Dont have an account? "}
      <span className="font-medium">
        {type == "signup" ? (
          <Link className="underline" to={"/signin"} state={location.pathname}>
            Login
          </Link>
        ) : (
          <Link className="underline" to={"/signup"} state={location.pathname}>
            Signup
          </Link>
        )}
      </span>
    </div>
  );
};
