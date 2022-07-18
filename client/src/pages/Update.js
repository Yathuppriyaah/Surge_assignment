import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();

  // function to update a user info
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/auth/${id}`, {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        mobile,
        status,
      });
      toast.success('Updated Successfully.Redirecting.....');
      setTimeout(() => {
        navigate('/notes');
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <>
      <h1 className='mt-40 mb-2 text-2xl font-bold text-center '>
        Update Info
      </h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center '
      >
        <input
          type='text'
          value={firstName}
          required
          className='p-2 border border-red-600 rounded-lg w-96'
          onChange={(e) => setFirstName(e.target.value)}
          placeholder='Enter Your First Name'
        />

        <input
          type='text'
          value={lastName}
          required
          onChange={(e) => setLastName(e.target.value)}
          placeholder='Enter Your Last Name'
          className='p-2 mt-4 border border-red-600 rounded-lg w-96'
        />
        <input
          type='email'
          value={email}
          required
          className='p-2 mt-4 border border-red-600 rounded-lg w-96'
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Your Email'
        />
        <input
          type='password'
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Your Password'
          className='p-2 mt-4 border border-red-600 rounded-lg w-96'
        />
        <input
          type='number'
          value={mobile}
          required
          className='p-2 mt-4 border border-red-600 rounded-lg w-96'
          onChange={(e) => setMobile(e.target.value)}
          placeholder='Enter Your Mobile'
        />

        <input
          type='text'
          value={status}
          required
          className='p-2 mt-4 border border-red-600 rounded-lg w-96'
          onChange={(e) => setStatus(e.target.value)}
          placeholder='Enter Your Status'
        />

        <input
          type='date'
          value={dateOfBirth}
          required
          className='p-2 mt-4 border border-red-600 rounded-lg w-96'
          onChange={(e) => setDateOfBirth(e.target.value)}
          placeholder='Enter Your Date of Birth'
        />

        <button className='py-2 mt-4 font-bold text-center text-white bg-blue-600 border-2 border-indigo-400 rounded w-96 focus:outline-none'>
          Update
        </button>
      </form>
    </>
  );
};

export default Update;
