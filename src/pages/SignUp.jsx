import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../userSlice';
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

    dispatch(signup({ email, password }));
    navigate('/login');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Signup</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button onClick={handleSignup} className="bg-pink-600 text-white p-2 rounded">Signup</button>
    </div>
  );
};

export default Signup;