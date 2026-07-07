import { useEffect, useRef, useState } from "react";
import { Mic, Send, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import Logo from '../../../assets/LogoWhite.png'
import { useChat } from "../hooks/useChat";
const Chat = () => {
    const fileInputRef = useRef(null);
    const chat = useChat()

    const chats = useSelector((state) => state.chat.chats);
    const currentChatId = useSelector((state) => state.chat.currentChatId)
    
    const [input, setInput] = useState("");

    useEffect(()=> {
        chat.initializedSocketConnection()
    }, [])
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

    return (
        <section className="min-h-screen w-[85vw] bg-[#111] flex flex-col">

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-6 py-8">

                {!chats?.[currentChatId]?.messages?.length ? (
                    <div className="h-full flex items-center justify-center gap-4">

                        {/* Logo */}
                        <img src={Logo} className="w-28" />

                        <h1 className="text-8xl font-medium text-[#cecece]">
                            Cognify
                        </h1>

                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto flex flex-col gap-6">

                        {chats?.[currentChatId]?.messages?.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[75%] px-5 py-3 rounded-2xl whitespace-pre-wrap ${msg.role === "user"
                                        ? "bg-[#1d1d1d] text-white rounded-br-sm"
                                        : "bg-transparent text-[#e5e5e5] rounded-bl-sm"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Input Box */}
            <div className="sticky bottom-0 bg-[#111] px-5 pb-6">
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
                        rows={2}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
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
                                text-[#cecece]
                                hover:bg-[#31b8c6]
                                hover:text-white
                                transition
                            "
                        >
                            <Plus size={20} />
                        </button>

                        <div className="flex gap-3">

                            <button
                                className="
                                    h-11
                                    w-11
                                    rounded-full
                                    border
                                    border-[#ffffff10]
                                    flex
                                    items-center
                                    justify-center
                                    text-[#cecece]
                                    hover:bg-[#31b8c6]
                                    hover:text-white
                                    transition
                                "
                            >
                                <Mic size={20} />
                            </button>

                            <button
                                onClick={sendMessage}
                                className="
                                    h-11
                                    w-11
                                    rounded-full
                                    bg-[#cecece]
                                    text-black
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-[#31b8c6]
                                    hover:text-white
                                    transition
                                "
                            >
                                <Send size={20} />
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Chat;