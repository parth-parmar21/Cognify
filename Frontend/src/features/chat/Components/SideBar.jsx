import React, { useEffect, useState } from "react";
import Logo from "../../../assets/LogoWhite.png";
import { PanelLeft, SquarePen } from "lucide-react";
import { useChat } from "../hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId } from "../chat.slice";

const SideBar = () => {
    const { handleGetChats, handleOpenChat } = useChat();

    const chats = useSelector((state) => state.chat.chats);
    const dispatch = useDispatch();

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    useEffect(() => {
        handleGetChats();
    }, []);

    const openChat = (chatId) => {
        handleOpenChat(chatId, chats);
    };

    return (
        <aside
            className={`chatgpt-scrollbar shrink-0 h-full bg-[#111] border-r border-[#ffffff10] transition-all duration-300 ${isSideBarOpen
                    ? "w-[16vw] px-4 py-4 overflow-y-auto"
                    : "w-[3vw] px-1 py-0 overflow-hidden"
                }`}
        >
            {/* Header */}
            <div
                className={`flex items-center ${isSideBarOpen ? "justify-between" : "justify-center"
                    }`}
            >
                {isSideBarOpen && (
                    <h1 className="font-bold text-xl text-[#ffffffe8]">Cognify</h1>
                )}

                <button
                    onClick={() => setIsSideBarOpen((prev) => !prev)}
                    className="p-2 rounded-lg hover:bg-[#ffffff10] transition-colors"
                >
                    <PanelLeft
                        size={20}
                        color="#ffffffe8"
                    />
                </button>
            </div>

            {/* New Chat */}
            <button
                onClick={() => dispatch(setCurrentChatId(null))}
                className={`w-full h-11 rounded-xl hover:bg-[#ffffff10] transition-all flex items-center ${isSideBarOpen
                    ? "justify-start gap-4 px-3 mt-6"
                    : "justify-center mt-4"
                    } text-[#ffffffe8]`}
            >
                <SquarePen size={20} />

                <span
                    className={`transition-all duration-200 whitespace-nowrap ${isSideBarOpen
                            ? "opacity-100"
                            : "opacity-0 w-0 overflow-hidden"
                        }`}
                >
                    New Chat
                </span>
            </button>

            {/* Chats */}
            <div
                className={`mt-8 transition-all ${isSideBarOpen
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
            >
                <h2 className="text-sm font-semibold text-[#ffffffe8] uppercase tracking-wide mb-3">
                    Chats
                </h2>

                <div className="space-y-1">
                    {Object.values(chats).map((chat) => (
                        <button
                            key={chat.id}
                            onClick={() => openChat(chat.id)}
                            className="w-full text-left px-3 py-2 rounded-lg text-[#ffffffe8] hover:bg-[#ffffff10] transition truncate"
                        >
                            {chat.title}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default SideBar; 