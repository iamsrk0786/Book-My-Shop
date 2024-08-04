import './Datagrid.css'
import { DataGrid } from '@mui/x-data-grid';


import React from 'react'

function DataTable({rowdata , columns}) {
  return (
    <div>
        <div style={{ height: 350, width: '100%', }}>
          <DataGrid
            rows={rowdata}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            getRowId={(row) => row._id}
            pageSizeOptions={[5, 10]}
             sx={{
            boxShadow: 2,
          
           
           
          
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
          />
        </div>
    </div>
  )
}

export default DataTable
