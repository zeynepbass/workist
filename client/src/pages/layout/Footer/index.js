import React from 'react'

const index = () => {
    const d = new Date();
    let year = d.getFullYear();
    return (
        <div className='bg-gray-100 relative p-3'>



     <p className='text-gray-600'>Copyright © {year}</p>
    
        </div>
    )
}

export default index
