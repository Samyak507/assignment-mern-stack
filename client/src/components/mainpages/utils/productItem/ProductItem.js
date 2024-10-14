import React, { useEffect, useState } from 'react';
import BtnRender from './BtnRender';
import axios from 'axios';

const ProductItem = ({ product, isAdmin, deleteProduct, handleCheck }) => {
  const [viewCount, setViewCount] = useState(product.views);

  useEffect(() => {
    const updateViews = async () => {
      try {
        // Send the request to update views and get the updated view count from the response
        const res = await axios.post(`/api/products/${product._id}`, {
          oldViews: product.views
        });

        // Set the updated view count from the server response
        setViewCount(res.data.views); // Update state with new views from the response
      } catch (err) {
        console.log(err);
      }
    };

    // Call the function to update the views only once on component load
    updateViews();
  }, [product._id]); // Dependency array with product ID

  return (
    <div className='product_card'>
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>$ {product.price}</span>
        <span> Viewed {viewCount}</span> {/* Updated view count displayed here */}
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
};

export default ProductItem;
