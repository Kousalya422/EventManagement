import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventById } from '../eventSlice';

const EventDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const event = useSelector((state) => state.events.selectedEvent);

    useEffect(() => {
        dispatch(fetchEventById(id));
    }, [dispatch, id]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            {event ? (
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className='h-[460px] rounded-lg bg-gray-300 mb-4'>
                    <img src={event.image || '/default-image.jpg'} alt={event.title} className="w-lg h-full object-cover" /></div>
                    <div className="p-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h2>
                        <p className="text-gray-700 text-base mb-2">{event.description}</p>
                        <p className="text-gray-600 text-sm">Date: {event.date}</p>
                        <p className="text-gray-600 text-sm">Time: {event.time}</p>
                        <p className="text-gray-600 text-sm mb-6">Venue: {event.venue}</p>

                        <a
                            href={`/eventregister/${event.id}`}
                            className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition duration-200"
                        >
                            Register
                        </a>
                    </div>
                </div>
            ) : (
                <p>Loading event details...</p>
            )}
        </div>
    );
};

export default EventDetails;
