import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Product_details = ({ viewproduct, product, setProduct, quantity, setQuantity, cart, setCart}) => {

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  useEffect(()=>{
    getProduct();
  },[viewproduct])

const getProduct=async()=>{
  try{
  const response = await axios.get("https://dummyjson.com/products")
  const match = response.data.products.filter((item) => item.id === viewproduct);
  setProduct(match);

console.log(match);
}
catch(err) {
  console.log(err);
}
}
const handleDecrement=()=>{
  if(quantity>1){
    setQuantity(quantity-1);

  }
}
const handleIncrement=()=>{
setQuantity(quantity+1);
}
console.log("cart", cart);
  console.log("view------", viewproduct);
  return (
    <>
      <div className='container'>
        <div className='row'>
          {product ? (product.map((item) => {
            return (
              <div className='col-6' key={item.id}>
                <div className="card" style={{ width: '18rem' }}>
                  <img src={item.thumbnail} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <div className='d-flex justify-content-between pb-3'>
                    <button className='btn btn-primary' onClick={handleDecrement}>-</button>
                    <div>{quantity}</div>
                    <button className='btn btn-primary' onClick={handleIncrement}>+</button>
                    </div>
                    <div className="d-flex justify-content-between">
                    <a href="#" className="btn btn-sm btn-primary">
                      Favourite
                    </a>
                    <a
                      href="#"
                      className="btn btn-sm btn-primary"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </a>
                    <a href="#" className="btn btn-sm btn-primary">
                      Checkout
                    </a>
                  </div>
                    <div>Price: {quantity*item.price}</div>
                  </div>
                </div>
              </div>
            )
          })) : null
          }
        </div>
      </div>
    </>
  );
}

export default Product_details;
 