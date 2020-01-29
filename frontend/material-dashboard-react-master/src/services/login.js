import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const login = async (data) => {
    const response = await axios.post(baseUrl+'/login', data)
    return response.data
}

export default login