import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        currentChatId: null,
        loading: false,
        error: null,
    },
    reducers: {
        createNewChat: (state, action) => {
            const { chatId, title } = action.payload;
            state.chats[chatId] = {
                id: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toISOString(),
            };
        },
        addMessages: (state, action) => {
            const { chatId, messages }= action.payload
            if (!state.chats[chatId]) {
                return;
            }

            state.chats[chatId].messages.push(...messages);
        },
        addNewMessages: (state, action) => {
            const { chatId, content, role } = action.payload;
            if (!state.chats[chatId]) {
                return;
            }

            state.chats[chatId].messages.push({
                content,
                role,
            });;
        },
        addStreamingMessage: (state, action) => {
            const chat = state.chats[state.currentChatId]

            if (chat) {
                const last = chat.messages[
                    chat.messages.length - 1
                ]

                if (last && last.role === "ai") {
                    last.content += action.payload.content;
                } else {
                    chat.messages.push({ 
                        content: action.payload.content, 
                        role: "ai" 
                    });
                }
            }
        },
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setChats,
    setCurrentChatId,
    setLoading,
    setError,
    createNewChat,
    addNewMessages,
    addMessages,
    addStreamingMessage
} = chatSlice.actions;
export default chatSlice.reducer;
