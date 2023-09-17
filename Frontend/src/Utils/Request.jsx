import axios from "axios";

const URL =
import.meta.env.VITE_API_URL || "https://playpalace.azurewebsites.net/api";


export const getRequest = async (name) => {
    console.log(URL + name)
    return await axios
        .get(URL + name, { withCredentials: true })
        .then((resp) => resp.data)
        .catch((err) => err);
};

export const postRequest = async (name, payload) => {
    return await axios
        .post(name, payload)
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
