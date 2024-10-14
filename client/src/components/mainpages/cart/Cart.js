import React , {useContext ,useEffect,useState} from 'react'
import {GlobalState}  from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const Cart = () => {

  const state = useContext(GlobalState)
  const [cart, setCart] = state.userAPI.cart
  const [token] = state.token
  const [total, setTotal] = useState(0)
  const [isLogged] = state.userAPI.isLogged




  useEffect(()=>{
    const getTotal = () => {
      const total = cart.reduce((prev, item)=>{
        return prev + (item.price * item.quantity)
      }, 0)

      setTotal(total)
    }

    getTotal()
  },[cart])

  const addToCart = async(cart) => {
    await axios.patch('/user/addcart',{cart},{
      headers: {Authorization: token}
    })
  }

  const increment = (id) =>{
    cart.forEach(item =>{
      if(item._id=== id){
        item.quantity += 1
      }
    })

    setCart([...cart])
    addToCart(cart)

  }
  const decrement = (id) =>{
    cart.forEach(item =>{
      if(item._id=== id){
        item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
      }
    })

    setCart([...cart])
    addToCart(cart)
  }
  const removeProduct = (id) =>{
    if(window.confirm("Do you want to delete this product ?")){
      cart.forEach((item,index)=>{
        if(item._id === id){
          cart.splice(index, 1)
        }
      })

      setCart([...cart])
      addToCart(cart)
    }
  }

  const errToast = ()=>{
    
    toast.error("Login To Continue Shopping!",{
      position: "top-center",
      closeOnClick: true,
      autoClose: 1000,
    });
    // alert("Login to Continue")
    window.location.href = "/login";
  }

  const tranSuccess = async(payment) =>{
    const {paymentID , address} = payment;

    await axios.post('/api/payment', {cart, paymentID, address}, {
      headers: {Authorization: token}
    })

    setCart([])
    addToCart([])
    alert("You have successfully placed an order.")
  }

  if(cart.length === 0)
  return <h2 style={{textAlign: "center", fontSize:"5rem"}}>Cart is Empty</h2>
  return (
    <div>
    {
      cart.map(product => (
        <div className='maindiv'>
        <div className='detail cart' key = {product._id}>
      <img src={product.images.url} alt="" style={{height: "300px",width:"300px" ,objectFit:"fill",borderRadius:"10px"}} />

      <div className='box-detail'>
          <h2>{product.title}</h2>

        <h3>${product.price * product.quantity}</h3>
        <p>{product.description}</p>
        <p>{product.content}</p>
        
        <div className="amount">
          <button onClick={()=> decrement(product._id)} className='inc_dec'> - </button>
          <span>{product.quantity}</span>
          <button onClick={()=> increment(product._id)} className='inc_dec'> + </button>
        </div>
        <div className="delete" onClick={()=> removeProduct(product._id)}>X</div>
      </div>
    </div>
    </div>
      ))
    }

    <div className="total">
      <h3>Total: $ {total}</h3>
      {
        isLogged 
        ?
        <PaypalButton
        total={total}
        tranSuccess={tranSuccess}
        className="paypal"
      /> 
      :
     <button style={{background:"rgb(3,165,203)" ,
       padding:"0px 80px",
        borderRadius:"7px",
         color:"white",
          fontWeight:"600"}} onClick={()=> errToast()}>Payment
           </button>
      
      }
      
    </div>
<ToastContainer/>
    </div>
  )
}

export default Cart