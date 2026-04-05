import $ from 'jquery';
import { jwt } from '../store/store.js';
import { redirect } from '../routers/route.js';
import { jwtDecode } from 'jwt-decode';

const SERVER = import.meta.env.VITE_SERVER || 'http://localhost:3000';

export const refreshToken = async () => {
    try {
        const response = await fetch(`${SERVER}/api/auth/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        if (data.accessToken) {
            jwt.set(data.accessToken);
        } else {
            jwt.clear();
            redirect('/login');
            return;
        }
    } catch (err) {
        console.log(err);
    }
};

export const isTokenValid = async () => {
    const token = jwt.get();
    if (token == null) {
        return false;
    }

    try {
        const response = await fetch(`${SERVER}/api/auth/check-token`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            }
        });
        if (response.status == 204) {
            return true;
        } else {
            jwt.clear();
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const checkRole = async () => {
    const token = jwt.get();
    if (token == null) {
        throw new Error("Token not found");
    }
    const isValid = await isTokenValid();
    if (!isValid) {
        throw new Error("Token is invalid");
    }
    const decoded = jwtDecode(token);
    return decoded.role;
};

export const fetchWithRefresh = async (url, options) => {
    let response = await fetch(url, options);
    if (response.status === 401) {
        await refreshToken(); 
        options.headers['Authorization'] = `Bearer ${jwt.get()}`; 
        response = await fetch(url, options); 
    }
    return response;
}