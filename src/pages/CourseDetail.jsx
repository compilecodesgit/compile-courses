import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const CourseDetail = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourseDetail();
    if (isLoggedIn) {
      checkEnrollment();
    }
  }, [id, isLoggedIn]);

  const fetchCourseDetail = async () => {
    try {
      const response = await fetch(`/api/courses?id=${id}`);
      const data = await response.json();
      console.log(data[0]);
      setCourse((c) => data[0]);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const checkEnrollment = async () => {
    try {
      const response = await fetch(
        `/api/enrollments?userId=${user.id}&courseId=${id}`
      );
      const data = await response.json();
      setIsEnrolled(data.length > 0);
    } catch (error) {
      console.error("Error checking enrollment:", error);
    }
  };

  const onEnrollClick = () => {
    const enrollment = {
      userId: user.id,
      courseId: course.id,
    };
    fetch("/api/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrollment),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Successfully Enrolled");
        navigate("/");
      })
      .catch((error) => console.error("Error enrolling:", error));
  };

  const onDeleteClick = () => {
    const confirmed = confirm("Are you sure you want to delete this course?");
    if (confirmed) {
      fetch(`/api/courses/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          console.log("Course deleted successfully");
          navigate("/");
        })
        .catch((error) => console.error("Error deleting course:", error));
    }
  };

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">{course.title}</h1>
      <p className="text-gray-600 mb-6">{course.description}</p>
      <hr />
      <div className="grid grid-cols-2 gap-4 text-md text-gray-700 py-10">
        <p>
          <span className="font-bold">Duration:</span> {course.duration}
        </p>
        <p>
          <span className="font-bold">Rating:</span> {course.rating} ★
        </p>
        <p>
          <span className="font-bold">Instructor:</span> {course.instructor}
        </p>
        <p>
          <span className="font-bold">Level:</span> {course.level}
        </p>
        <p>
          <span className="font-bold">Language:</span> {course.language}
        </p>
        <p>
          <span className="font-bold">Category:</span> {course.category}
        </p>
      </div>
      <div className="text-center ">
        {isLoggedIn && (
          <>
            {user.role === "admin" ? (
              <div className="flex justify-center">
                <button
                  onClick={onDeleteClick}
                  className="mt-6 px-6 py-2 rounded-md font-medium w-40 text-orange-600 bg-white hover:text-orange-700 border-2 border-orange-600"
                >
                  Delete Course
                </button>
                <button
                  onClick={() => navigate(`/edit-course/${id}`)}
                  className="mt-6 px-6 py-2 rounded-md font-medium w-60 text-white bg-blue-600 hover:bg-blue-700 ml-4"
                >
                  Edit Course
                </button>
              </div>
            ) : (
              !isEnrolled && (
                <button
                  onClick={onEnrollClick}
                  className="mt-6 px-6 py-2 rounded-md font-medium w-1/4 text-white bg-blue-600 hover:bg-blue-700"
                >
                  Enroll
                </button>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
