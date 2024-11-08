import axios from "axios";

const API_URL = "http://localhost:8080/users";


// login
export async function login(email, password) {
    console.log(email, password);
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
      return response;
    } catch (error) {
      throw error;
    }
  }



//register
export async function register(user) {
    try {
        const response = await axios.post(`${API_URL}/register`, user);
        return response;
    } catch (error) {
        throw error;
    }
}


//get user by email
export async function getUserByEmail(email) {
    try {
        const response = await axios.get(`${API_URL}/email/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// get user name by id
export async function getUserNameById(id) {
    try {
        const response = await axios.get(`${API_URL}/${id}/name`);
        return response.data;
    } catch (error) {
        throw error;
    }
}