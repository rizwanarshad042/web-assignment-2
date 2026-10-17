import { useState } from "react";
import { Menu, UserRound, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <Link to="/events" className="brand">
        <span className="brand-mark">E</span>
        <span>BookSmart</span>
      </Link>
      <nav className={open ? "nav-links open" : "nav-links"}>
        <Link className="nav-current" to="/events">
          Find a Stay
        </Link>
        {user && <Link to="/my-events">My Bookings</Link>}
        {user ? (
          <button className="nav-user" onClick={onLogout}>
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
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

export default Navbar;