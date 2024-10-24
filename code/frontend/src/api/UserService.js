import axios from "axios";

const API_URL = "http://localhost:8080/users";

export async function login(email, password) {
    return await axios.post(API_URL +'/login', {
        email,
        password,
    });
}

export async function register(user) {
    return await axios.post(API_URL +'/register', {
        user
    });
}