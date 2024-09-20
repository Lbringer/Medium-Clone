import { useWhoami } from "../hooks";
import { Add } from "./Add";
import { Logo } from "./Logo";
import Logout from "./Logout";

export const Nav = () => {
  const { name } = useWhoami();
  return (
    <div className="sticky bg-stone-50 top-0 w-full py-3 flex justify-between items-center border-b">
      <Logo type="static" />
      <div className="flex justify-between items-center">
        {name == "" ? (
          <div role="status" className="animate-pulse mr-4 ">
            <div className="h-5 bg-stone-200 rounded-full w-20"></div>
          </div>
        ) : (
          <div className="hidden md:block mr-4 text-xl font-serif">
            お帰りなさい, <span className="font-medium mb-1 ml-1"> {name}</span>
          </div>
        )}

        <Add />
        <Logout />
      </div>
    </div>
  );
};

export default Nav;
