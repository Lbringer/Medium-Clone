import { Logo } from "./Logo";
import { Spinner } from "./Spinner";

export const Loader = () => {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center">
      <Logo type="absolute" />
      <Spinner />;
    </div>
  );
};
