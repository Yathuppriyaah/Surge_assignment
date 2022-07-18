import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <>
      <h1 className='text-2xl font-bold text-center mt-60 '> Welcome Admin</h1>
      {/* create user button */}
      <div className='flex justify-center'>
        <Link
          to='/create'
          className='py-2 mt-4 font-bold text-center text-white bg-blue-600 border-2 border-indigo-400 rounded w-28 focus:outline-none'
        >
          Create User
        </Link>

        {/* View user button */}
        <Link
          to='/users'
          className='py-2 mt-4 ml-2 font-bold text-center text-white bg-blue-600 border-2 border-indigo-400 rounded w-28 focus:outline-none'
        >
          View Users
        </Link>
      </div>
    </>
  );
};

export default AdminHome;
