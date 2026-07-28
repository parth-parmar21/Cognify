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
                                {msg.role === "user" ? (
                                    msg.content
                                ) : (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            code: codeBlock
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
