import React from 'react'
import { useSelector } from 'react-redux';
import Logo from '../../../assets/LogoWhite.png'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import codeBlock from './codeBlock';

const Messages = () => {
    const chats = useSelector((state) => state.chat.chats);
    const currentChatId = useSelector((state) => state.chat.currentChatId)
    
    return (
        <div className="flex-1 overflow-y-scroll scrollbar-none px-6 py-8 pb-52">

            {!chats?.[currentChatId]?.messages?.length ? (
                <div className="h-full flex items-center justify-center gap-4">

                    {/* Logo */}
                    <img src={Logo} className="w-28" />

                    <h1 className="text-8xl font-medium text-[#ffffffe8]">
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
                                className={`max-w-[90%] px-5 py-3 rounded-2xl ${msg.role === "user"
                                    ? "bg-[#1d1d1d] text-white rounded-br-sm"
                                    : "bg-transparent text-[#e5e5e5] rounded-bl-sm"
                                    }`}
                            >
                                {msg.role === "user" ? (
                                    msg.content
                                ) : (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                            components={{
                                                h1: ({ children }) => (
                                                    <h1 className="text-2xl font-bold mb-4">{children}</h1>
                                                ),

                                                h2: ({ children }) => (
                                                    <h2 className="text-xl font-semibold mt-6 mb-2">{children}</h2>
                                                ),

                                                p: ({ children }) => (
                                                    <p className="mb-3 leading-7">{children}</p>
                                                ),

                                                ul: ({ children }) => (
                                                    <ul className="list-disc ml-6 mb-3">{children}</ul>
                                                ),

                                                li: ({ children }) => (
                                                    <li className="mb-1">{children}</li>
                                                ),

                                                code: codeBlock,
                                            }}
                                    >{msg.content}</ReactMarkdown>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Messages
