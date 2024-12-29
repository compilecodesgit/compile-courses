import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
  const { user, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log("User logged out");
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="CourseSphere Logo"
            className="w-10 h-10 mr-3 rounded-full"
          />
          <h1 className="text-2xl font-bold">CompileCourses</h1>
        </div>

        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/courses" className="hover:text-gray-300">
            Courses
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About Us
          </Link>
          {isLoggedIn ? (
            <>
              {user.role === "admin" && (
                <Link to="/add-course" className="hover:text-gray-300">
                  Add Course
                </Link>
              )}
              {user.role === "candidate" && (
                <Link to="/my-courses" className="hover:text-gray-300">
                  My Courses
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
