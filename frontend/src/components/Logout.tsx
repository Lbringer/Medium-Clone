import { useNavigate } from "react-router-dom";
import logout from "../assets/logout.svg";
const Logout = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  return (
    <div
      onClick={handleClick}
      className="bg-stone-950 w-10 h-10 flex justify-center items-center rounded-full font-serif text-stone-50 p-3 text-sm cursor-pointer"
    >
      <img src={logout} alt="logout" />
    </div>
  );
};

export default Logout;
