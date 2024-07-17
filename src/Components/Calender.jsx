import React, { useState } from 'react';
import dayjs from 'dayjs';

const Calendar = () => {
    const today = dayjs();
    const [currentDate, setCurrentDate] = useState(today);

    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const daysInMonth = endOfMonth.date();

    const handlePrevMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };

    const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };

    const handlePrevYear = () => {
        setCurrentDate(currentDate.subtract(1, 'year'));
    };

    const handleNextYear = () => {
        setCurrentDate(currentDate.add(1, 'year'));
    };

    const generateCalendar = () => {
        const calendar = [];
        const startDay = startOfMonth.day();
        for (let i = 0; i < startDay; i++) {
            calendar.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            calendar.push(i);
        }
        return calendar;
    };

    const calendarDays = generateCalendar();

    return (
        <div className="max-w-xl  mx-auto flex flex-col w-full p-4 shadow-lg rounded-lg">
            <div className="flex justify-between mb-2 gap-3">
                <button onClick={handlePrevYear} className="px-2 py-1 bg-gray-200 rounded ">&#11207;&#11207; Year</button>
                <button onClick={handlePrevMonth} className="px-2 py-1 bg-gray-200 rounded">&#11207; Month</button>
                <div className="text-lg font-bold">{currentDate.format('MMMM YYYY')}</div>
                <button onClick={handleNextMonth} className="px-2 py-1 bg-gray-200 rounded">Month &#11208;</button>
                <button onClick={handleNextYear} className="px-2 py-1 bg-gray-200 rounded">Year &#11208;&#11208;</button>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center font-semibold">{day}</div>
                ))}
                {calendarDays.map((day, index) => (
                    <div
                        key={index}
                        className={`h-10 flex items-center justify-center rounded ${day && dayjs(currentDate).date(day).isAfter(today, 'day') ? 'bg-zinc-500 text-white' : 'bg-gray-200'} ${day && dayjs(currentDate).date(day).isSame(today, 'day') ? 'bg-violet-500 text-white' : ''}`}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
