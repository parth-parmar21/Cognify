import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import SideBar from '../Components/SideBar'
import Chat from '../Components/Chat'

const Dashboard = () => {
    const user = useSelector(state => state.auth)
    const chat = useChat()

    useEffect(() => {
        chat.initializedSocketConnection()
    }, [])

    return (
        <div className='h-screen flex w-full text-white bg-[#111]'>
            <SideBar />
            <Chat />
        </div>
    )
}

export default Dashboard