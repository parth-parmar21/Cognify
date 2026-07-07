import { useDispatch } from "react-redux";
import { initializedSocketConnection } from "../service/chat.socket.js";
import { addNewMessages, createNewChat, setChats, setCurrentChatId, setError, setLoading } from "../chat.slice.js";
import { sendMessage } from "../service/chat.api.js";

export function useChat() {
    const dispatch = useDispatch()

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true))
        const data = await sendMessage({ message, chatId })

        const { aiMessage, chat } = data

        dispatch(
            createNewChat({
                chatId: chat._id,
                title: chat.title
            }));
            dispatch(addNewMessages({
                chatId: chat._id,
                content: message,
                role: "user"
            }))
            dispatch(addNewMessages({
                chatId: chat._id,
                content: aiMessage.content,
                role: aiMessage.role
            }))
        dispatch(setCurrentChatId(chat._id))
    }
    return {
        initializedSocketConnection,
        handleSendMessage
    }
}