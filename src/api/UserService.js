import axios from "axios";

const API_URL = "http://localhost:8080/users";

export async function login(email, password) {
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

export async function register(user) {
    return await axios.post(API_URL +'/register', {
        user
    });
}