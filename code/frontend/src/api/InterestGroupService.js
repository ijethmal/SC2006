import axios from "axios";

const GROUP_API_URL = "http://localhost:8080/groups";

// Fetch all groups
export async function getGroups() {
  try {
    const response = await axios.get(GROUP_API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Create a group
export async function createGroup(group) {
  try {
    const response = await axios.post(GROUP_API_URL, group);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Update a group
export async function updateGroup(groupId, updatedGroup) {
  try {
    const response = await axios.put(`${GROUP_API_URL}/${groupId}`, updatedGroup);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Delete a group
export async function deleteGroup(groupId) {
  try {
    const response = await axios.delete(`${GROUP_API_URL}/${groupId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Add a member to a group
export async function addMemberToGroup(groupId, userId) {
  try {
    const response = await axios.post(`${GROUP_API_URL}/${groupId}/members`, null, {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Remove a member from a group
export async function removeMemberFromGroup(groupId, userId) {
  try {
    const response = await axios.delete(`${GROUP_API_URL}/${groupId}/members`, {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
