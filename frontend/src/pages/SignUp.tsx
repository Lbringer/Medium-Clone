import { Hero } from "../components/Hero";
import { Auth_SignUp } from "../components/Auth_SignUp";
import { Logo } from "../components/Logo";
import { useCheckLoggedIn } from "../hooks";
export const SignUp = () => {
  useCheckLoggedIn();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-screen ">
      <Logo type={"absolute"} />
      <Auth_SignUp />
      <Hero />
    </div>
  );
};
