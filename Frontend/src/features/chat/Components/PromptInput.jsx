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
        <div className="absolute w-full bottom-0 bg-transparent px-5 pb-6">
            <div
                className="
                            w-full
                            max-w-3xl
                            mx-auto
                            rounded-3xl
                            border
                            border-[#ffffff10]
                            bg-[#171717]
                            p-5
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
                                placeholder:text-zinc-500
                                outline-none
                                text-lg
                                scrollbar-none
                            "
                />

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                <div className="flex items-center justify-between mt-4">

                    <button
                        onClick={handleFileSelect}
                        className="
                                    h-11
                                    w-11
                                    rounded-full
                                    border
                                    border-[#ffffff10]
                                    flex
                                    items-center
                                    justify-center
                                    text-[#ffffffe8]
                                    hover:bg-[#ffffff10]
                                    hover:text-white
                                    transition
                                "
                    >
                        <Plus size={20} />
                    </button>

                    <div className="flex gap-3">


                        <button
                            onClick={sendMessage}
                            className="
                                        h-11
                                        w-11
                                        rounded-full
                                        bg-[#ffffffe8]
                                        text-black
                                        flex
                                        items-center
                                        justify-center
                                        hover:bg-[#ffffffae]
                                        transition
                                    "
                        >
                            <Send size={20} />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromptInput
