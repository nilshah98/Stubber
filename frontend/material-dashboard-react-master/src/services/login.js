import axios from 'axios'

import config from '../env'
const baseUrl = config.BACKEND_API

const login = async (data) => {
    const response = await axios.post(baseUrl+'/api/login', data)
    return response.data
}

export default login