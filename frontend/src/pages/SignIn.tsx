import { Auth_SignIn } from "../components/Auth_SignIn";
import { Hero } from "../components/Hero";
import { Logo } from "../components/Logo";
import { useCheckLoggedIn } from "../hooks";

export const SignIn = () => {
  useCheckLoggedIn();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-screen ">
      <Logo type={"absolute"} />
      <Auth_SignIn />
      <Hero />
    </div>
  );
};
