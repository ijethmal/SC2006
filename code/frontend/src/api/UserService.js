import axios from "axios";

const API_URL = 'http://localhost:8080/users';

export async function getUsers() {
  return axios.get(API_URL);
}

export async function login(email, password) {
  return await axios.post(API_URL, "b2606763-25cb-45ba-8c2e-519b35b9d2a8");
}
