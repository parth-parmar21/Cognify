import React, { useEffect, useState } from "react";
import Logo from "../../../assets/LogoWhite.png";
import { PanelLeft, SquarePen } from "lucide-react";
import { useChat } from "../hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId } from "../chat.slice";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen }) => {
    const { handleGetChats, handleOpenChat } = useChat();

    const chats = useSelector((state) => state.chat.chats);
    const dispatch = useDispatch();

    useEffect(() => {
        handleGetChats();
    }, []);

    const openChat = (chatId) => {
        handleOpenChat(chatId, chats);
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isSideBarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setIsSideBarOpen(false)}
                />
            )}

            <div
                className={`
            fixed md:relative
            top-0 left-0
            h-screen
            bg-[#111]
            border-r border-[#ffffff10]
            overflow-hidden
            z-50
            transition-all duration-300 ease-in-out

        ${isSideBarOpen
                        ? "translate-x-0 w-64"
                        : "-translate-x-full md:translate-x-0 md:w-14"
                    }

        md:${isSideBarOpen ? "w-64" : "w-14"}
    `}
            >
                <div className={isSideBarOpen ? "p-4" : "py-4"}> 
                    {/* Header */}
                    <div
                        className={`flex items-center ${isSideBarOpen ? "justify-between" : "justify-center"
                            }`}
                    >
                        {isSideBarOpen && (
                            <h1 className="font-bold text-xl text-white">Cognify</h1>
                        )}

                        <button
                            onClick={() => setIsSideBarOpen((prev) => !prev)}
                            className="p-2 rounded-lg hover:bg-[#ffffff10]"
                        >
                            <PanelLeft size={20} color="white" />
                        </button>
                    </div>

                    {/* New Chat */}
                    <button
                        onClick={() => {
                            dispatch(setCurrentChatId(null));

                            if (window.innerWidth < 768) {
                                setIsSideBarOpen(false);
                            }
                        }}
                        className={`mt-6 flex items-center transition-all hover:bg-[#ffffff10]
        ${isSideBarOpen
                                ? "w-full h-11 rounded-xl px-3 gap-3"
                                : "w-9 h-9 rounded-lg justify-center mx-auto"
                            }`}
                    >
                        <SquarePen size={20} color="white" />
                        {isSideBarOpen && <span className="text-white">New Chat</span>}
                    </button>   

                    {/* Chats */}
                    <div
                        className={`mt-8 ${!isSideBarOpen && "opacity-0 pointer-events-none"
                            }`}
                    >
                        <h2 className="text-md text-white font-bold uppercase">Chats</h2>

                        <div className="space-y-1">
                            {Object.values(chats).map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => {
                                        openChat(chat.id);

                                        if (window.innerWidth < 768) {
                                            setIsSideBarOpen(false);
                                        }
                                    }}
                                    className="w-full text-left px-3 py-2 rounded-lg text-white hover:bg-[#ffffff10] truncate"
                                >
                                    {chat.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
