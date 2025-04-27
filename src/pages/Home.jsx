import React from 'react'
import discover from '../assets/discover.png'
import create from '../assets/create.png'
import connect from '../assets/connect.png'

const Home=()=>{
    
    return (
        <>
        <div className="bg-[url(src/assets/background.png)] h-80 bg-cover bg-center">
            <div className='pt-25'>
            <h2 className='font-bold text-2xl place-self-center text-white'>Discover, Create and Connect</h2>
            <p className='text-gray-300 text-lg mt-3 place-self-center'>Your platform for unforgettable experiences!</p>
            <a href="/events" className='flex place-self-center py-3 mt-3 relative text-base rounded-xl bg-pink-600 px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-pink-500 hover:shadow-lg hover:-translate-y-0.5 hover:shadow-gray-600/30'>Get Started</a>
            </div>  
        </div>
        <div>
            <h2 className='text-2xl font-bold text-center pt-10'>Why use our platform</h2>
            <div className='grid gap-14 md:grid-cols-3 md:gap-5 mt-15 mx-2 pb-5'>
                <div className='bg-white rounded-lg p-5 shadow-md border'>
                <div className="mx-auto flex h-14 w-14 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40"><img src={discover}className='h-10 w-10'></img></div>
                    <h3 className='text-darken mb-3 text-xl font-medium place-self-center'>Discover Amazing Events</h3>
                    <p className='text-gray-600 text-base place-self-center'> Our platform makes it easy to discover a wide variety of events tailored to your interests. Whether you're into concerts, workshops, or community gatherings, you’ll find experiences that inspire and excite you, all in one place.</p>
                </div>
                <div className='bg-white rounded-lg p-5 shadow-md border'>
                <div className="mx-auto flex h-14 w-14 -translate-y-12 transform items-center justify-center rounded-full bg-rose-500 shadow-lg shadow-rose-500/40"><img src={create}className='h-10 w-10'></img></div>
                    <h3 className='text-darken mb-3 text-xl font-medium place-self-center'>Create Unforgettable Events</h3>
                    <p className='text-gray-600 text-base place-self-center'>With our simple-to-use event creation tools, anyone can plan and host an event with ease. Customize every aspect of your event—from tickets to themes—making it a memorable experience for your attendees. Whether you're hosting a small workshop or a large-scale conference, we’ve got you covered.</p>
                </div>
                <div className='bg-white rounded-lg p-5 shadow-md border'>
                <div className="mx-auto flex h-14 w-14 -translate-y-12 transform items-center justify-center rounded-full bg-sky-500 shadow-lg shadow-sky-500/40"><img src={connect}className='h-10 w-10'></img></div>
                    <h3 className='text-darken mb-3 text-xl font-medium place-self-center'>Connect with Like-minded People</h3>
                    <p className='text-gray-600 text-base place-self-center'>Our platform connects you with people who share your passions and interests. Engage with fellow attendees before, during, and after the event, and even network with potential collaborators or friends. Creating, attending, and connecting has never been this seamless.</p>
                </div>
            </div>
            </div>
        </>
    )
}

export default Home