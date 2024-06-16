import React from 'react'
import { Link } from 'react-router-dom'

const Frontpage = () => {
  return (
    <>
    <div className='bg-[#2a1b3d] h-screen w-screen text-center '>
    <div className='text-gray-300 text-8xl p-[5rem] pb-[10rem]'>Inventory and Manufacturing Management System </div>
    <div>
   <Link to="/itemlist"> 
   <button className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-10 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Item Page
</span>
</button></Link>
   <Link to="/orderlist"> <button className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span className="relative px-10 py-4 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
Order Page
</span>
</button></Link>
</div>
   </div>
   </>
  )
}

export default Frontpage