import axios from "axios";

const API_URL = "http://localhost:8080/users/login";

export async function getUsers() {
    return axios.get(API_URL);
}

export async function login(email, password) {
    return await axios.post(API_URL, {
        email,
        password,
    });
}
