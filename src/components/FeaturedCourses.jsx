import React from "react";
import CourseCard from "./CourseCard";
import { useState, useEffect } from "react";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/courses?_limit=3");
      const data = await response.json();
      setCourses((c) => data);
    };

    fetchCourses();
  }, []);
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
