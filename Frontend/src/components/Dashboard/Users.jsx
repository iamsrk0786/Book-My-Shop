import React, { useEffect , useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import {
  fetchUsers,
  DeactivateUser,
  activateUser,

} from '../redux/slices/userSlice';
import './Datagrid.css';
import {BeatLoader} from 'react-spinners'
import { Button } from '@mui/material';
import DataTable from './DataTable';

function Users() {
  const { users ,loading } = useSelector((state) => state.users);
  const [spinnerRow , setSpinnerRow] = useState({})
  const dispatch = useDispatch();
console.log(spinnerRow)
console.log(spinnerRow)
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeactivate = async (user) => {
    setSpinnerRow((prev)=>({...prev , [user._id] : true}))
    if (user.isActive) {
      await dispatch(DeactivateUser(user._id));
        setSpinnerRow((prev)=>({...prev , [user._id] : false}))
    } else {
      await dispatch(activateUser(user._id));
        setSpinnerRow((prev)=>({...prev , [user._id] : false}))
    }
    dispatch(fetchUsers());
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 150 },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.row.isActive ? 'Active' : 'Inactive'}
          color={params.row.isActive ? 'success' : 'error'}
          variant="outlined"
          sx={{
            fontSize: '11px',
          }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          onClick={() => handleDeactivate(params.row)}
          color={params.row.isActive ? 'error' : 'success'}
          variant="contained"
          sx={{
            fontSize: '11px',
          }}
        >
          {spinnerRow[params.row._id] ? <BeatLoader color='white' size={12}/> : params.row.isActive ? 'Deactivate' : 'Activate'}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="m-8">
        <div className="flex justify-between mb-4">
          <div>
            <h2>Users</h2>
            <p>
              Total Active Users: {users.filter((user) => user.isActive).length}
            </p>
          </div>
        </div>
        <DataTable rowdata={users} columns={columns} />
      </div>
    </div>
  );
}

export default Users;
