import React from 'react'
import Logo from '../../../assets/LogoWhite.png'
import { PanelLeft } from 'lucide-react'

const SideBar = () => {
    return (
        <div className='bg-[#111] border-r-2 border-[#ffffff10] h-full w-[15vw] py-4 px-3'>
            <div className='flex items-center justify-between'>
                <div className='w-10'>
                    <img src={Logo} alt="" />
                </div>
                <div>
                    <PanelLeft color='#cecece'/>
                </div>
            </div>
            <div>
                <div className='bg-[#111] hover:bg-[#ffffff10] w-full h-10 rounded-lg my-2 p-2 text-[#cecece]'>Chat title</div>
                <div className='bg-[#111] hover:bg-[#ffffff10] w-full h-10 rounded-lg my-2 p-2 text-[#cecece]'>Chat title</div>
                <div className='bg-[#111] hover:bg-[#ffffff10] w-full h-10 rounded-lg my-2 p-2 text-[#cecece]'>Chat title</div>
                <div className='bg-[#111] hover:bg-[#ffffff10] w-full h-10 rounded-lg my-2 p-2 text-[#cecece]'>Chat title</div>
            </div>
        </div>
        
    )
}

export default SideBar