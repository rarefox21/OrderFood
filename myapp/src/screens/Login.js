import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/LoginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();
      if (!json.success) {
        alert(json.message || "Invalid email or password");
      } else {
        localStorage.setItem("authToken", json.authToken);
        alert("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4">Login</h2>

        <input type="email" name="email" placeholder="Email" className="form-control mb-3" value={credentials.email} onChange={onChange} required autoFocus />
        <input type="password" name="password" placeholder="Password" className="form-control mb-3" value={credentials.password} onChange={onChange} required />

        <button type="submit" className="btn btn-primary" disabled={loading || !credentials.email || !credentials.password}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <Link to="/createuser" className="btn btn-danger ms-3">Create an account</Link>
      </form>
    </div>
  );
}
