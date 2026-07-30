import { Plus, Send } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useChat } from '../hooks/useChat';

const PromptInput = () => {
    const chat = useChat()

    const fileInputRef = useRef(null);
    const [input, setInput] = useState("");
    const textAreaRef = useRef(null)
    const currentChatId = useSelector((state) => state.chat.currentChatId)


    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            console.log(file);
        }
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        const userMessage = {
            role: "user",
            content: input,
        };

        chat.handleSendMessage({ message: input, chatId: currentChatId });
        setInput("");

    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleInput = (e) => {
        setInput(e.target.value)

        const textarea = textAreaRef.current
        textarea.style.height = "auto"
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`

    }
    return (
        <div className="absolute bottom-0 w-full px-3 md:px-5 pb-4 md:pb-6">

            <div
                className="
            max-w-3xl
            mx-auto
            rounded-3xl
            border
            border-[#ffffff10]
            bg-[#171717]
            p-3
            md:p-5
        "
            >

                <textarea
                    ref={textAreaRef}
                    rows={1}
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    className="
                w-full
                resize-none
                bg-transparent
                text-white
                text-base
                md:text-lg
                outline-none
                scrollbar-none
            "
                />

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="flex justify-between items-center mt-4">

                    <button
                        onClick={handleFileSelect}
                        className="h-10 w-10 md:h-11 md:w-11 rounded-full border border-[#ffffff10] flex justify-center items-center text-white hover:bg-[#ffffff10]"
                    >
                        <Plus size={18} />
                    </button>

                    <button
                        onClick={sendMessage}
                        className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-white text-black flex justify-center items-center hover:bg-zinc-300"
                    >
                        <Send size={18} />
                    </button>

                </div>

            </div>

        </div>
    )
}

export default PromptInput
