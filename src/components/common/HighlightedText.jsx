import React from 'react'

const HighlightedText = ({ text }) => {
    return (
        <span className='font-bold bg-[linear-gradient(90deg,rgba(0,191,255,1)_0%,rgba(0,160,255,1)_100%)] bg-clip-text text-transparent text-2xl'>
            {text}
        </span>
    )
}

export default HighlightedText