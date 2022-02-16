import jwt_decode from 'jwt-decode'


// JWT exp is in seconds
const isExpired = () => {
    let token = localStorage.getItem("access_token");
    if(!token) return true
    let decodedToken = jwt_decode(token);
    console.log("Decoded Token", decodedToken);
    let currentDate = new Date();
    let expired = true

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
        console.log("Token expired.");
        return true
      } else {
        console.log("Valid token");   
        return false
      }
}

const getToken = () => {
    return localStorage.getItem("access_token");
}


export { isExpired, getToken}