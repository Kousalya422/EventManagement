import {React, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../eventSlice';

const EventDetails=()=>{
    const {id}= useParams();
    const dispatch=useDispatch();
    const events = useSelector((state)=> state.events.selectedEvent);

    useEffect(()=>{
        dispatch(fetchEventById(id));
    },[dispatch,id]);

    return(
        <div>
            {events?(
                <div>
                    <h2>{events.title}</h2>
                    <p>Date:{events.date}</p>
                    <a href="" className="bg-pink-600">Register</a>
                </div>
            ):(
                <p>Loading event details...</p>
            )}
        </div>
    )
}

export default EventDetails