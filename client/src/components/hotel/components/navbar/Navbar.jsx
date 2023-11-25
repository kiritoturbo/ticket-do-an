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
            <img src="assets/vj-white-logo.f34b6108.svg" alt="" />
          </span>
        </Link>
        {user ? (
          user?.username
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarHotel;
