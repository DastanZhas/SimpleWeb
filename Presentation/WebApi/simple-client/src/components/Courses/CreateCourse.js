import React, { useState } from "react";
import CourseDataService from "../../services/CourseService";

const CreateCourse = () => {
    const initialCourseState = {
        courseId: null,
        teacherId: null,
        studentId: null,
        courseName: "",
        courseDescription: "",
        courseCredits: null
    };
    const [course, setCourse] = useState(initialCourseState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCourse({ ...course, [name]: value });
    };

    const saveCourse = () => {
        var data = {
            teacherId: course.teacherId,
            studentId: course.studentId,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            courseCredits: course.courseCredits
        };

        CourseDataService.create(data)
            .then(response => {
                setCourse({
                    courseId: response.data.courseId,
                    teacherId: response.data.teacherId,
                    studentId: response.data.studentId,
                    courseName: response.data.courseName,
                    courseDescription: response.data.courseDescription,
                    courseCredits: response.data.courseCredits
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newCourse = () => {
        setCourse(initialCourseState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newCourse}>
                        Add
                    </button>
                </div>
            ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="teacherId">Teacher ID</label>
                            <input
                                type="number"
                                className="form-control"
                                id="teacherId"
                                required
                                value={course.teacherId}
                                onChange={handleInputChange}
                                name="teacherId"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="studentId">Student ID</label>
                            <input
                                type="number"
                                className="form-control"
                                id="studentId"
                                required
                                value={course.studentId}
                                onChange={handleInputChange}
                                name="studentId"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="courseName">Course Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="courseName"
                                required
                                value={course.courseName}
                                onChange={handleInputChange}
                                name="courseName"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Course Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="courseDescription"
                                required
                                value={course.courseDescription}
                                onChange={handleInputChange}
                                name="courseDescription"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Course Credits</label>
                            <input
                                type="number"
                                className="form-control"
                                id="courseCredits"
                                required
                                value={course.courseCredits}
                                onChange={handleInputChange}
                                name="courseCredits"
                            />
                        </div>

                        <button onClick={saveCourse} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
        </div>
    );
};

export default CreateCourse;