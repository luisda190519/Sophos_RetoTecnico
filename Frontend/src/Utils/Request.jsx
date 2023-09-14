import axios from "axios";

const URL =
    "http://localhost:5092/api" || "https://playpalace.azurewebsites.net/api";

export const getRequest = async (name) => {
    return await axios
        .get(URL + name, { withCredentials: true })
        .then((resp) => resp.data)
        .catch((err) => err);
};

export const postRequest = async (name, payload) => {
    return await axios
        .post(URL + name, payload)
        .then((resp) => resp.data)
        .catch((err) => err);
};

export const deleteRequest = async (name) => {
    return await axios
        .delete(URL + name, { withCredentials: true })
        .then((resp) => resp.data)
        .catch((err) => err);
};

export const putRequest = async (name, payload) => {
    return await axios
        .put(URL + name, payload, { withCredentials: true })
        .then((resp) => resp.data)
        .catch((err) => err);
};
