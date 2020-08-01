import axios from 'axios'
const baseUrl = 'http://localhost:3002/api/signup'

const postFarmer = (farmerDeets) => {
    const request = axios.post(baseUrl, farmerDeets)
    return request.then(response => response.data)
}

export default { postFarmer }