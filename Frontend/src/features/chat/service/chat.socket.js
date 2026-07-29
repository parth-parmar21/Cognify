import { io } from "socket.io-client";

export function initializedSocketConnection() {
    const token = document.cookie
        .split("; ")
        .find(c => c.startsWith("token="))
        ?.split("=")[1];

    const socket = io("http://localhost:3000", {
        withCredentials: true,
        auth: {
            token
        }
    });

    return socket;
}