import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const { setUser, setIsLoggedIn } = useContext(UserContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const fetchUsersData = async () => {
    const response = await fetch("/api/users");
    const users = await response.json();
    return users;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await fetchUsersData();

    const user = userData.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );
    if (user) {
      setUser(user);
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-md">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
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
        <div className="flex w-full justify-center items-center">
          <button
            onClick={() => navigate("/")}
            type="button"
            className="text-blue-600 bg-white py-2 rounded-md hover:text-blue-800 w-1/2 mr-2 border-2 border-blue-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 w-1/2 ml-2"
          >
            Login
          </button>
        </div>
        <p className="text-md m-2">
          Don't have an account?{" "}
          <Link className="text-blue-600 hover:text-blue-700" to="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
