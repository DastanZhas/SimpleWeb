import React, { useState, useEffect } from "react";
import CourseDataService from "../../services/CourseService";
import { Link } from "react-router-dom";

const CoursesList = () => {
    const [courses, setCourses] = useState([]);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveCourses();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveCourses = () => {
        CourseDataService.getAll()
            .then(response => {
                setCourses(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveCourses();
        setCurrentCourse(null);
        setCurrentIndex(-1);
    };

    const setActiveCourse = (course, index) => {
        setCurrentCourse(course);
        setCurrentIndex(index);
    };

    const removeAllCourse = () => {
        CourseDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        CourseDataService.findByName(searchName)
            .then(response => {
                setCourses(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}/>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Course List</h4>

                <ul className="list-group">
                    {courses &&
                        courses.map((course, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveCourse(course, index)}
                                key={index}
                            >
                                {course.courseName}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllCourse}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentCourse ? (
                    <div>
                        <h4>Course</h4>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            {currentCourse.courseName}
                        </div>
                        <div>
                            <label>
                                <strong>Course Description:</strong>
                            </label>{" "}
                            {currentCourse.courseDescription}
                        </div>
                        <div>
                            <label>
                                <strong>Course Credits</strong>
                            </label>{" "}
                            {currentCourse.courseCredits}
                        </div>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Course...</p>
                        </div>
                    )}
            </div>
        </div>
    );

};

export default CoursesList;