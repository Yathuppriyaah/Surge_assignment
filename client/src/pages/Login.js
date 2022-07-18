import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // function to login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });
      toast.success('Login Successfully.Redirecting.....');

      setTimeout(() => {
        if (data?.user?.accountType === 'admin') {
          navigate('/admin');
        } else {
          navigate(`/update/${data?.user?._id}`);
        }
      }, 3000);
      // save token to the localstorage
      localStorage.setItem('token', JSON.stringify(data.token));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <>
      <h1 className='mb-2 text-2xl font-bold text-center mt-60'>Login</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center '
      >
        <input
          type='email'
          value={email}
          required
          className='p-2 border border-red-600 rounded-lg w-96'
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Please Enter Your Email'
        />

        <input
          type='password'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Please Enter Your Password'
          className='p-2 mt-4 border border-red-600 rounded-lg w-96'
        />
        <button className='py-2 mt-4 font-bold text-center text-white bg-blue-600 border-2 border-indigo-400 rounded w-96 focus:outline-none'>
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
