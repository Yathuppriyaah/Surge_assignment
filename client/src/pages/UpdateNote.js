import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  // /function to update a note
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/notes/${id}`, {
        title,
        description,
      });
      toast.success('Note Updated. Redirecting.....');
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
        Update a Note
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
          Update
        </button>
      </form>
    </>
  );
};

export default UpdateNote;
