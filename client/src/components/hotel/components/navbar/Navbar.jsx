import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
const NavbarHotel = () => {
  // const { user } = useContext(AuthContext);
  const user = window.localStorage.getItem("user");

  return (
    <div className="navbar relative navbarHotel">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">
            <img src="/assets/vj-white-logo.f34b6108.svg" alt="" />
          </span>
        </Link>

        {!user && (
          <div className="navItems  flex items-center text-3">
            <Link to="/register">
              <button className="navButton text-white">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton text-white">Login</button>
            </Link>
          </div>
        )}
        {user && user !== "" && user !== null && user}
      </div>
    </div>
  );
};

export default NavbarHotel;
