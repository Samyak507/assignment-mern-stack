import React,{useContext, useState, useEffect} from 'react';
import {useParams, NavLink} from 'react-router-dom';
import {GlobalState} from '../../../GlobalState';
import ProductItem from '../utils/productItem/ProductItem'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailProduct = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(()=>{
      if(params.id){
        products.forEach(product =>{
          if(product._id=== params.id) setDetailProduct(product)  ;    
        })
      }
    },[params.id,products])
    // console.log(detailProduct);
 

    if(detailProduct.length===0) return null;


    const buyToast=()=>{
      toast.success("Item Added to Cart!!",{
        position:"top-center",
        closeOnClick: true,
        autoClose: 1000,
      })
    }

  

    const buyFun =()=>{
      addCart(detailProduct)
      buyToast()
    }

  return (
    <>
    <div className='main'>
    <div className='detail'>
      <img src={detailProduct.images.url} alt="" />
      <div className='box-detail'>
        <div className='row'>
          <h2>{detailProduct.title}</h2>
          <h6>#ID: {detailProduct.product_id}</h6>
        </div>
        <span>${detailProduct.price}</span>
        <p>{detailProduct.description}</p>
        <p>{detailProduct.content}</p>
        <p>Sold: {detailProduct.sold}</p>
        
    
        <NavLink to="#!" className="cart"
        onClick ={()=> buyFun() } >
        Buy Now
        </NavLink>
        
        </div>
      </div>
    </div>

    <div>
      <h2 id="related">Related Products</h2>
      <div className='products'>
        {
          products.map(product=>{
            return product.category===detailProduct.category
            ? <ProductItem key={product._id} product={product}/> :null
          })
        }
      </div>
    </div>
<ToastContainer/>
    </>
  )
}

export default DetailProduct;