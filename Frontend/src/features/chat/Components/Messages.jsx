import React from 'react'
import { useSelector } from 'react-redux';
import Logo from '../../../assets/LogoWhite.png'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from './CodeBlock';

const Messages = () => {
    const chats = useSelector((state) => state.chat.chats);
    const currentChatId = useSelector((state) => state.chat.currentChatId)

    return (
        <div className="flex-1 overflow-y-auto scrollbar-none px-3 sm:px-5 md:px-8 py-6 pb-48">

            {!chats?.[currentChatId]?.messages?.length ? (

                <div className="h-full flex flex-col md:flex-row items-center justify-center gap-6 text-center">

                    <img
                        src={Logo}
                        className="w-20 md:w-28"
                    />

                    <h1 className="text-4xl md:text-7xl font-medium text-white">
                        Cognify
                    </h1>

                </div>

            ) : (

                <div className="w-full max-w-4xl mx-auto flex flex-col gap-5">

                    {chats[currentChatId].messages.map((msg, index) => (

                        <div
                            key={index}
                            className={`flex ${msg.role === "user"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >
                            <div
                                className={`rounded-2xl px-4 py-3 md:px-5 md:py-4 max-w-[95%] md:max-w-[80%] ${msg.role === "user"
                                    ? "bg-[#1d1d1d] text-white rounded-br-sm"
                                    : "text-zinc-200 rounded-bl-sm"
                                    }`}
                            >

                                {msg.role === "user" ? (
                                    msg.content
                                ) : (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ children }) => (
                                                <h1 className="text-2xl font-bold mb-4">
                                                    {children}
                                                </h1>
                                            ),
                                            h2: ({ children }) => (
                                                <h2 className="text-xl font-semibold mt-5 mb-3">
                                                    {children}
                                                </h2>
                                            ),
                                            p: ({ children }) => {
                                                const hasBlockElement = React.Children.toArray(children).some((child) => {
                                                    return React.isValidElement(child) &&
                                                        (child.type === "pre" || child.type === "div");
                                                });

                                                if (hasBlockElement) {
                                                    return <>{children}</>;
                                                }

                                                return (
                                                    <p className="leading-7 mb-3">
                                                        {children}
                                                    </p>
                                                );
                                            },
                                            ul: ({ children }) => (
                                                <ul className="list-disc ml-6 mb-3">
                                                    {children}
                                                </ul>
                                            ),
                                            li: ({ children }) => (
                                                <li>{children}</li>
                                            ),
                                            code: CodeBlock,
                                        }}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
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
