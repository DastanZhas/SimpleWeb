import http from "../http-common";

const getAll = () => {
    return http.get("/api/Course");
};

const get = id => {
    return http.get(`/api/Course/${id}`);
};

const create = data => {
    return http.post("/api/Course", data);
};

const update = (id, data) => {
    return http.put(`/api/Course/${id}`, data);
};

const remove = id => {
    return http.delete(`/api/Course/${id}`);
};

const removeAll = () => {
    return http.delete(`/api/Course`);
};

const findByName = Name => {
    return http.get(`/api/Course?Name=${Name}`);
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