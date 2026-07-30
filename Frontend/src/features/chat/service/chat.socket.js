import { io } from "socket.io-client";

export function initializedSocketConnection() {
    const token = document.cookie
        .split("; ")
        .find(c => c.startsWith("token="))
        ?.split("=")[1];

    const socket = io("https://cognify-skd0.onrender.com", {
        withCredentials: true,
        auth: {
            token
        }
    });

    return socket;
}