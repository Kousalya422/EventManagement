import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";
import { useNavigate } from "react-router-dom";
import default_user from '../assets/default_user.png'

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.users.currentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsSidebarOpen(false)
  };

  return (
    <div>
      <nav className="mx-auto bg-pink-400 text-white p-3 flex justify-between">
        <h1 className="text-xl font-bold">Event Management</h1>
        <div className="space-x-10">
        {currentUser && (
          <div>
          <a href="/home" className="font-semibold p-1 navitem px-5">Home</a>
          <a href="/events" className="font-semibold p-1 navitem px-5">Events</a>
          
            <button onClick={() => setIsSidebarOpen(true)} className="font-semibold navitem px-5">
              Profile
            </button></div>
          )}
        </div>
      </nav>

      <div className={`fixed top-0 right-0 mt-15 px-5 pt-2 pb-5 rounded-xl w-70 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-600 mr-auto hover:text-red-500 text-2xl"
          >
            &times;
          </button>

          <img className="w-20 h-20 rounded-full object-cover bg-gray-100" alt="Profile" src={default_user}/>
          <h2 className="text-lg font-semibold mt-2">{currentUser?.user?.username || "Guest"}</h2>
          <p className="text-sm text-gray-500 mt-1">{currentUser?.user?.email || "user@example.com"}</p>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 pt-5 underline text-red-300 font-base hover:text-red-500"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
