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
export async function getAllEventsByUserID(userID) {
  try {
    const response = await axios.get(`${API_URL}/events/all/${userID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

// join an unjoined event: should code here to join the event
export async function joinEvent(eventId, userId) {
  try {
    const response = await axios.put(`${API_URL}/events/${eventId}/attendees/${userId}`);
    return response;
  } catch (error) {
    console.error("Error joining event:", error);
    throw error;
  }
}


// Leave an event
export async function leaveEvent(eventId, userId) {
  try {
    const response = await axios.delete(`${API_URL}/events/${eventId}/attendees/${userId}`);
    return response;
  } catch (error) {
    console.error("Error leaving event:", error);
    throw error;
  }
}
