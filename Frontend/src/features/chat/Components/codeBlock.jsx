import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
const codeBlock = ({ inline, className, children, ...props }) => {
    const [copied, setCopied] = useState(false)

    const language = className?.replace("language-", "") || ""

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(String(children))
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1500);

        if (inline) {
            return (
                <code className='bg-zinc-800 px-1.5 py-0.5 rounded text-cyan-400'>
                    {children}
                </code>
            )
        }

    }

    const isTerminal =
        language === "bash" ||
        language === "shell" ||
        language === "sh" ||
        language === "zsh" ||
        language === "cmd";

    return (
        <div className='rounded-xl overflow-hidden border border-zinc-700 my-4'>
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-2 ${isTerminal ? 'bg-black' : 'bg-zinc-900'}`}>
                <div className='flex items-center gap-2'>
                    {isTerminal && (
                        <>
                            <div className='w-3 h-3 rounded-full bg-red-500'></div>
                            <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                            <div className='w-3 h-3 rounded-full bg-green-500'></div>
                        </>
                    )}

                    <span className='text-xs text-zinc-400 uppercase'>
                        {language || "text"}
                    </span>
                </div>

                <button
                onClick={copyToClipboard}
                className='text-red-50 hover:text-white'
                >
                    {
                        copied ? (
                            <Check size={16}/>
                        ): (
                            <Copy size={16} />
                        )
                    }
                </button>
            </div>

            <SyntaxHighlighter
            language={language}
            style={coldarkDark}
            customStyle={{
                margin: 0,
                padding: "20px",
                background: isTerminal ? "#000" : "#212121",
                fontSize: 14
            }}
            wrapLongLines
            {...props}
            >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
        </div>
    )
}

export default codeBlock