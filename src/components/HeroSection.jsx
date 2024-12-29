import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const onGetStartedClick = () => {
    navigate("/courses");
  };
  return (
    <section className="bg-blue-600 text-white text-center py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to CompileCourses</h1>
        <p className="text-lg mb-6">
          Learn at your own pace with curated courses designed to help you excel
          in coding and development.
        </p>
        <button
          className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-200"
          onClick={onGetStartedClick}
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
