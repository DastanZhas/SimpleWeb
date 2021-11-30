import http from "../http-common";

const getAll = () => {
    return http.get("/api/Student");
};

const get = id => {
    return http.get(`/api/Student/${id}`);
};

const create = data => {
    return http.post("/api/Student", data);
};

const update = (id, data) => {
    return http.put(`/api/Student/${id}`, data);
};

const remove = id => {
    return http.delete(`/api/Student/${id}`);
};

const removeAll = () => {
    return http.delete(`/api/Student`);
};

const findByName = Name => {
    return http.get(`/api/Student?Name=${Name}`);
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByName
};