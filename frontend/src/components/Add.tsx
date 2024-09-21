import { Link } from "react-router-dom";
import add from "../assets/add.svg";
export const Add = () => {
  return (
    <Link
      to={"/blog/publish"}
      className="border border-stone-950 w-10 h-10 flex justify-center items-center rounded-full font-serif text-stone-50 p-3 text-sm cursor-pointer mr-4"
    >
      <img className="" src={add} alt="add" />
    </Link>
  );
};
