import React, { useState } from "react";
// import "./AuthForm.css";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="main">
      <div className="box">
        <div className="toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <form className="form">
          {!isLogin && (
            <input type="text" placeholder="Full Name" required />
          )}

          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />

          {!isLogin && (
            <input type="password" placeholder="Confirm Password" required />
          )}

          <button type="submit">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}