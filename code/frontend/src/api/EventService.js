import axios from "axios";

const API_URL = "http://localhost:8080"; 

// get All Events
export async function getAllEvents() {
  try {
    const response = await axios.get(`${API_URL}/events`); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error; 
  }
}

// create Event
export async function createEvent(eventPayload) {
  try {
    const response = await axios.post(`${API_URL}/events`, eventPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response; 
  } catch (error) {
    console.error("Error creating event:", error);
    throw error; 
  }
}


// get Event by UserID
export async function getEventByUserID(userID) {
  try {
    const response = await axios.get(`${API_URL}/events/user/${userID}`); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error; 
  }
}