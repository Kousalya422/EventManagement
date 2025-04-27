import {React, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../eventSlice';

const EventRegister = () =>{
    const {id}= useParams();
    const dispatch=useDispatch();
    const events = useSelector((state)=> state.events.selectedEvent);

    useEffect(()=>{
        dispatch(fetchEventById(id));
    },[dispatch,id]);

    return(
        <div>
            {events?(
                <div className="max-w-md mx-auto w-full p-8 space-y-8 items-center justify-center">
                    <h2 className="text-2xl place-self-center font-semibold mb-4 text-pink-600">{events.title}</h2>
                    <p className="text-md text-gray-400 place-self-center">Please fill the following details</p>
                    <form>
                    <div className="mb-4">
            <label for="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input type="text" id="name" name="name"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-pink-400" required/>
        </div>
        <div className="mb-4">
            <label for="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input type="email" id="email" name="email"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-pink-400" required/>
        </div>
        <div className="mb-4">
            <label for="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input type="tel" id="phone" name="phone"
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-pink-400" required/>
        </div>
        <div>
            <label className="block text-gray-700 font-medium mb-2">Gender?</label>
            <div className="flex px-2 w-1/3">
            <input type="radio" id="male" className="mr-2"/><label for="male" className="block text-gray-700 font-medium mb-2">
            Male</label>
            </div>
            <div className="flex px-2 w-1/3">
            <input type="radio" id="female" className="mr-2"/><label for="female" class="block text-gray-700 font-medium mb-2">
            Female</label>
            </div>
        </div>
        <div className="mt-4 place-self-center"><button
                class="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-500 focus:outline-none focus:shadow-outline"
                type="submit">
                Submit
            </button></div>
      </form>
                </div>
            ):(
                <p>Loading...</p>
            )}
        </div>
    )
}

export default EventRegister;