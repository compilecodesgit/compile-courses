import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const onViewDetailClick = () => {
    navigate(`/courses/${course.id}`);
  };
  return (
    <div className="border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 bg-white max-w-lg">
      <h3 className="text-xl font-bold mb-2 text-gray-800">{course.title}</h3>
      <hr />
      <p className="text-md text-gray-600 my-8">{course.description}</p>
      <div className="flex justify-between items-center text-md text-gray-700">
        <p>
          <span className="font-bold">Rating:</span> {course.rating} ★
        </p>
        <p>
          <span className="font-bold">Duration:</span> {course.duration}
        </p>
      </div>
      <button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
        onClick={onViewDetailClick}
      >
        View Details
      </button>
    </div>
  );
};

export default CourseCard;
