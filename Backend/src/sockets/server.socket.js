import { Server } from "socket.io";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import {
    generateChatTitle,
    generateResponseStream,
} from "../services/ai.service.js";
import jwt from 'jsonwebtoken'

let io;

export function initSocket(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "https://cognify-alpha-six.vercel.app",
            credentials: true,
        },
    });

    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth.token;

            if (!token) {
                return next(new Error("Unauthorized"));
            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            socket.user = decoded;

            next();
        } catch (err) {
            next(new Error("Unauthorized"));
        }
    });


    io.on("connection", (socket) => {

        socket.on("send_message", async (data) => {
            try {
                const { message, chatId } = data;

                let chat;
                const userId = socket.user._id;
                // Existing chat
                if (chatId) {
                    chat = await Chat.findOne({
                        _id: chatId,
                        user: userId,
                    });

                    if (!chat) {
                        return socket.emit("error", {
                            message: "Chat not found",
                        });
                    }
                }
                // New chat
                else {
                    chat = await Chat.create({
                        user: userId,
                        title: await generateChatTitle(message),
                    });

                    socket.emit("chat_created", {
                        chat,
                        message
                    });
                }

                // Save user message
                await Message.create({
                    chat: chat._id,
                    content: message,
                    role: "user",
                });

                const messages = await Message.find({
                    chat: chat._id,
                }).sort({ createdAt: 1 });

                let fullResponse = "";

                await generateResponseStream(
                    messages,
                    (chunk) => {
                        
                        fullResponse += chunk;

                        socket.emit("ai_chunk", {
                            chunk,
                        });
                    }
                );
                const aiMessage = await Message.create({
                    chat: chat._id,
                    content: fullResponse,
                    role: "ai",
                });

                socket.emit("ai_complete", {
                    aiMessage,
                });
            } catch (error) {
                console.error("Socket Error:", error);

                socket.emit("error", {
                    message: "Something went wrong.",
                });
            }
        });

        socket.on("disconnect", () => {
        });
    });
}

export function getIO() {
    if (!io) {
        throw new Error("Socket.io is not initialized.");
    }

    return io;
}