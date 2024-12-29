import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddCourse from "./pages/AddCourse";
import MainLayout from "./layouts/MainLayout";
import CourseDetail from "./pages/CourseDetail";
import EditCourse from "./pages/EditCourse";
import EnrolledCourses from "./pages/EnrolledCourses";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Nested route for MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="about" element={<About />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="edit-course/:id" element={<EditCourse />} />
          <Route path="my-courses" element={<EnrolledCourses />} />
        </Route>

        {/* Routes without MainLayout */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
