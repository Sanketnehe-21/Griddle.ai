import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()
    
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            
            // Hide navbar when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
            
            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [lastScrollY])

    return (
        <div className={`fixed z-10 w-full bg-transparent flex justify-between items-center py-2 px-4 sm:px-20 xl:px-32 cursor-pointer transition-transform duration-300 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}>
            <img src={assets.logo} alt="" className='w-40 sm:w-44' onClick={() => navigate('/')} />
            {
                user ? <UserButton /> :(
                    <button onClick={openSignIn} className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-10 py-2.5">Get Started<ArrowRight className='w-4 h-4' /></button>
                )
            }
        </div>
    )
}

export default Navbar