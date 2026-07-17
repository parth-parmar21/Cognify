import React, { useEffect } from 'react'
import Logo from '../../../assets/LogoWhite.png'
import { PanelLeft } from 'lucide-react'
import { useChat } from '../hooks/useChat'
import { useSelector } from 'react-redux'

const SideBar = () => {
    const { handleGetChats, handleOpenChat } = useChat()
    const chats = useSelector((state) => state.chat.chats)
    useEffect(() => {
        handleGetChats()
    }, [])

    const openChat = (chatId) => {
        handleOpenChat(chatId, chats)
    }

    return (
        <div className='bg-[#111] overflow-y-auto scrollbar-none border-r-2 border-[#ffffff10] h-full w-[15vw] py-4 px-3'>
            <div className='flex items-center justify-between'>
                <div className='w-10'>
                    <img src={Logo} alt="" />
                </div>
                <div>
                    <PanelLeft color='#cecece' />
                </div>
            </div>
            <div>
                {Object.values(chats).map((cht, idx) => {
                    return (
                        <button
                            className='bg-[#111] hover:bg-[#ffffff10] w-full h-10 rounded-lg my-1 p-2 text-[#cecece]'
                            key={idx}
                            onClick={() => openChat(cht.id)}
                        >
                            {cht.title}
                        </button>
                    );
                })}
            </div>
        </div>

    )
}

export default SideBar