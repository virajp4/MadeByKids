import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../../store/UserContext";

export default function NavItem({ title, href, isLogout }) {
  const navigate = useNavigate();
  const { setUserId } = useUserContext();

  const navClass =
    "block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 hover:text-black md:hover:text-gray-600 md:p-0 text-black font-semibold";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    setUserId("");
    navigate("/");
    window.location.reload();
  };

  if (isLogout) {
    return (
      <li>
        <button className={navClass} onClick={handleLogout}>
          Logout
        </button>
      </li>
    );
  }

  return (
    <li>
      <NavLink className={navClass} to={href} activeclassname="active">
        {title}
      </NavLink>
    </li>
  );
}
