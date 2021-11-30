import React, { useState, useEffect } from "react";
import StudentDataService from "../../services/StudentService";

const Student = props => {
    const initialStudentState = {
        id: null,
        Name: "",
        studyField: "",
        Rank: null
    };
    const [currentStudent, setCurrentStudent] = useState(initialStudentState);
    const [message, setMessage] = useState("");


    const getStudent = id => {
        StudentDataService.get(id)
            .then(response => {
                setCurrentStudent(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getStudent(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentStudent({ ...currentStudent, [name]: value });
    };

    const updateRank = status => {
        var data = {
            studentId: currentStudent.studentId,
            Name: currentStudent.Name,
            studyField: currentStudent.studyField,
            Rank: currentStudent.Rank
        };
    }

    const updateStudent = () => {
        StudentDataService.update(currentStudent.studentId, currentStudent)
            .then(response => {
                console.log(response.data);
                setMessage("The student was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteStudent = () => {
        StudentDataService.remove(currentStudent.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/students");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentStudent ? (
                <div className="edit-form">
                    <h4>Student</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Name"
                                name="Name"
                                value={currentStudent.Name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="studyField">Study Field</label>
                            <input
                                type="text"
                                className="form-control"
                                id="studyField"
                                name="studyField"
                                value={currentStudent.studyField}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Rank">Rank</label>
                            <input
                                type="number"
                                className="form-control"
                                id="Rank"
                                name="Rank"
                                value={currentStudent.Rank}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <button className="badge badge-danger mr-2" onClick={deleteStudent}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateStudent}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Please click on a Student...</p>
                    </div>
                )}
        </div>
  );
};

export default Student;