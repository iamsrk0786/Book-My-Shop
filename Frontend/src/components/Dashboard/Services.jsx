import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { fetchService, createService, deleteService ,updateService } from '../redux/slices/servicesSlice';
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";

import ServicesModal from './ServicesModal';
import './Datagrid.css'
import DataTable from './DataTable';
import { useForm } from 'react-hook-form';

function Services() {
  const {setValue, reset } = useForm();

  const { services } = useSelector((state) => state.service);
  const [isEdit, setIsEdit] = useState(false);

const [id , setID] = useState('')
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    reset();
    setIsEdit(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchService());
  }, []);


  const handleEdit = (data) => {
    setValue('name' , data.name)
    setValue('duration', data.duration)
    setValue('price', data.price) 
    setValue('description', data.description)
    setID(data._id)
    handleOpen()
    setIsEdit(true)
 
  };
console.log(id)
  const handleDelete = async (id) => {
    await dispatch(deleteService(id));
    await dispatch(fetchService());
  };


    const onSubmit = async(data) => {
console.log(data)
if(isEdit){
 await dispatch(updateService({id,data}))
}else{
 await dispatch(createService(data))
}
handleClose();
dispatch(fetchService())
  };



  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'duration', headerName: 'Duration', width: 130 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div className='flex gap-2 mt-3'>
          <FiEdit2 onClick={() => handleEdit(params.row)} size={24} className='cursor-pointer hover:text-lime-500' />
          <RiDeleteBin7Line onClick={() => handleDelete(params.row._id)} size={24} className='cursor-pointer hover:text-red-500 transition-all duration-150' />
        </div>
      ),
    },
  ];


  return (
    <div className='m-8'>
       <div className='flex justify-between mb-4'>
        <div>
               <h2>Services</h2>
               <p>Total Active Services : {services.length} </p>
        </div>
        <button onClick={handleOpen} className='bg-green-500 h-10 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 transition-all'>Add New</button>
      </div>
     <DataTable rowdata={services} columns={columns} />
     <ServicesModal open={open} handleClose={handleClose} isEdit={isEdit} onSubmit={onSubmit} />
    </div>
  );
}

export default Services;
