import axios from 'axios'
console.log("Backend URL from auth:", import.meta.env.VITE_BACKEND_URL);
const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
    withCredentials: true
})

export async function register({username, email, password}) {
    const response = await api.post('/register', { 
        username, email, password 
    });
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