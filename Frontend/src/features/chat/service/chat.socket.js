import { io } from "socket.io-client";

export function initializedSocketConnection() {
    console.log("Backend URL from chat:", import.meta.env.VITE_BACKEND_URL);
    const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
        withCredentials: true,
    });

    return socket;
}