const express = require('express');
const app = express() ;
require('dotenv').config() ;
const dbConnect = require('./config/db')
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json())


io.on('connection', () => { 
    console.log('user is connected')                     // on is event lisner
});

app.use((req,res,next)=>{
    req.io = io
    next()
})

dbConnect();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/api',require('./routes/userRoutes'))
app.use('/api' ,require('./routes/serviceRoute'))
app.use('/api', require('./routes/bookingRoute'))

app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        error : err.message || "Internal Server Error"
    })
})


server.listen(process.env.PORT,()=>{
    console.log(`Server is running on the port ${process.env.PORT}🚀`)
}) ;


server.on('connection', () => {
  console.log('someone connected!');
}); 