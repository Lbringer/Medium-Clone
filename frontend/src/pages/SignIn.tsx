import { useLocation } from "react-router-dom";
import { Auth_SignIn } from "../components/Auth_SignIn";
import { Hero } from "../components/Hero";
import { Loader } from "../components/Loader";
import { Logo } from "../components/Logo";
import { useCheckLoggedIn } from "../hooks";

export const SignIn = () => {
  let { state } = useLocation();
  if (state != "/signup") {
    const { loadingAuth } = useCheckLoggedIn();
    if (loadingAuth) {
      return <Loader />;
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-screen ">
      <Logo type={"absolute"} />
      <Auth_SignIn />
      <Hero />
    </div>
  );
};
