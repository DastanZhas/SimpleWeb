import React, { useState } from "react";
import StudentDataService from "../../services/StudentService";

const CreateStudent = () => {
    const initialStudentState = {
        studentId: null,
        Name: "",
        studyField: "",
        Rank: null
    };
    const [student, setStudent] = useState(initialStudentState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value });
    };

    const saveStudent = () => {
        var data = {
            Name: student.Name,
            studyField: student.studyField,
            Rank: student.Rank
        };

        StudentDataService.create(data)
            .then(response => {
                setStudent({
                    studentId: response.data.studentId,
                    Name: response.data.Name,
                    studyField: response.data.studyField,
                    Rank: response.data.Rank
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newStudent = () => {
        setStudent(initialStudentState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newStudent}>
                        Add
                    </button>
                </div>
            ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Name"
                                required
                                value={student.Name}
                                onChange={handleInputChange}
                                name="Name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Study Field</label>
                            <input
                                type="text"
                                className="form-control"
                                id="studyField"
                                required
                                value={student.studyField}
                                onChange={handleInputChange}
                                name="studyField"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Rank</label>
                            <input
                                type="number"
                                className="form-control"
                                id="Rank"
                                required
                                value={student.Rank}
                                onChange={handleInputChange}
                                name="Rank"
                            />
                        </div>

                        <button onClick={saveStudent} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
        </div>
    );
};

export default CreateStudent;