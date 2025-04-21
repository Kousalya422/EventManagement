import React, { useState } from "react";

const NavBar=()=>{
    
    return (
        <nav className="bg-pink-400 text-white p-3 flex justify-between">
            <h1 className="text-xl font-bold">Event Management</h1>
            <div className="space-x-10">
            <a href="/" className="font-semibold p-1 navitem">Home</a>

            <a href="/events" className="font-semibold p-1 navitem">Events</a>

            <a href="#" className="font-semibold p-1 navitem">Profile </a>
            </div>   
        </nav>
    )
}

export default NavBar;