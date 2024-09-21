import { Hero } from "../components/Hero";
import { Auth_SignUp } from "../components/Auth_SignUp";
import { Logo } from "../components/Logo";
import { useCheckLoggedIn } from "../hooks";
import { Loader } from "../components/Loader";
import { useLocation } from "react-router-dom";
export const SignUp = () => {
  let { state } = useLocation();
  if (state != "/signin") {
    const { loadingAuth } = useCheckLoggedIn();
    if (loadingAuth) {
      return <Loader />;
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-screen ">
      <Logo type={"absolute"} />
      <Auth_SignUp />
      <Hero />
    </div>
  );
};
