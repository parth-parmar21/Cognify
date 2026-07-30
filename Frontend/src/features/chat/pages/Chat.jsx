import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import SideBar from '../Components/SideBar'
import ChatLayout from '../Components/ChatLayout'

const Chat = () => {
    const user = useSelector(state => state.auth)
    const chat = useChat()
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    useEffect(() => {
        chat.initializedSocketConnection()
    }, [])

    return (
        <div className='h-screen flex w-full text-white bg-[#111]'>
            <SideBar isSideBarOpen={isSideBarOpen}
                setIsSideBarOpen={setIsSideBarOpen} />
            <ChatLayout isSideBarOpen={isSideBarOpen}
                setIsSideBarOpen={setIsSideBarOpen} />
        </div>
    )
}

export default Chat