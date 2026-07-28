import { useDispatch } from "react-redux";
import { initializedSocketConnection } from "../service/chat.socket.js";
import { addMessages, addNewMessages, createNewChat, setChats, setCurrentChatId, setError, setLoading } from "../chat.slice.js";
import { getChats, getMessages, sendMessage } from "../service/chat.api.js";

export function useChat() {
    const dispatch = useDispatch()

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true))
        const data = await sendMessage({ message, chatId })

        const { aiMessage, chat } = data
        const activeChatId = chat._id;

        if (!chatId) {
            dispatch(
                createNewChat({
                    chatId: activeChatId,
                    title: chat.title
                }));
        }
        dispatch(addNewMessages({
            chatId: activeChatId,
            content: message,
            role: "user"
        }))
        dispatch(addNewMessages({
            chatId: activeChatId,
            content: aiMessage.content,
            role: aiMessage.role
        }))
        dispatch(setCurrentChatId(activeChatId))
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
    return {
        initializedSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat
    }
}