import React from "react"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import {Routes, Route} from 'react-router-dom'
import EventList from "./pages/EventList"
import EventDetails from "./pages/EventDetails"
import Login from "./pages/Login"
import Signup from "./pages/SignUp"

function App() {
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/events" element={<EventList/>}/>
        <Route path="/events/:id" element={<EventDetails/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
