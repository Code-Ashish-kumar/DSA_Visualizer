import React from 'react'
import HighlightedText from './HighlightedText'
import ColorButton from './ColorButton'
import { Link, useLocation } from 'react-router-dom'
import { NavbarLinks } from '../../data/navbar'
import { FaBrain } from 'react-icons/fa'

const Navbar = () => {
  const location = useLocation()
  
  return (
    <div className='sticky top-0 z-50 w-full flex items-center justify-between p-4 bg-white shadow-sm'>
        <div className='flex items-center justify-between w-11/12 mx-auto'>
            <div className='flex items-center space-x-2'>
                <FaBrain className="text-3xl text-blue-400" />
                <HighlightedText text="DSA-VISUALIZER" />
            </div>

            <div>
                <nav>
                    <ul className='flex gap-x-10 text-blue-500 font-semibold'>
                        {
                            NavbarLinks.map((link , idx) => (
                                <li key={idx}>
                                    <Link to={link?.path}>
                                        <p className={`${location.pathname === link?.path ? 'text-blue-500 scale-105' : 'text-gray-400'} transition-all duration-200`}>{link.title}</p>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar