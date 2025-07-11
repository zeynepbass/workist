import React from 'react'

const index = () => {
    return (
        <div className='h-[100vh]'>
            <h4 className='text-left'>Yapılacaklar</h4>
            <h4 className='text-right text-purple-300'>Yapılanları Temizle</h4><br />
            <div className='flex justify-center w-[100vh]'>
                <table className="table-auto scroll-m-2 bg-white  w-[100vh]  h-[400px] overflow-auto border">

                    <thead className='text-center border'>
                        <tr >

                            <th className='text-gray-400 p-4'>Kategori</th>
                            <th className='text-gray-400'>Konu</th>
                            <th className='text-gray-400'>Kim</th>
                        </tr>

                    </thead>

                    <tbody className='text-center'>

                        <br />
                        <tr>
                            <td className='text-gray-400 '>Yeni Mesaj</td>
                            <td >The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td className=' text-purple-600'>Malcolm Lockyer</td>

                            <td className='text-gray-400'>   <button className="px-4 py-3  bg-purple-600  text-white ">Message</button></td>
                        </tr>
                        <br />
                        <tr className='bg-green-100'>
                            <td className='line-through text-green-500'>Yeni Mesaj</td>
                            <td className='line-through text-green-500'>Witchy Woman</td>

                            <td className='text-purple-600'>Malcolm Lockyer</td>
                            <td></td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default index
