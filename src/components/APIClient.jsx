import axios from "axios"

const APIClient = axios.create({
    baseURL:"https://686928ca2af1d945cea119d2.mockapi.io"
})

export default APIClient