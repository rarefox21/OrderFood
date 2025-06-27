import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", address: "", phoneNumber: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: "Weak", color: "red", width: "33%" };
    if (strength === 3 || strength === 4) return { label: "Medium", color: "orange", width: "66%" };
    return { label: "Strong", color: "green", width: "100%" };
  };

  const validatePhoneNumber = (number) => /^\d{11,14}$/.test(number);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordCheck = validatePassword(credentials.password);
    const phoneValid = validatePhoneNumber(credentials.phoneNumber);

    if (passwordCheck.label === "Weak") return alert("Password too weak.");
    if (!phoneValid) return alert("Phone number must be 11–14 digits.");

    try {
      const res = await fetch("http://localhost:5000/api/CreateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const json = await res.json();
      if (!json.success) {
        setError(json.message || "Registration failed.");
      } else {
        alert("User created successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to connect to the server.");
    }
  };

  const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const passwordStrength = validatePassword(credentials.password);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input type="text" name="name" placeholder="Name" className="form-control mb-3" value={credentials.name} onChange={onChange} required autoFocus />
        <input type="email" name="email" placeholder="Email" className="form-control mb-3" value={credentials.email} onChange={onChange} required />
        
        <input type="password" name="password" placeholder="Password" className="form-control mb-1" value={credentials.password} onChange={onChange} required />
        {credentials.password && (
          <div className="mb-3">
            <div style={{ height: "8px", width: "100%", backgroundColor: "#eee", borderRadius: "4px" }}>
              <div style={{ height: "100%", width: passwordStrength.width, backgroundColor: passwordStrength.color, borderRadius: "4px" }}></div>
            </div>
            <small style={{ color: passwordStrength.color }}>{passwordStrength.label} Password</small>
            <div className="text-danger small">Include uppercase, lowercase, number, and special character.</div>
          </div>
        )}

        <input type="text" name="address" placeholder="Address" className="form-control mb-3" value={credentials.address} onChange={onChange} required />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" className="form-control mb-1" value={credentials.phoneNumber} onChange={onChange} required />
        {credentials.phoneNumber && !validatePhoneNumber(credentials.phoneNumber) && (
          <div className="text-danger small mb-3">Phone number must be 11–14 digits.</div>
        )}

        {error && <div className="text-danger mb-3">{error}</div>}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/login" className="btn btn-danger ms-3">Already a user?</Link>
      </form>
    </div>
  );
}