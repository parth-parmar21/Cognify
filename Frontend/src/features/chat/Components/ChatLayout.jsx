import { useEffect, useRef, useState } from "react";
import { Mic, Send, Plus } from "lucide-react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import codeBlock from "./codeBlock";
import Messages from "./Messages";
import PromptInput from "./PromptInput";
const Chat = () => {
    const chat = useChat()


    

    useEffect(() => {
        chat.initializedSocketConnection()
        chat.handleGetChats()
    }, [])


    return (
        <section className="min-h-screen w-[85vw] bg-[#111] flex flex-col relative">

            {/* Chat Area */}
            <Messages />

            {/* Input Box */}
            <PromptInput />

        </section>
    );
};

export default Chat;