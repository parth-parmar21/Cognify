import { io } from "socket.io-client";

export function initializedSocketConnection() {
    const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, {
        withCredentials: true,
    });

    return socket;
}