import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BtnRender = ({product, deleteProduct}) => {

  const state = useContext(GlobalState)
  // const [products] = state.productsAPI.products
  const [isAdmin] = state.userAPI.isAdmin
  
  const addCart = state.userAPI.addCart

const addToast = ()=>{
  toast.success("Item added to Cart!!",{
    position: "top-center",
    closeOnClick: true,
    autoClose: 1000,
  });
}


const combinedFun = () => {
  addCart(product)
   addToast()
}



  return (
    <div className='row_btn'>
    {
      isAdmin ? 
      <>
      <NavLink id='btn_buy' to='#!' onClick={()=> deleteProduct(product._id, product.images.public_id)}>
        Delete
        </NavLink>
        <NavLink id='btn_view' to={`/edit_product/${product._id}`}>
        Edit
        </NavLink>
      </> :
      <>
      <NavLink id='btn_buy' to='#!' onClick={()=>combinedFun() } >
        Buy
        </NavLink>
        <NavLink id='btn_view' to={`/detail/${product._id}`}>
        View
        </NavLink>
      </>
    }
  <ToastContainer/>
    </div>
  )
}

export default BtnRender