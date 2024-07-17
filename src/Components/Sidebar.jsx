import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Icon from './Styling/Images/ToDo.png'
import calender from './Styling/Images/calendar.png'
import birthday from './Styling/Images/birthday-cake.png'
import daily from './Styling/Images/list.png'
import monthly from './Styling/Images/to-do-list.png'
import special from './Styling/Images/glitter.png'
import x from './Styling/Images/close.png'


const Sidebar = () => {
    const [Menu, setMenu] = useState(true)
    const [data, setData] = useState({
        todoList: JSON.parse(localStorage.getItem('Todo')).length || [0],
        Month: JSON.parse(localStorage.getItem('TodoMon')).length || [0],
        Birthday: JSON.parse(localStorage.getItem('Birthday')).length || [0],
        Special: JSON.parse(localStorage.getItem('Special')).length || [0],
        Personal: JSON.parse(localStorage.getItem('Personal')).length || [0],
        Work: JSON.parse(localStorage.getItem('Work')).length || [0],
    });
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            const updatedData = {
                todoList: JSON.parse(localStorage.getItem('Todo')).length || [0],
                Month: JSON.parse(localStorage.getItem('TodoMon')).length || [0],
                Birthday: JSON.parse(localStorage.getItem('Birthday')).length || [0],
                Special: JSON.parse(localStorage.getItem('Special')).length || [0],
                Personal: JSON.parse(localStorage.getItem('Personal')).length || [0],
                Work: JSON.parse(localStorage.getItem('Work')).length || [0], 
            };
            setData(updatedData);
        }, 100);

    })

    const date = new Date()
    const newDate = date.getDate() + ' / ' + (date.getMonth()+1) + ' / ' + date.getFullYear() +" "+ date.getHours() + ":" + date.getMinutes();
    return (
        <>
            <div className='fixed md:w-1/5 w-1/2 h-screen'>
                <div>
                    <div className=' flex p-3 gap-5 mx-3 '>
                        <button onClick={() => { setMenu(!Menu) }} className={`transition-transform duration-300 transform ${Menu ? '' : 'rotate-45 origin-center'}`}>
                            <img src={x} alt="" className='w-5' />
                        </button>
                        <Link to='/'>
                            <img src={Icon} alt="" className='w-8' />
                        </Link>
                        <p>{newDate}</p>
                    </div>
                    <div className={`h-screen my-3 bg-zinc-200  rounded-tr-lg transition duration-300 ease-in ${Menu ? 'transform translate-x-0' : 'transform -translate-x-full'}`}>
                        <div className='flex-col flex w-full gap-2'>

                            <h2 className='text-zinc-900 text-lg font-["SF_Pro_Display"] p-2 flex justify-between  '>Task</h2>
                            <Link to='/' className='text-zinc-700 text-sm font-["SF_Pro_Display"] hover:bg-zinc-300 transition duration-300 p-3 flex gap-2 items-center '>
                                <img src={daily} alt="" className='w-5' />
                                <div className='flex justify-between  w-full h-full items-center'>
                                    Daily <p>{data.todoList}</p>
                                </div>
                            </Link>
                            <Link to='/monthly' className='text-zinc-700 text-sm font-["SF_Pro_Display"] hover:bg-zinc-300 transition duration-300 p-3 flex gap-2 items-center '>
                                <img src={monthly} alt="" className='w-5' />
                                <div className='flex justify-between  w-full h-full items-center'>
                                    Monthly <p>{data.Month}</p>
                                </div>
                            </Link>
                            <Link to='/special' className='text-zinc-700 text-sm font-["SF_Pro_Display"] hover:bg-zinc-300 transition duration-300 p-3 flex gap-2 items-center '>
                                <img src={special} alt="" className='w-5' />
                                <div className='flex justify-between  w-full h-full items-center'>
                                    Special Task <p>{data.Special}</p>
                                </div>
                            </Link>
                            <Link to='/birthday' className='text-zinc-700 text-sm font-["SF_Pro_Display"] hover:bg-zinc-300 transition duration-300 p-3 flex gap-2 items-center '>
                                <img src={birthday} alt="" className='w-5' />
                                <div className='flex justify-between  w-full h-full items-center'>
                                    Birthday <p>{data.Birthday}</p>
                                </div>
                            </Link>
                            <Link to='/calendar' className='text-zinc-700 text-sm font-["SF_Pro_Display"] hover:bg-zinc-300 transition duration-300 p-3 flex gap-2 items-center '>
                                <img src={calender} alt="" className='w-5' />
                                Calendar</Link>
                        </div>
                        <div className='flex-col flex w-full gap-2 my-3'>
                            <h2 className='text-zinc-900 text-lg font-["SF_Pro_Display"] p-2 flex justify-between  '>Lists</h2>
                            <Link to='/personal' className='text-zinc-700 text-sm font-["SF_Pro_Display"] hover:bg-zinc-300 transition duration-300 p-2 flex justify-between  '>Personal <p>{data.Personal}</p></Link>
                            <Link to='/work' className='text-zinc-700 text-sm font-["SF_Pro_Display"] hover:bg-zinc-300 transition duration-300 p-2 flex justify-between  '>Work <p>{data.Work}</p></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
