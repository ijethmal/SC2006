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

// creating a group
export async function createGroup(groups) {
  
    try {
        const response = await axios.post(`${API_URL}/interestgroups`, groups);
        return response.data;
    } catch (error) {
        console.error("Error creating group:", error);
        throw error;
    }
}

// join a group
export async function joinGroup(groupId, userId) {
    try {
        const response = await axios.put(`${API_URL}/interestgroups/${groupId}/members/${userId}`);
        return response;
    } catch (error) {
        console.error("Error joining group:", error);
        throw error;
    }
}

// leave a group
export async function leaveGroup(groupId, userId) {
    try {
        const response = await axios.delete(`${API_URL}/interestgroups/${groupId}/members/${userId}`);
        return response;
    } catch (error) {
        console.error("Error leaving group:", error);
        throw error;
    }
}