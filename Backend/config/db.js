const mongoose  = require('mongoose') ;
require('dotenv').config() ;
const colors = require('colors')
const dbConnect = async() =>{
    try{
    const connection = await mongoose.connect(process.env.MONGODB_URL)  ;
     console.log(colors.green('Connection is successfull').underline)
    }catch(error){
    console.log(colors.red(error))
    }
}

module.exports = dbConnect ;