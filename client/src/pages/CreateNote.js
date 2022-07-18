import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // get token from the localstorage
  const token = JSON.parse(localStorage.getItem('token'));

  // to create note
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/notes/create',
        {
          title,
          description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Note Created. Redirecting.....');
      setTimeout(() => {
        navigate('/notes');
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <>
      <h1 className='mb-2 text-2xl font-bold text-center mt-60'>
        Create a new Note
      </h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center justify-center '
      >
        <input
          type='text'
          value={title}
          required
          className='p-2 border border-red-600 rounded-lg w-96'
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter Title'
        />

        <input
          type='text'
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter Description'
          className='p-2 mt-4 border border-red-600 rounded-lg w-96'
        />
        <button className='py-2 mt-4 font-bold text-center text-white bg-blue-600 border-2 border-indigo-400 rounded w-96 focus:outline-none'>
          Create
        </button>
      </form>
    </>
  );
};

export default CreateNote;
