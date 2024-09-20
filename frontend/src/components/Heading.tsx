import React from "react";

export type AuthProps = {
  type: string;
};

export const Heading: React.FC<AuthProps> = ({ type }) => {
  return (
    <div className="font-light text-3xl font-serif">
      {type == "signup" ? "Create an account" : "Welcome Back"}
    </div>
  );
};
