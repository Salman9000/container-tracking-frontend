import axios from "axios";
import { getToken } from "./util";

export default axios.create({
  baseURL: "https://at-backend1.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${getToken()}` 
  }
});