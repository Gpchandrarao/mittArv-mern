import React, { useState } from "react";
import "../styles/Login.css";
import bgImg from "../assets/bg-img.jpg";
import { Link, useNavigate } from "react-router-dom";

const Regiset = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigater = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onsubmitFrom = async (e) => {
    e.preventDefault();

    try {
      const userDetails = { username, email, password };
      const url = "https://mittarv-backend.onrender.com/user/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      console.log(url, options);

      const res = await fetch(url, options);
      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        navigater("/login");
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
        <h1>Register</h1>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input"
          placeholder="Username"
          value={username}
          onChange={onChangeUsername}
        />
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

        <button className="btn2" type="submit">
          Regiset
        </button>
        <Link to="/login" className="link">
          <button className="login" type="submit">
            Login
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Regiset;
