import http from "../http-common";

const getAll = () => {
    return http.get("/api/Teacher");
};

const get = id => {
    return http.get(`/api/Teacher/${id}`);
};

const create = data => {
    return http.post("/api/Teacher", data);
};

const update = (id, data) => {
    return http.put(`/api/Teacher/${id}`, data);
};

const remove = id => {
    return http.delete(`/api/Teacher/${id}`);
};

const removeAll = () => {
    return http.delete(`/api/Teacher`);
};

const findByName = Name => {
    return http.get(`/api/Teacher?Name=${Name}`);
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