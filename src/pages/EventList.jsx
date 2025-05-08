import React, { useEffect, useState } from "react";
import delete_item from '../assets/delete.png';
import edit_item from '../assets/edit.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, deleteEventAPI } from '../eventSlice';

const EventList = () => {
  const dispatch = useDispatch();
  const { items = [], status, error } = useSelector((state) => state.events || {});
  const { currentUser } = useSelector((state) => state.users || {});
  const [searchTerm, setSearchTerm] = useState("");

  const userRole = currentUser?.user?.role?.toLowerCase();
  console.log("🔍 Current user:", currentUser);
  console.log("🔍 User role:", userRole);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filteredEvents = items.filter((event) => {
    const title = event.title || "";
    const venue = event.venue || "";
    const search = searchTerm.toLowerCase();
    return title.toLowerCase().includes(search) || venue.toLowerCase().includes(search);
  });


  if (!currentUser) {
    return <p className="text-center mt-10 text-gray-500">Loading user info...</p>;
  }

  return (
    <div>
      <div className="flex justify-end p-4">
        {(userRole === 'organizer' || userRole === 'admin') && (
          <Link to="/create" className="text-pink-600 underline p-2 rounded">
            Create Event
          </Link>
        )}
      </div>

      <div className="relative flex justify-center items-center w-85 mx-auto mt-4">
        <input
          className="w-full border h-12 shadow p-4 rounded-full"
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <h2 className="text-2xl font-bold pt-5 mx-5">Upcoming Events</h2>

      {status === 'loading' ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
            {filteredEvents.length === 0 ? (
              <p>No events found for your search criteria.</p>
            ) : (
              filteredEvents.map((event) => (
                <div className="shadow-lg hover:-translate-y-0.5" key={event.id}>
                  <Link to={`/events/${event.id}`} className="rounded overflow-hidden shadow-lg">
                    <img
                      src={event.image || ""}
                      alt={event.title}
                      className="w-full h-48 bg-transparent"
                    />
                    <h3 className="font-semibold text-lg px-6 pt-4">{event.title}</h3>
                    <p className="text-gray-500 text-sm px-6">Date: {event.date}</p>
                    <p className="text-gray-500 text-sm px-6">Venue: {event.venue}</p>
                  </Link>

                  {(userRole === 'organizer' || userRole === 'admin') && (
                    <div className="flex px-6 py-4">
                      <Link to={`/edit/${event.id}`}>
                        <img src={edit_item} alt="edit" className="cursor-pointer" />
                      </Link>
                      <button 
                        onClick={() => dispatch(deleteEventAPI(event.id))}
                        className="ml-4 cursor-pointer"
                      >
                        <img src={delete_item} alt="delete" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
