import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [user,setUser]= useState({
   name:'', email:'', password:''
  })

  const onChangeInput = e =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value})
  }

  const regToast = () => {
toast.success("Registration Success!!",{
  position:"top-center",
  closeOnClick: true,
  autoClose: 1000,
})
//eheee
}

  const registerSubmit = async e =>{
    e.preventDefault()

    try {
      await axios.post('/user/register',{...user})

      // localStorage.setItem('firstLogin', true)
      window.location.href = "/login";


    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div className='login-page'>
    <form onSubmit={registerSubmit}>
    <h2>Register</h2>
    <input type="text" name="name" required
      placeholder="Name" value={user.name} onChange={onChangeInput}/>

      <input type="email" name="email" required
      placeholder="Email" value={user.email} onChange={onChangeInput}/>
      
      <input type="password" name="password" required autoComplete='on'
      placeholder="Password" value={user.password} onChange={onChangeInput} />

    <div className="row">
      <button type='submit' onClick={regToast}>Register</button>
      <NavLink to='/login'>Login</NavLink>
    </div>

    </form>
    <ToastContainer/>
    </div>
  )
}

export default Register