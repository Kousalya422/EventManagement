import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, error, status } = useSelector((state) => state.users);

  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      localStorage.setItem('token', result.payload.token); 
      navigate('/home');
    }
  };

  return (
    <form
      className="max-w-md w-full p-8 mt-10 space-y-8 shadow-2xl mx-auto"
      onSubmit={handleLogin}
    >
      <h1 className="text-center text-2xl font-extrabold">Login</h1>

      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
      
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

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <input
            className="form-checkbox h-4 w-4 text-purple-600 border-gray-300 rounded"
            type="checkbox"
          />
          <span className="ml-2">Remember me</span>
        </div>
        <a className="hover:underline" href="#">
          Forgot your password?
        </a>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-700 rounded-md shadow-lg font-semibold transition duration-200"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Logging in...' : 'Login'}
      </button>

      <div className="text-center text-gray-500">
        Don't have an account?
        <a className="text-blue-400 hover:underline ml-1" href="/signup">
          Sign up
        </a>
      </div>
    </form>
  );
};

export default Login;
