import axios from "axios";
import { getToken } from "./util";

const http = axios.create({
  baseURL: "https://at-backend1.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${getToken()}` 
  }
});

const localHttp = axios.create({
  baseURL: "http://localhost:3001/api/",
  headers: {
    "Content-type": "application/json",
  }
});

export { http, localHttp }