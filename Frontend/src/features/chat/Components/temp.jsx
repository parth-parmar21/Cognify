import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
const CodeBlock = ({ inline, className, children, ...props }) => {
    
    const [copied, setCopied] = useState(false)

    const language = className?.replace("language-", "") || ""

    if (!className) {
        return (
            <code className='bg-zinc-800 px-1.5 py-0.5 rounded text-cyan-400'
                {...props}
            >
                {children}
            </code>
        )
    }
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(String(children))
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1500);

    }

    const isTerminal =
        language === "bash" ||
        language === "shell" ||
        language === "sh" ||
        language === "zsh" ||
        language === "cmd";

    return (
        <div className="rounded-xl overflow-hidden border border-zinc-700 my-3">

            <div
                className={`flex justify-between items-center px-3 py-2 ${isTerminal ? "bg-black" : "bg-zinc-900"
                    }`}
            >

                <div className="flex items-center gap-2">

                    {isTerminal && (
                        <>
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </>
                    )}

                    <span className="text-[10px] md:text-xs uppercase text-zinc-400">
                        {language || "text"}
                    </span>

                </div>

                <button
                    onClick={copyToClipboard}
                    className="text-white"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>

            </div>

            <div className="overflow-x-auto">

                <SyntaxHighlighter
                    language={language}
                    style={coldarkDark}
                    customStyle={{
                        margin: 0,
                        padding: window.innerWidth < 768 ? "10px" : "14px",
                        background: isTerminal ? "#000" : "#212121",
                        fontSize: window.innerWidth < 768 ? "11px" : "14px",
                    }}
                    wrapLongLines
                    {...props}
                >
                    {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>

            </div>

        </div>
    )
}

export default CodeBlock