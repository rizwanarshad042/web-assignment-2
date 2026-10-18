import { Menu, UserRound, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, toggleNav } from "../store";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const open = useSelector((state) => state.ui.navOpen);
  return (
    <header className="topbar">
      <Link to="/events" className="brand">
        <span className="brand-mark">E</span>
        <span>BookSmart</span>
      </Link>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {user && <Link to="/my-events">My Events</Link>}
        {user ? (
          <button className="nav-user" onClick={() => dispatch(logout())}>
            <UserRound size={16} /> {user.name.split(" ")[0]}{" "}
            <span>Log out</span>
          </button>
        ) : (
          <>
            <Link className="nav-login" to="/login">
              Login
            </Link>
            <Link className="nav-signup" to="/register">
              Create Account
            </Link>
          </>
        )}
      </nav>
      <button
        className="menu-button"
        onClick={() => dispatch(toggleNav())}
        aria-label="Toggle menu"
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

export default Navbar;