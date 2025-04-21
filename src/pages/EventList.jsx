import React, {useEffect} from "react";
import {fetchEvents } from '../eventSlice';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const EventList =() =>{
    const dispatch = useDispatch();
    const {items, status}= useSelector((state)=>state.events);

    useEffect (()=>{
        dispatch(fetchEvents());
    },[dispatch]);

    return(
        <div>
            <div className="w-full max-w-md mx-auto mt-10 flexp-4 text-gray-600 dark:text-gray-300 outline-none focus:outline-none">
            <div className="flex items-center place-self-center mt-10 relative">
            <select id="filter" name="filter" class="bg-white dark:bg-gray-800 h-10 px-3 rounded-l-full text-sm focus:outline-none outline-none border-2 border-gray-500 dark:border-gray-600 border-r-1 cursor-pointer max-h-10 overflow-y-hidden">
            <option value="" disabled selected hidden>Location</option>
    <option value="Chennai">Chennai</option>
    <option value="Banglore">Banglore</option>
    <option value="Mumbai">Mumbai</option>
  </select>
            <input type="text" placeholder="Search..." className="bg-white dark:bg-gray-800 h-10 flex px-5 w-full rounded-r-full text-sm focus:outline-none border-2 border-l-0 border-gray-500 dark:border-gray-600"></input>
  <button type="submit"className="absolute inset-y-0 right-0 mr-2 flex items-center px-2">Enter</button>
            </div>
  </div>
            <h2 className="text-2xl font-bold pt-5 mx-5">Upcoming Events</h2>
            {status == 'loading' ?(<p>Loading...</p>):(
                <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                    {items.map((events=>(
                        <Link to={`/events/${events.id }`} key={events.id} className="rounded overflow-hidden shadow-lg">
                            <img src="" alt="" className="w-full h-48 hover:bg-transparent bg-gray-900 opacity-25"/>
                            <h3 className="font-semibold text-lg px-6 pt-4">{events.title}</h3>
                            <p className="text-gray-500 text-sm px-6">Date: {events.date}</p>
                            <p className="text-gray-500 text-sm px-6 pb-4">Venue: {events.venue}</p>
                        </Link>
                    )))}
                </div>
                </div>
            )}
        </div>
    )
}

export default EventList;
