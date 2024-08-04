import React from 'react'
import { useForm } from "react-hook-form";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
 


function ServicesModal({open, handleClose , onSubmit , isEdit}) {
     const { handleSubmit, register,} = useForm();
       const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  
  return (
    <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 className='text-center text-md mb-4'>{isEdit ? "Update Service" : "Add Service"}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
                <input
                  type="text"
                  {...register("name")}
                  className='mt-1 p-2 block h-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                />
              </div>
              <div>
                <label htmlFor='duration' className='block text-sm font-medium text-gray-700'>Duration</label>
                <input
                  type="text"
                  {...register("duration")}
                  className='mt-1 p-2 block h-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                />
              </div>
              <div>
                <label htmlFor='price' className='block text-sm font-medium text-gray-700'>Price</label>
                <input
                  type="number"
                  {...register("price")}
                  className='mt-1 p-2 block h-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                />
              </div>
              <div>
                <label htmlFor='description' className='block text-sm font-medium text-gray-700'>Description</label>
                <input
                  type="text"
                  {...register("description")}
                  className='mt-1 p-2 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                />
              </div>
              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='inline-flex p-2 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  {isEdit ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ServicesModal
