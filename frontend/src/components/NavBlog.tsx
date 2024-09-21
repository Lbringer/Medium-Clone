import { Add } from "./Add";
import { Logo } from "./Logo";
import Logout from "./Logout";

export const NavBlog = () => {
  return (
    <div className="sticky bg-stone-50 top-0 w-full py-3 flex justify-between items-center border-b">
      <Logo type="static" />
      <div className="flex justify-between items-center">
        <Add />
        <Logout />
      </div>
    </div>
  );
};
