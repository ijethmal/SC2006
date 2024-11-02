import axios from "axios";

const API_URL = "http://localhost:8080"; 

export async function getAllEvents() {
  try {
    const response = await axios.get(`${API_URL}/events`); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error; 
  }
}