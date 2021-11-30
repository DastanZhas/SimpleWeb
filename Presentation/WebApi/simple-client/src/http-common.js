import axios from "axios";

export default axios.create({
    baseURL: "https://localhost:44341",
    headers: {
        "Content-type": "application/json"
    }
});