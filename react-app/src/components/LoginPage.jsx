import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage({ mode, onLogin, onRegister }) {
  const isLogin = mode === "login";
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const submit = (event) => {
    event.preventDefault();
    if (!form.email || !form.password || (!isLogin && !form.name))
      return setError("Please complete every field.");
    if (isLogin)
      onLogin({ name: form.email.split("@")[0], email: form.email });
    else onRegister(form);
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
            Stay somewhere
            <br />
            <b>worth remembering.</b>
          </p>
        </div>
        <div className="auth-form">
          <h1>{isLogin ? "Welcome back" : "Create account"}</h1>
          <p>
            {isLogin
              ? "Log in to manage your bookings."
              : "Save your favorite stays and book with ease."}
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
