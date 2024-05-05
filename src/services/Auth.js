import axios from "axios"

const url = "https://localhost:7141/api/Authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth)
    return request.then(response => response)
}

export default { authenticate }