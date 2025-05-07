import React, { useState, useEffect } from 'react';
import { updateEvent } from '../eventSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const EditEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const event = events.find((e) => e.id === parseInt(id));

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      setVenue(event.venue || '');
      setDate(event.date || '');
      setTime(event.time || '');
    } else {
      navigate('/events');
    }
  }, [event, navigate]);

  const handleUpdate = () => {
    if (event) {
      const updatedEvent = {
        title,
        description,
        venue,
        date,
        time,
      };

      // If image is selected, include it in the payload
      if (image) {
        // You need to update the `updateEvent` thunk to handle FormData if you're passing image.
        // This just prepares the file for that.
        updatedEvent.image = image;
      }

      dispatch(updateEvent({ id: event.id, updatedEvent }));
      navigate('/events');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set actual file, not a URL
    }
  };

  if (!event) {
    return <p>Event not found!</p>;
  }

  return (
    <div className="max-w-96 sm:max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="sm:text-xl text-[12px] font-bold mb-6">Edit Event</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2"
      />

      <input
        type="text"
        placeholder="Venue"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
        className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2"
      />

      <div className="mb-4">
        <input
          type="file"
          onChange={handleImageChange}
          className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2"
        />
        {image && <p className="text-gray-600 mt-2">Image: {image.name}</p>}
      </div>

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="h-[100px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2"
      ></textarea>

      <button onClick={handleUpdate} className="bg-pink-600 text-white p-2 rounded">
        Update Event
      </button>
    </div>
  );
};

export default EditEvent;
