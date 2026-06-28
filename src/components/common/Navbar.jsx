import React, { useState, useEffect, useRef } from 'react'
import HighlightedText from './HighlightedText'
import ColorButton from './ColorButton'
import { Link, useLocation } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar'
import { FaBrain, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const navbarRef = useRef(null)

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setIsOpen(false)
        }
        }

        if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])
    
    return (
        <div 
            ref={navbarRef}
            className='sticky top-0 z-50 w-full flex flex-col items-center justify-between p-4 bg-white shadow-sm'
        >
            <div className='flex items-center justify-between w-11/12 mx-auto'>
                <Link 
                    className='flex items-center space-x-2'
                    to='/'
                >
                    <FaBrain className="text-3xl text-[#18CCFF]" />
                    <HighlightedText text="DSA-VISUALIZER" />
                </Link>

                {/* Mobile Menu Button */}
                <div className='md:hidden'>
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className='text-blue-500 focus:outline-none transition-transform duration-200 hover:text-blue-900'
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-x-10 text-blue-500 font-semibold'>
                        {
                            NavbarLinks.map((link , idx) => (
                                <li key={idx}>
                                    <Link to={link?.path}>
                                        <p className={`${location.pathname === link?.path ? 'text-blue-500 scale-105 hover:text-blue-600' : 'text-gray-400 hover:text-gray-600'} transition-all duration-200`}>{link.title}</p>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>

            {/* Mobile Navigation Links */}
            {isOpen && (
                <div className='w-full md:hidden mt-4 border-t border-gray-100 pt-4 transition-all duration-300 ease-in-out'>
                    <nav className='flex flex-col items-center space-y-4 font-semibold'>
                        {
                            NavbarLinks.map((link , idx) => (
                                <Link 
                                    key={idx} 
                                    to={link?.path}
                                    className='w-full text-center py-2 hover:bg-gray-50 rounded transition-colors duration-150'
                                >
                                    <p className={`${location.pathname === link?.path ? 'text-blue-500 scale-105' : 'text-gray-400'} transition-all duration-200`}>{link.title}</p>
                                </Link>
                            ))
                        }
                    </nav>
                </div>
            )}
        </div>
    )
}

export default Navbar