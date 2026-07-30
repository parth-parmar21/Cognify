import axios from 'axios'

const api = axios.create({
    baseURL: "https://cognify-skd0.onrender.com/api/auth",
    withCredentials: true
})

export async function register({username, email, password}) {
    const response = await api.post('/register', { 
        username, email, password 
    });
    console.log(response.data);
    
    return response.data;
}

export async function login({email, password}) {
    const response = await api.post('/login', { 
        email, password 
    });
    return response.data;
}

export async function getMe() {
    const response = await api.get('/get-me');
    return response.data;
}