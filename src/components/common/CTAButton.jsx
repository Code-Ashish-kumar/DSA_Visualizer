import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children , active , linkPath}) => {
    return (
        <Link to={linkPath}>
            <div className={`w-fit flex items-center gap-2 text-center text-[15px] px-6 py-3 rounded-md font-semibold
                ${active ? "bg-cyan-500 text-white" : "bg-richblack-800"}
                transition-all duration-300 hover:scale-105
            `}>
                {children}
            </div>
        </Link>
    )
}

export default CTAButton;