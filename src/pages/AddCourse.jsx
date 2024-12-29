import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    duration: "",
    rating: 0,
    instructor: "",
    level: "",
    language: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: name === "rating" ? Number(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Course added successfully", course);
        navigate("/");
      })
      .catch((error) => console.error("Error adding course:", error));
  };

  return (
    <div className="container mx-auto py-10 justify-center max-w-md">
      <h1 className="text-3xl font-bold mb-4">Add Course</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-lg">
        <input
          name="title"
          value={course.title}
          onChange={handleInputChange}
          placeholder="Course Title"
          className="border rounded-md p-2"
        />
        <textarea
          name="description"
          value={course.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border rounded-md p-2"
        ></textarea>
        <input
          name="duration"
          value={course.duration}
          onChange={handleInputChange}
          placeholder="Duration"
          className="border rounded-md p-2"
        />
        <label htmlFor="rating" className="font-bold">
          Rating: {course.rating}
        </label>
        <input
          type="range"
          name="rating"
          min="0"
          max="5"
          step="0.1"
          value={course.rating}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        />
        <input
          name="instructor"
          value={course.instructor}
          onChange={handleInputChange}
          placeholder="Instructor"
          className="border rounded-md p-2"
        />
        <select
          name="level"
          value={course.level}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <select
          name="language"
          value={course.language}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Spanish">Spanish</option>
        </select>
        <select
          name="category"
          value={course.category}
          onChange={handleInputChange}
          className="border rounded-md p-2"
        >
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="Data Science">Data Science</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Programming">Programming</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
