import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import CourseCard from "../components/CourseCard";

const EnrolledCourses = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchEnrollments();
    }
  }, [isLoggedIn]);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch("/api/enrollments");
      const data = await response.json();
      const userEnrollments = data.filter(
        (enrollment) => enrollment.userId === user.id
      );
      if (userEnrollments.length > 0) {
        setEnrolledCourses(userEnrollments);
        fetchCourses(userEnrollments);
      }
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  const fetchCourses = async (enrollments) => {
    try {
      const courseIds = enrollments.map((enrollment) => enrollment.courseId);
      const response = await fetch("/api/courses");
      const data = await response.json();
      const userCourses = data.filter((course) =>
        courseIds.includes(course.id)
      );
      setCourses(userCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <section className="py-10">
      <div className="container mx-auto">
        {courses.length === 0 ? (
          <h1 className="text-2xl font-bold text-center mt-10">
            No courses found
          </h1>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">My Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default EnrolledCourses;
