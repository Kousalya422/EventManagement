import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearError } from '../userSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = () => {
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }

    dispatch(signup({username, email, password}));

    navigate('/login');
  };

  return (
    <div className='flex'>
    <form className="max-w-md mx-auto w-full p-8 space-y-8 items-center justify-center" onSubmit={handleSignup}>
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {dispatch(clearError());
          setUsername(e.target.value);}}
        className="h-10 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-pink-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {dispatch(clearError());
          setEmail(e.target.value);}}
        className="h-10 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-pink-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {dispatch(clearError());
          setPassword(e.target.value);}}
        className="h-10 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-pink-500"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="h-10 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-pink-500"
      />
      <button type='submit' className="py-2 px-4 bg-pink-500 hover:bg-pink-700 rounded-md shadow-lg font-semibold transition duration-200">Signup</button>
      <div className="text-gray-500 -mt-5">Already have an account? 
    <a className="text-blue-400 hover:underline" href="/login"> Log In</a></div>
    </form>
    </div>
  );
};

export default Signup;