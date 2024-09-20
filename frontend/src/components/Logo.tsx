import React from "react";
import { Link } from "react-router-dom";

type LogoProps = {
  type: string;
};

export const Logo: React.FC<LogoProps> = ({ type }) => {
  return (
    <Link
      to={"/"}
      className={`${type} text-3xl font-light font-serif left-10 top-5`}
    >
      日記
    </Link>
  );
};
