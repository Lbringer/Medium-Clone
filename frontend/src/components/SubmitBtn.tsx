import React from "react";

type SubmitBtnProps = {
  type: string;
  onClick: (e: any) => void;
};

export const SubmitBtn: React.FC<SubmitBtnProps> = ({ type, onClick }) => {
  return (
    <button
      className="bg-stone-950 w-1/2 rounded text-stone-50 text-sm px-5 py-3"
      onClick={onClick}
    >
      {type == "signup" ? "Sign Up" : "Login"}
    </button>
  );
};
