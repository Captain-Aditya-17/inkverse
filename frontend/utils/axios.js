import axios from 'axios';

export const Instance = axios.create({
    baseURL: import.meta.env.Mode = "development" ?  'http://localhost:4000': "/api",
    withCredentials: true, 
})
