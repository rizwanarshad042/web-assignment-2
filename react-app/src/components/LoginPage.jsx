import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, register } from "../store";

function LoginPage({ mode }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const submit = (event) => {
    event.preventDefault();
    if (!form.email || !form.password || (!isLogin && !form.name))
      return setError("Please complete every field.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    const accounts = JSON.parse(localStorage.getItem("booksmart-accounts") || "[]");
    if (isLogin) {
      const account = accounts.find((item) => item.email === form.email && item.password === form.password);
      if (!account) return setError("Email or password is incorrect.");
      dispatch(login({ id: account.id, name: account.name, email: account.email }));
    } else {
      if (accounts.some((item) => item.email === form.email)) return setError("An account with this email already exists.");
      const account = { id: crypto.randomUUID(), name: form.name, email: form.email, password: form.password };
      localStorage.setItem("booksmart-accounts", JSON.stringify([...accounts, account]));
      dispatch(register({ id: account.id, name: account.name, email: account.email }));
    }
    navigate("/events");
  };
  return (
    <div className="auth-shell">
      <Link to="/events" className="brand">
        <span className="brand-mark">E</span>
        <span>BookSmart</span>
      </Link>
      <div className="auth-card">
        <div className="auth-copy">
          <p>
            Find something
            <br />
            <b>worth remembering.</b>
          </p>
        </div>
        <div className="auth-form">
          <h1>{isLogin ? "Welcome back" : "Create account"}</h1>
          <p>
            {isLogin
              ? "Log in to manage your bookings."
              : "Save your favorite events and register with ease."}
          </p>
          <form onSubmit={submit}>
            {!isLogin && (
              <label>
                Name
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                  placeholder="Your name"
                />
              </label>
            )}
            <label>
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
                }
                placeholder="Your password"
              />
            </label>
            {error && <small className="form-error">{error}</small>}
            <button className="pink-button" type="submit">
              {isLogin ? "Login" : "Create Account"} <ArrowRight size={16} />
            </button>
          </form>
          <p className="switch-auth">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link to={isLogin ? "/register" : "/login"}>
              {isLogin ? "Create Account" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
