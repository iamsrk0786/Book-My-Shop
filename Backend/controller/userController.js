const User = require('../model/user');
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken')

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body)
    const { name, email, password, role } = req.body;

    const existingUser = await User.find({ email });
    console.log('existingUser' , existingUser)

const user = await User.create(req.body)
    res.status(201).json({
        user
    })

  } catch (error) {
   next(error)
  }
};

exports.login = async(req,res,next) => {
  try {
    console.log(req.body)
     const {email , password} = req.body 
     console.log(password)
     const user = await User.find({email}) ;
console.log("login",user)
//check if user exist

     if(!user){
        const error = new Error('user is not registered , Please login');
        error.statusCode = 400;
        throw error
     }


console.log("user" , user[0].isActive)
console.log(!user.isActive)

if(user[0].isActive === false){
  const error = new Error('Your account is deactivated , Please create a new account')
  error.statusCode =400;
  throw error ;
}


     const MatchPassword = await bcrypt.compare(password, user[0].password) ;

     if(!MatchPassword){
       const error = new Error('Password did not matched');
        error.statusCode = 400;
        throw error
     }
   console.log(user[0]._id , user[0].role)

     //send the token to the frontend
     const token = jwt.sign({id : user[0]._id ,role : user[0].role , name : user[0].name }, 'this-is-my-secret' , {expiresIn : '30d'})
    
   res.status(200).json({
      message : 'success' ,
      token
   })

  } catch (error) {
    next(error)
  }
}


exports.getUsers = async(req,res,next)=>{
  try {
    const users = await User.find().select('-password');
   

   if(!users){
       const error = new Error('Users not found');
       error.statusCode = 404 ;
       throw error
   }
   res.status(200).json({
       length : users.length ,
       message : 'success' ,
       users
   })
  } catch (error) {
     next(error)
  }
}

exports.deactivateUser = async(req,res,next) => {
  try{
    const {id} = req.params ;
    const user = await User.findById(id) ;
    console.log(user)
     if(!user){
       const error = new Error('Users not found');
       error.statusCode = 404 ;
       throw error
   }
  user.isActive = false ;
  console.log(user)
  await user.save()
res.status(200).json({
  user
})
  }catch(error){

  }
}

exports.activateUser = async(req,res,next) => {
  try{
    const {id} = req.params ;
    const user = await User.findById(id) ;
    console.log(user)
     if(!user){
       const error = new Error('Users not found');
       error.statusCode = 404 ;
       throw error
   }
  user.isActive = true ;
  console.log(user)
  await user.save()
res.status(200).json({
  user
})
  }catch(error){

  }
}