import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Check fro duplicate email
    const res = await fetch("/api/users");
    const users = await res.json();
    const user = users.find((user) => user.email === formData.email);
    if (user) {
      alert("Email already exists");
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("Signup response:", data);
    alert("Signup successful");
    navigate("/login");
  };

  return (
    <div className="container mx-auto py-10 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="border rounded-md p-2"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="border rounded-md p-2"
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          className="border rounded-md p-2"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        >
          <option value="candidate">Candidate</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex w-full justify-center items-center">
          <button
            onClick={() => navigate("/login")}
            type="button"
            className="text-blue-600 bg-white py-2 rounded-md hover:text-blue-800 w-1/2 mr-2 border-2 border-blue-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 w-1/2 ml-2"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
