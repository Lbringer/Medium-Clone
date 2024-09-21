import { Spinner } from "./Spinner";

export const Loader = () => {
  return (
    <div className="min-h-full w-full flex justify-center items-center">
      <Spinner />;
    </div>
  );
};
