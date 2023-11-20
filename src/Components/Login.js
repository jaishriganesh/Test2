import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Product_details from './Product_details';

const Login = ({viewproduct, setViewProduct, cart, setCart, quantity}) => {
    const [user, setUser] = useState("");
    const [password, setPassword] =useState("");
     const[loggedIn, setLoggedIn] = useState(false);
     const[products, setProducts] = useState("");
    
    useEffect(()=>{
getData();
    },[loggedIn])

    const getData=async ()=>{
      try{
        const response= await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
        console.log(response.data.products);
      }
      catch(err){
        console.log(err);
      }
    }
    
const handleSubmit = async (e)=>{
e.preventDefault();
const response = await axios.get("https://dummyjson.com/users");
const match = response.data.users.find((item)=>{
  return(
  item.username===user && item.password=== password
  )
})
if(match){
  console.log("log in successful", match);
  sessionStorage.setItem('loggedInUser', match);
  setLoggedIn(true);
}
else{
  console.log("not logged in");
  setLoggedIn(true);
}
}
//code start
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

// console.log("add to cart", cart)
  return (
    loggedIn?(
  <>
<h2>Login Successful</h2>
<div className='containter'>
<div className='row'>

{
  products.map((item)=>{
return(
  <div className='col-lg-3'>
<div className="card" key={item.id}>
  <img src={item.thumbnail} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{ item.title}</h5>
    <p className="card-text">{item.description}</p>
    <p>{item.price}</p>
    <div className='d-flex justify-content-between'>
    
    <div className="d-flex justify-content-between">
    <Link
      to="/productdetails"
      className="btn btn-primary"
      component={Product_details}
      onClick={() => setViewProduct(item.id)}
    >
      View
    </Link>
    <a
      href="#"
      className="btn btn-primary"
      onClick={() => handleAddToCart(item)}
    >
      Add to Cart
    </a>
  </div>
</div>
  </div>
</div>
</div>
)
  })
}

</div>
</div>
</>
):(
  <>
  <form onSubmit={handleSubmit}>
  <input type='name' value={user} onChange={(e)=>setUser(e.target.value)}/>
  <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
  <button type="submit">submit</button>
  </form>
</>
    )
  );
}

export default Login;