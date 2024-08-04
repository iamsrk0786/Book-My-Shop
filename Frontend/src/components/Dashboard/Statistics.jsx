import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useSelector  , useDispatch} from 'react-redux';
import { fetchService } from '../redux/slices/servicesSlice';
import { fetchUsers } from '../redux/slices/userSlice';

function Statistics() {
  const { users } = useSelector((state) => state.users);
  const { services } = useSelector((state) => state.service);
const dispatch = useDispatch()
  const activeUsersCount = users.filter((user) => user.isActive).length;
  const inactiveUsersCount = users.length - activeUsersCount;

  useEffect(()=>{
    dispatch(fetchService())
    dispatch(fetchUsers())
  })
 
  const pieData = [
    { name: 'Active Users', value: activeUsersCount },
    { name: 'Inactive Users', value: inactiveUsersCount },
  ];

  const COLORS = ['#4caf50', '#f44336'];

  return (
    <Box className="m-8">
      <Box className="flex gap-8">
     
        <Card sx={{ width: '50%', p: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Status Distribution
            </Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>

       
        <Card sx={{ width: '50%', p: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Total Users: {users.length}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Total Services: {services.length}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Statistics;
