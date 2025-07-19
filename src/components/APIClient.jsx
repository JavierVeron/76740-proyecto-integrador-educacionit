import axios from "axios"

const APIClient = axios.create({
    baseURL:"https://68783cd631d28a460e1d9fa4.mockapi.io"
})

export default APIClient