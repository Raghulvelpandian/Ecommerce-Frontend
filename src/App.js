import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // FETCH PRODUCTS (WITH TOKEN)
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("https://your-app.up.railway.app/api/products/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setProducts(res.data))
    .catch(err => console.log(err));
  }, []);

  // ADD TO CART
  const addToCart = (product) => {
    const exist = cart.find(item => item.id === product.id);

    if (exist) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>

      
      <div className="header">
        <h1>🛒 E-Commerce</h1>
        <p>Simple Store</p>
      </div>

      <div className="main">

        
        <div className="products">
          {products.map(p => (
            <div key={p.id} className="card">
              <img src={p.image} alt="" />
              <h3>{p.name}</h3>
              <p className="price">₹{p.price}</p>

              <button onClick={() => addToCart(p)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        
        <div className="cart">
          <h2>🛍 Cart</h2>

          {cart.length === 0 && <p>No items</p>}

          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <p>{item.name}</p>
                <small>Qty: {item.qty}</small>
              </div>

              <div>
                <p>₹{item.price * item.qty}</p>
                <button onClick={() => removeFromCart(item.id)}>❌</button>
              </div>
            </div>
          ))}

          <h3>Total: ₹{total}</h3>
        </div>

      </div>
    </div>
  );
}

export default App;