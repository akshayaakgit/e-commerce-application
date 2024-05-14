import axios from "axios"

const baseURL = "http://localhost:8080/api/v1/"

const AxiosPrivateInstance = () => axios.create({
    baseURL,
    headers:{"Content-Type":"application/json"},
    withCredentials: true
})

export default AxiosPrivateInstance;