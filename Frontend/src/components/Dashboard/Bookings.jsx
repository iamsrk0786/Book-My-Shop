import React, { useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookings} from '../redux/slices/bookingsSlice';


import './Datagrid.css'
import DataTable from './DataTable';

function Bookings() {

  const { booking } = useSelector((state) => state.Booking);
  
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);





  const columns = [
    { field: 'userId', headerName: 'UserId', width: 200 },
    { field: 'serviceId', headerName: 'ServiceId', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'time', headerName: 'Time', width: 130 },
    // {
    //   field: 'actions',
    //   headerName: 'Actions',
    //   width: 200,
    //   renderCell: (params) => (
    //     <div className='flex gap-2 mt-3'>
    //       <FiEdit2 onClick={() => handleEdit(params.row)} size={24} className='cursor-pointer hover:text-lime-500' />
    //       <RiDeleteBin7Line onClick={() => handleDelete(params.row._id)} size={24} className='cursor-pointer hover:text-red-500 transition-all duration-150' />
    //     </div>
    //   ),
    // },
  ];


  return (
    <div className='m-8'>
       <div className='flex justify-between mb-4'>
        <div>
               <h2>Bookings</h2>
               <p>Total Bookings : {booking.length} </p>
        </div>
        {/* <button onClick={handleOpen} className='bg-green-500 h-10 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 transition-all'>Add New</button> */}
      </div>
     <DataTable rowdata={booking} columns={columns} />
    </div>
  );
}

export default Bookings;
