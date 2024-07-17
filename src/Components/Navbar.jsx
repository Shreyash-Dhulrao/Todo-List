import React from 'react'
import { Link } from "react-router-dom";
import Icon from './Styling/Images/ToDo.png'

const Navbar = () => {
  return (
    <>
      <div className='fixed w-full'>
        <div className='bg-zinc-200 items-center justify-center flex p-3 backdrop-blur-xl'>
            <Link to='/'>
                <img src={Icon} alt="" className='w-8' />
            </Link>
        </div>
        
      </div>
    </>
  )
}

export default Navbar
