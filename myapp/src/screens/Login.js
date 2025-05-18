import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/LoginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Invalid email or password");
    } else {
      alert("Login successful!");
      localStorage.setItem("authToken", json.authToken);
      // Optionally, you can store user data in local storage or context
      console.log(localStorage.getItem("authToken"));
      navigate("/home"); // redirect to homepage or dashboard
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/createuser" className="btn btn-danger">Create an account</Link>
      </form>
    </div>
  );
}
