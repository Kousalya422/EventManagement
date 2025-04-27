import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEvent } from '../eventSlice';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
const [venue, setVenue] = useState('');
const [time, setTime] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addEvent({ title, description, date, venue,time,image }));
    navigate('/events');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }};


  return (
    <div className="max-w-96 sm:max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="sm:text-xl text-[12px] font-bold mb-6">Create Event</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2"
        required
      />
      <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
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
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
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
        className="h-[50px] rounded-[5px] text-xs xs:text-sm border border-[#D1D5DB] w-full px-2"
      ></textarea>
      <button onClick={handleSubmit} className="bg-pink-600 text-white p-2 rounded">Add Event</button>
    </div>
  );
};

export default CreateEvent;
