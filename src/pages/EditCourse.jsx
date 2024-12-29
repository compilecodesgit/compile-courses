import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    fetch(`/api/courses/?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCourse(data[0]);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the course!", error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: name === "rating" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      alert("Course updated successfully!");
      navigate("/courses");
    } catch (error) {
      console.error("There was an error updating the course!", error);
    }
  };

  return (
    <div className="container mx-auto py-10 justify-center max-w-md">
      <h2 className="text-3xl font-bold mb-4">Edit Course</h2>
      <hr />
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 max-w-lg mt-5"
      >
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
        <div className="flex">
          <button
            onClick={() => navigate("/courses")}
            type="button"
            className="bg-white text-blue-600 py-2 rounded-md hover:text-blue-700 border-2 border-blue-600 w-1/2 mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 w-1/2 ml-2"
          >
            Update Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
