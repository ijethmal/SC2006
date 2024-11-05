import axios from "axios";

const API_URL = "http://localhost:8080"; 

export async function getAllGroups() {
    try {
      const response = await axios.get(`${API_URL}/interestgroups`); 
      return response.data; 
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error; 
    }
  }
  
export async function getAllGroupsByUserId(userId) {
    try {
        const response = await axios.get(`${API_URL}/interestgroups/all/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }

}