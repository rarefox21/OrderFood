import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
  });

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: "Weak", color: "red", width: "33%" };
    if (strength === 3 || strength === 4)
      return { label: "Medium", color: "orange", width: "66%" };
    return { label: "Strong", color: "green", width: "100%" };
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{11,14}$/; // Adjust regex as per your requirement
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ✅ Check password before sending request
    if (!validatePassword(credentials.password)) {
      alert("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.");
      return;
    }

    // ✅ Check phone number before sending request
    if (!validatePhoneNumber(credentials.phoneNumber)) {
      alert("Phone number must be in Numbers and between 11 and 14 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/CreateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          address: credentials.address,
          phoneNumber: credentials.phoneNumber,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter Valid Credentials");
      } else {
        alert("User Created Successfully");
      }
    } catch (error) {
      console.error("Error creating user", error);
      alert("Failed to connect to server.");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              your mail will be kept confidential
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            {credentials.password && (
              <div className="mt-2">
                <div
                  style={{
                    height: "8px",
                    width: "100%",
                    backgroundColor: "#eee",
                    borderRadius: "4px",
                  }}
                >
                  {/* ✅ Password strength bar */}
                  <div
                    style={{
                      height: "100%",
                      width: validatePassword(credentials.password).width,
                      backgroundColor: validatePassword(credentials.password)
                        .color,
                      borderRadius: "4px",
                      transition: "0.3s",
                    }}
                  ></div>
                </div>
                <small
                  style={{
                    color: validatePassword(credentials.password).color,
                  }}
                >
                  {validatePassword(credentials.password).label} Password
                </small>
                <div className="text-danger small">
                  {/* ✅ Password validation message */}
                  Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.
                  </div>
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={credentials.address}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              name="phoneNumber"
              value={credentials.phoneNumber}
              onChange={onChange}
            />
            {/* ✅ Live phone number validation */}
            {credentials.phoneNumber &&
              !validatePhoneNumber(credentials.phoneNumber) && (
                <div className="text-danger small">
                  Phone number must be in numbers and between 11 and 14 digits.
                </div>
              )}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
}
