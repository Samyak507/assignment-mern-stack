import React,{useContext, useState} from 'react';
import {GlobalState} from "../../GlobalState";
import Menu from './icon/menu.svg';
import Close from './icon/close.svg';
import Cart from './icon/cart.svg';
// import Cart from './icon/opencart.svg';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Header = () => {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu , setMenu] = useState(false)

  

    const logoutUser = async() =>{
      await axios.get('/user/logout')

      localStorage.removeItem('firstLogin')
     
        toast.success("Logged you out!!",{
          position:"top-center",
          closeOnClick: true,
          autoClose: 1500,
        })
      
     window.location.href = "/";

     
    }
    

    const adminRouter = () => {
      return(
        <>
          <li onClick={()=> setMenu(!menu)}><NavLink to = '/create_product'>Create Product</NavLink></li>
          <li onClick={()=> setMenu(!menu)}><NavLink to = '/category'>Categories</NavLink></li>
        </>
      )
    }

    const loggedRouter = () => {
      return(
        <>
          <li onClick={()=> setMenu(!menu)}><NavLink to = '/history'>History</NavLink></li>
          <li onClick={()=> setMenu(!menu)}><NavLink to = '/' onClick={logoutUser} >LogOut</NavLink></li>
        </>
      )
    }

 

  
    const styleMenu = {
      left : menu ? 0 : "-100%"
    }

  return (
    <header>
    
    <div className='menu' onClick={()=> setMenu(!menu)}>
        <img src = {Menu} alt="" width="30" style={{marginLeft:"10px"}} />
    </div>

    <div className='logo'>
      <h1>
      <NavLink to= '/'>{isAdmin ? 'Admin' : 'Wish N Buy'}</NavLink>
      </h1>
    </div>

    <ul style={styleMenu}>
      <li onClick={()=> setMenu(!menu)}><NavLink to = "/">{isAdmin ? 'Products' : 'Shop'}</NavLink></li>

    {isAdmin && adminRouter()}
    {
      isLogged ? loggedRouter() : <li onClick={()=> setMenu(!menu)}><NavLink to = "/login">Login * Register</NavLink></li>
    }

      <li onClick={()=> setMenu(!menu)}>
        <img src={Close} alt="" width="30" className='menu'/>
      </li>
    </ul>

    {
      isAdmin ? '' 
      : <div className='cart-icon'>
      <span>{cart.length}</span>
      <NavLink to="/cart">
        <img src={Cart} alt="" width="30"/>
      </NavLink>
    </div>
    }
  
    </header>
  )
}

export default Header