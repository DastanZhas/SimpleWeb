import React, { useState, useEffect } from "react";
import TeacherDataService from "../../services/TeacherService";
import { Link } from "react-router-dom";

const TeachersList = () => {
    const [teacher, setTeachers] = useState([]);
    const [currentTeacher, setCurrentTeacher] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveTeachers();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveTeachers = () => {
        TeacherDataService.getAll()
            .then(response => {
                setTeachers(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveTeachers();
        setCurrentTeacher(null);
        setCurrentIndex(-1);
    };

    const setActiveTeacher = (teacher, index) => {
        setCurrentTeacher(teacher);
        setCurrentIndex(index);
    };

    const removeAllTeacher = () => {
        TeacherDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByName = () => {
        TeacherDataService.findByName(searchName)
            .then(response => {
                setTeachers(response.data);
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
                <h4>Teachers List</h4>

                <ul className="list-group">
                    {teacher &&
                        teacher.map((teacher, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTeacher(teacher, index)}
                                key={index}
                            >
                                {teacher.teacherName}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllTeacher}
                >
                    Remove All
        </button>
            </div>
            <div className="col-md-6">
                {currentTeacher ? (
                    <div>
                        <h4>Teacher</h4>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            {currentTeacher.teacherName}
                        </div>
                        <div>
                            <label>
                                <strong>Teacher email:</strong>
                            </label>{" "}
                            {currentTeacher.teacherEmail}
                        </div>
                        <div>
                            <label>
                                <strong>Teacher phone number:</strong>
                            </label>{" "}
                            {currentTeacher.teacherPhonenumber}
                        </div>


                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on a Teacher...</p>
                        </div>
                    )}
            </div>
        </div>
    );

};

export default TeachersList;