import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // user creation function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/create', {
        email,
        password,
      });
      // to show success message
      toast.success('User Created. Redirecting.....');

      // to redirect user
      setTimeout(() => {
        navigate('/admin');
      }, 3000);
    } catch (error) {
      // to show error
      toast.error(error.response.data.msg);
    }
  };
  return (
    <>
      <h1 className='mb-2 text-2xl font-bold text-center mt-60'>
        Create a new User
      </h1>
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
          placeholder="User's Email"
        />

        <input
          type='password'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="User's Password"
          className='p-2 mt-4 border border-red-600 rounded-lg w-96'
        />
        <button className='py-2 mt-4 font-bold text-center text-white bg-blue-600 border-2 border-indigo-400 rounded w-96 focus:outline-none'>
          Create
        </button>
      </form>
    </>
  );
};

export default Create;
