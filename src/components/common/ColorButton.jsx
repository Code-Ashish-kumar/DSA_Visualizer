import React from 'react'
import { Link } from 'react-router-dom'

const ColorButton = ({children , link , active}) => {

    return (
        <Link to={link} className={`px-4 py-2 rounded-md text-sm font-medium 
        ${active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            {children}
        </Link> 
    )
}

export default ColorButton