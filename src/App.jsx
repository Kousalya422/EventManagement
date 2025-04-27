import React from "react"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import {Routes, Route} from 'react-router-dom'
import EventList from "./pages/EventList"
import EventDetails from "./pages/EventDetails"
import Login from "./pages/Login"
import Signup from "./pages/SignUp"
import EventRegister from "./pages/EventRegister"
import CreateEvent from "./pages/CreateEvent"
import EditEvent from "./pages/EditEvent"

function App() {
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/events" element={<EventList/>}/>
        <Route path="/events/:id" element={<EventDetails/>}/>
        <Route path="/eventregister/:id" element={<EventRegister/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create" element={<CreateEvent/>}/>
        <Route path="/edit/:id" element={<EditEvent/>}/>
      </Routes>
    </>
  )
}

export default App
