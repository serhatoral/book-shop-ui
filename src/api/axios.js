// api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/v1', // replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Example GET request
  getData(uri) {
    return apiClient.get(uri);
  },

  // Example POST request
  postData(uri,data) {
    return apiClient.post(uri, data);
  },

  // Add more methods for other API endpoints as needed
};
