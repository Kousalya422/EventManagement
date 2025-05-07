import React, { useState, useEffect } from 'react';
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

  const { currentUser, error } = useSelector(state => state.users);

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    const result = await dispatch(signup({ username, email, password }));
  
    if (signup.fulfilled.match(result)) {
      navigate('/');  
    }
  };  

  return (
    <div className="flex">
      <form
        className="max-w-md mx-auto w-full p-8 space-y-8 items-center justify-center shadow-lg mt-10"
        onSubmit={handleSignup}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            dispatch(clearError());
            setUsername(e.target.value);
          }}
          required
          className="h-10 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-pink-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            dispatch(clearError());
            setEmail(e.target.value);
          }}
          required
          className="h-10 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-pink-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            dispatch(clearError());
            setPassword(e.target.value);
          }}
          required
          className="h-10 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-pink-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="h-10 w-full border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-pink-500"
        />

        <button
          type="submit"
          className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-700 rounded-md shadow-lg font-semibold transition duration-200"
        >
          Sign Up
        </button>

        <div className="text-center text-gray-500">
          Already have an account?
          <a className="text-blue-400 hover:underline ml-1" href="/login">
            Log In
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
