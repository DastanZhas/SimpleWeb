import React, { useState } from "react";
import TeacherDataService from "../../services/TeacherService";

const CreateTeacher = () => {
    const initialTeacherState = {
        teacherId: null,
        teacherName: "",
        teacherEmail: "",
        teacherPhonenumber: ""
    };
    const [teacher, setTeacher] = useState(initialTeacherState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTeacher({ ...teacher, [name]: value });
    };

    const saveTeacher = () => {
        var data = {
            teacherName: teacher.teacherName,
            teacherEmail: teacher.teacherEmail,
            teacherPhonenumber: teacher.teacherPhonenumber
        };

        TeacherDataService.create(data)
            .then(response => {
                setTeacher({
                    teacherId: response.data.teacherId,
                    teacherName: response.data.teacherName,
                    teacherEmail: response.data.teacherEmail,
                    teacherPhonenumber: response.data.teacherPhonenumber
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTeacher = () => {
        setTeacher(initialTeacherState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTeacher}>
                        Add
                    </button>
                </div>
            ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="teacherName">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="teacherName"
                                required
                                value={teacher.teacherName}
                                onChange={handleInputChange}
                                name="teacherName"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="teacherEmail">Teacher Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="teacherEmail"
                                required
                                value={teacher.teacherEmail}
                                onChange={handleInputChange}
                                name="teacherEmail"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="teacherPhonenumber">Teacher Phone number</label>
                            <input
                                type="number"
                                className="form-control"
                                id="teacherPhonenumber"
                                required
                                value={teacher.teacherPhonenumber}
                                onChange={handleInputChange}
                                name="teacherPhonenumber"
                            />
                        </div>

                        <button onClick={saveTeacher} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
        </div>
    );
};

export default CreateTeacher;