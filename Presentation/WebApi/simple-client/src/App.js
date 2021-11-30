import React from "react";
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateStudent from "./components/Students/CreateStudent";
import Student from "./components/Students/Student";
import StudentsList from "./components/Students/StudentsList";

import CreateTeacher from "./components/Teachers/CreateTeacher";
import TeachersList from "./components/Teachers/TeachersList";

import CoursesList from "./components/Courses/CoursesList";
import CreateCourse from "./components/Courses/CreateCourse";

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/students" className="navbar-brand">
                    SimpleWeb
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/students"} className="nav-link">
                            Students
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add Student
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/list-teacher"} className="nav-link">
                            Teachers List
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add-teacher"} className="nav-link">
                            Add Teacher
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to={"/list-course"} className="nav-link">
                            Courses List
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add-course"} className="nav-link">
                            Add Course
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/students" element={<StudentsList />} />
                    <Route path="/add" element={<CreateStudent />} />
                    <Route path="/students/:id" element={<Student />} />
                    <Route path="/add-teacher" element={<CreateTeacher />} />
                    <Route path="/list-teacher" element={<TeachersList />} />
                    <Route path="/list-course" element={<CoursesList />} />
                    <Route path="/add-course" element={<CreateCourse />} />
                </Routes>
            </div>
        </div>
  );
}

export default App;
