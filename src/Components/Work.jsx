import React, { useEffect, useState } from 'react'
import Trash1 from './Styling/Images/trash-bin.png'
import Trash2 from './Styling/Images/trash-bin (1).png'
import Check from './Styling/Images/check.png'
import Sidebar from './Sidebar'

const Daily = () => {
    const [isCompleted, setisCompleted] = useState(false)
    const [complete, setcomplete] = useState([])
    const [Alert, setAlert] = useState(false)
    const [AllData, setAllData] = useState([])
    const [Task, setTask] = useState('')
    const [Count, setCount] = useState()
    const [Description, setDescription] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState('');
    const d = new Date();
    const format = (n) => n.toString().padStart(2, '0');
    const ymd = `${d.getFullYear()}-${format(d.getMonth() + 1)}-${format(d.getDate())}`;
    const [date, setDate] = useState(ymd);
    const minutes = d.getMinutes()
    const formatMinutes = (minutes) => (minutes < 10 ? `0${minutes}` : minutes);
    const Minute = formatMinutes(minutes)

    const hours = d.getHours()
    const formatHours = (hours) => (hours < 10 ? `0${hours}` : hours);
    const Hour = formatHours(hours)
    const time1 = Hour + ':'+Minute;
    const [selectedTime, setSelectedTime] = useState(time1);

    const tags = ['Meetings', 'Project', 'Break'];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        setIsOpen(false);
    };

    const Submit = () => {


        let arrayData = {
            title: Task,
            Desc: Description,
            selectedtag: selectedTag,
            date: date,
            time: selectedTime
        }

        if (Task === '' || Description === '') {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 3000);
            return 0;
        }

        let newData = [...AllData]
        newData.push(arrayData)
        setAllData(newData);
        localStorage.setItem('Work', JSON.stringify(newData))

        setTask('')
        setDescription('')
        setSelectedTag('')
        setSelectedTime(time1)

        const storedWorks = localStorage.getItem('Work');
        if (storedWorks) {
            const WorksArray = JSON.parse(storedWorks);
            setCount(WorksArray.length);
        }
    }

    let Saved = JSON.parse(localStorage.getItem('Work'));
    let completedWork = JSON.parse(localStorage.getItem('Workcomplete'))
    useEffect(() => {
        if (Saved) {
            setAllData(Saved);
            setCount(Saved.length);
        }
        if (completedWork) {
            setcomplete(completedWork)
        }
    }, []);

    const handledelete = index => {
        let reduceData = [...AllData]
        reduceData.splice(index, 1)
        console.log(index)

        localStorage.setItem('Work', JSON.stringify(reduceData))
        setAllData(reduceData)
    }


    const handleComplete = index => {
        let date = new Date();
        let dd = date.getDate();
        let mm = date.getMonth();
        let yyyy = date.getFullYear();
        let hr = date.getHours();
        let min = date.getMinutes();

        let completes = dd + '-' + mm + '-' + yyyy + ' at ' + hr + ':' + min;

        let newFile = {
            ...AllData[index],
            tcomplete: completes
        }

        let updatedData = [...complete];
        updatedData.push(newFile);

        setcomplete(updatedData)
        handledelete(index)
        localStorage.setItem('Workcomplete', JSON.stringify(updatedData))
    }

    const handleCompletedelete = (index) => {
        let reduceData = [...complete]
        reduceData.splice(index, 1)
        console.log(index)

        localStorage.setItem('Workcomplete', JSON.stringify(reduceData))
        setcomplete(reduceData)
    }
    return (
        <>
            <div className='ms-60'>
                <div className={`bg-red-100 border-b-4 border-orange-500 text-orange-700 transition duration-300 ease-in-out p-4 w-fit gap-2 items-end flex justify-center absolute right-5 ${Alert ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full '}`} role="alert"
                >
                    <p>Please Fill complete form</p>
                </div>
                <h1 className=' text-center text-4xl p-4 tracking-wider uppercase font-["SF_Pro_Rounded"] font-bold'>Work</h1>
                <div className='gap-5 flex justify-center flex-col items-center justify-center font-["SF_Pro_Text"] p-4'>
                    <div className='w-1/2'>
                        <div required>
                            <label htmlFor="Title">Task</label>
                            <input type="text" id='Title' className='bg-zinc-200 outline-none p-2 rounded-md w-full' value={Task} placeholder='Enter Task' onChange={(e) => { setTask(e.target.value) }} required />
                        </div>
                        <div required>
                            <label htmlFor="Description">Description</label>
                            <input type="text" id='Description' className='bg-zinc-200 outline-none p-2 rounded-md w-full' value={Description} placeholder='Enter Description' onChange={(e) => { setDescription(e.target.value) }} required />
                        </div>
                        <div className="dropdown">
                            <button onClick={toggleDropdown} className="dropdown-button bg-zinc-200 outline-none p-2 rounded-md w-full my-2">
                                {selectedTag ? selectedTag : 'Type of Task'}
                            </button>
                            {isOpen && (
                                <ul className="dropdown-content bg-zinc-200 outline-none text-center p-2 rounded-md w-full my-2">
                                    {tags.map((tag) => (
                                        <li key={tag} onClick={() => handleTagSelect(tag)} className='hover:bg-zinc-300 py-2'>
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div required className='w-full'>
                            <label htmlFor="Date">Date</label>
                            <input
                                type="date"
                                id="Date"
                                className="bg-zinc-200 w-full outline-none p-2 rounded-md"
                                placeholder="Enter Day (1-31)"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required />
                        </div>

                        <div required className="w-full my-2 ">
                        <label htmlFor="time">Time</label>
                            <input
                                type="time"
                                id='time'
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                className="bg-zinc-200 w-full outline-none p-2 rounded-md"
                            />
                        </div>
                        <button type="submit" className='bg-zinc-300 w-full my-2 py-2 px-3 rounded-md hover:bg-violet-500 hover:text-white transition duration-200 ease-in-out' onClick={Submit}>Submit</button>

                    </div>
                </div>
                <div className='gap-2 flex justify-center font-["SF_Pro_Rounded"] p-4'>
                    <button className={`py-2 px-3 text-${isCompleted === true ? 'zinc-800' : 'violet-500'} border-b-2 hover:text-violet-500 border-transparent hover:border-${isCompleted === false ? 'transparent' : 'violet-500'} transition duration-300 uppercase linear`} onClick={() => { setisCompleted(!isCompleted) }} >To Do</button>
                    <button className={`py-2 px-3 text-${isCompleted === false ? 'zinc-800' : 'violet-500'} border-b-2 hover:text-violet-500 border-transparent hover:border-${isCompleted === true ? 'transparent' : 'violet-500'} transition duration-300 uppercase linear`} onClick={() => { setisCompleted(!isCompleted) }}>Completed</button>
                </div>
                {isCompleted === false && AllData.map((Data, index) => {
                    return (
                        <div className='justify-center font-["SF_Pro_Rounded"] items-center my-2 flex flex-col' key={index}>
                            <div className=' w-1/2 p-3 flex justify-between bg-zinc-200  rounded-lg'>
                                <div className='w-9/12'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='text-3xl text-violet-500 font-semibold font-["SF_Pro_Text"] text-pretty truncate max-w-56 '>{Data.title}</h3>
                                        <p className='text-md text-zinc-700 text-pretty truncate '>{Data.selectedtag}</p>
                                        <p className='text-md text-zinc-700 text-pretty truncate '>{Data.date}</p>
                                    </div>
                                    <p className='text-md text-zinc-700 text-pretty truncate w-full'>{Data.Desc}</p>
                                </div>
                                <div className='flex gap-4 items-center mx-5 '>
                                    <button className="relative inline-block group justify-center" onClick={() => { handledelete(index) }}>
                                        <img src={Trash2} alt="Trash Image" className="block group-hover:opacity-0 transition-opacity duration-200 ease-in-out w-8" />
                                        <img src={Trash1} alt="Trash Image" className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out w-8" />
                                    </button>
                                    <button className="" onClick={() => { handleComplete(index) }}>
                                        <img src={Check} alt="Trash Image" className="w-8" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {isCompleted === true && complete.map((Data, index) => {
                    return (
                        <div className='justify-center font-["SF_Pro_Rounded"] items-center my-2 flex flex-col' key={index}>
                            <div className=' w-1/2 p-3 flex justify-between bg-zinc-200  rounded-lg'>
                                <div className='w-9/12'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='text-3xl text-violet-500 font-semibold font-["SF_Pro_Text"] text-pretty truncate max-w-56 '>{Data.title}</h3>
                                        <p className='text-md text-zinc-700 text-pretty truncate '>{Data.selectedtag}</p>
                                        <p className='text-md text-zinc-700 text-pretty truncate '>{Data.date}</p>
                                    </div>
                                    <p className='text-md text-zinc-700 text-pretty truncate w-full'>{Data.Desc}</p>
                                    <p className='text-md text-zinc-700 text-pretty truncate w-full'>completed on : {Data.date}</p>
                                </div>
                                <div className='flex gap-4 items-center mx-5 '>
                                    <button className="relative inline-block group justify-center" onClick={() => { handleCompletedelete(index) }}>
                                        <img src={Trash2} alt="Trash Image" className="block group-hover:opacity-0 transition-opacity duration-200 ease-in-out w-8" />
                                        <img src={Trash1} alt="Trash Image" className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out w-8" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Daily
