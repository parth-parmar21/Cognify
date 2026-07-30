import { useEffect, useRef, useState } from "react";
import { Mic, Send, Plus, PanelLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import Messages from "./Messages";
import PromptInput from "./PromptInput";
const ChatLayout = ({ isSideBarOpen, setIsSideBarOpen }) => {
    const { handleGetChats } = useChat()
    useEffect(() => {
        handleGetChats()
    }, [])


    return (
        <section className="flex-1 h-screen overflow-hidden bg-[#111] flex flex-col relative">            <div className="md:hidden h-14 flex items-center px-4 border-b border-[#ffffff10]">
                <button
                    onClick={() => setIsSideBarOpen(true)}
                    className="p-2 rounded-lg hover:bg-[#ffffff10]"
                >
                    <PanelLeft color="white" size={22} />
                </button>

                <h2 className="ml-4 w-full text-center text-white font-semibold text-lg">
                    Cognify
                </h2>
            </div>
            {/* Chat Area */}
            <Messages />

            {/* Input Box */}
            <PromptInput />

        </section>
    );
};

export default ChatLayout;