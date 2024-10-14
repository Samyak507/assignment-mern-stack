import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [user,setUser]= useState({
    email:'', password:''
  })



  const onChangeInput = e =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }

  
  const loginSubmit = async e =>{
    e.preventDefault()

    try {
  
      await axios.post('/user/login',{...user})

      localStorage.setItem('firstLogin', true)
      
        toast.success("Login Success!!",{
          position:"top-center",
          closeOnClick: true,
          autoClose: 2000,
        })
      
     
      window.location.href = "/";


    } catch (err) {
    
      if(err.response.status===400 || err.response.status===500){
        toast.error(`${err.response.data.msg}`,{
          position:"top-center",
          closeOnClick: true,
          autoClose: 1000,
        })
      }
    }
  }

  return (
    <div className='login-page'>
    <h2>Login</h2>
    <form onSubmit={loginSubmit}>
      <input type="email" name="email" required
      placeholder="Email" value={user.email} onChange={onChangeInput}/>
      
      <input type="password" name="password" required autoComplete='on'
      placeholder="Password" value={user.password} onChange={onChangeInput} />

    <div className="row">
      <button type='submit' >Login</button>
      <NavLink to='/register'>Register</NavLink>
    </div>

    </form>
    <ToastContainer/>
    </div>
  )
  }

export default Login