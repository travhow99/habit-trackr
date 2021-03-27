import axios from "axios";

const baseUrl = `/api`;
console.log(`/api`);

export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json"
  }
});
