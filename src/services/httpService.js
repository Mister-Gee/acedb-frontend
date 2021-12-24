import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/Functions';


const { REACT_APP_ACE_URL } = process.env;

export const instance = axios.create({
    baseURL: REACT_APP_ACE_URL,
    timeout: 100000,
    headers: {
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
    }
})

instance.interceptors.request.use(function(config) {
    const token = getTokenFromLocalStorage();
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});