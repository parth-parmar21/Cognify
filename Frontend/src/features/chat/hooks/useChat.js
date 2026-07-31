import { useDispatch } from "react-redux";
import { initializedSocketConnection } from "../service/chat.socket.js";
import { 
    addMessages, 
    addNewMessages, 
    createNewChat, 
    setChats, 
    setCurrentChatId, 
    setError, 
    setLoading,
    addStreamingMessage
} from "../chat.slice.js";
import { 
    getChats, 
    getMessages, 
} from "../service/chat.api.js";
import { useEffect, useRef } from "react";

export function useChat() {
    const dispatch = useDispatch()
    const socketRef = useRef(null);

    useEffect(() => {

        if (!socketRef.current) {
            socketRef.current = initializedSocketConnection();
        }
        const socket = socketRef.current;
        handleSocketMessage(socket);

        return () => {
            socket.off("chat_created");
            socket.off("ai_chunk");
            socket.off("ai_complete");
            socket.off("error");
        };

    }, []);

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true));

        if (chatId) {
            dispatch(
                addNewMessages({
                    chatId,
                    content: message,
                    role: "user"
                })
            );
        }

        socketRef.current.emit(
            "send_message",
            {
                message,
                chatId
            }
        );

        dispatch(setLoading(false));

    }

    async function handleGetChats() {
        dispatch(setLoading(true))
        const data = await getChats()

        const { chat } = data

        const formattedChats = chat.reduce((acc, item) => {
            acc[item._id] = {
                id: item._id,
                title: item.title,
                messages: [],
                lastUpdated: item.updatedAt
            };

            return acc;
        }, {});
        dispatch(setChats(formattedChats))
        dispatch(setLoading(false))
    }

    async function handleOpenChat(chatId, chats) {

        if (chats[chatId].messages.length === 0) {
            const data = await getMessages({ chatId })
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role
            }))
            dispatch(addMessages({
                chatId,
                messages: formattedMessages
            }))
        }
        dispatch(setCurrentChatId(chatId))
    }

    function handleSocketMessage() {
        socketRef.current.on("chat_created",
            ({ chat, message }) => {

                dispatch(createNewChat({
                    chatId: chat._id,
                    title: chat.title
                }))

                dispatch(setCurrentChatId(chat._id))


                dispatch(addNewMessages({
                    chatId: chat._id,
                    content: message,
                    role: "user"
                }))
            }
        )

        socketRef.current.on("ai_chunk",
            ({ chunk }) => {
                dispatch(addStreamingMessage({
                    content: chunk
                }))
            }
        )

        socketRef.current.on(
            "ai_complete",
            ({ aiMessage }) => {
                dispatch(setLoading(false))
            }
        )
    }
    return {
        initializedSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }
}