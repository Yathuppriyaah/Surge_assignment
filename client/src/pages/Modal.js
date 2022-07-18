/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

export default function Modal({ firstName, lastName, _id }) {
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({});

  const cancelButtonRef = useRef(null);
  const showModal = async () => {
    const { data } = await axios(`/auth/${_id}`);
    setStudent(data.user);
    setOpen(true);
  };

  return (
    <>
      <button onClick={showModal}>
        <h1 className='text-2xl font-bold'>{`${firstName} ${lastName}`}</h1>
        <p>{_id}</p>
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
          </Transition.Child>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full'>
                  <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                        <Dialog.Title
                          as='h3'
                          className='text-lg font-medium leading-6 text-gray-900'
                        >
                          <h1 className='text-3xl font-bold'>User Info</h1>
                        </Dialog.Title>
                        <div className='mt-2'>
                          <h1 className='text-lg font-medium'>
                            Name: {`${student.firstName} ${student.lastName}`}
                          </h1>
                          <h1 className='text-lg font-medium'>
                            Mobile: {`${student.mobile}`}
                          </h1>
                          <h1 className='text-lg font-medium'>
                            Email: {`${student.email}`}
                          </h1>
                          <h1 className='text-lg font-medium'>
                            Account Type: {`${student.accountType}`}
                          </h1>
                          <h1 className='text-lg font-medium'>
                            Date of Birth:{' '}
                            {`${student.dateOfBirth}`.substring(0, 10)}
                          </h1>
                          <h1 className='text-lg font-medium'>
                            Status: {`${student.status}`}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
                    <button
                      type='button'
                      className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
