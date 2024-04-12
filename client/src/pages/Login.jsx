import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import bgImg from "../assets/bg-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigater = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      navigater("/");
    } else {
      navigater("/login");
    }
  }, []);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onsubmitSuccess = (token) => {
    Cookies.set("jwt_token", token);
    navigater("/");
  };

  const onsubmitFrom = async (e) => {
    e.preventDefault();

    try {
      const userDetails = { email, password };
      const url = "https://mittarv-backend.onrender.com/user/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };

      const res = await fetch(url, options);
      if (res.ok) {
        const data = await res.json();
        onsubmitSuccess(data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form onSubmit={onsubmitFrom}>
        <h1>Login</h1>
        <label htmlFor="email" className="label">
          EMAIL
        </label>
        <input
          type="email"
          id="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
        />
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
        <div className="buttons">
          <button className="login" type="submit">
            Login
          </button>
          <Link to="/register" className="link">
            <button className="btn2" type="button">
              Regiset
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
