import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.currentUser);

  const handleLogin = () => {
    dispatch(login({ email, password }));
    if (user) navigate('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
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
      <button onClick={handleLogin} className="bg-pink-600 text-white p-2 rounded">Login</button>
    </div>
  );
};

export default Login;