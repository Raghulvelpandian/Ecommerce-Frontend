import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Package,
  BadgeIndianRupee
} from "lucide-react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("https://ecommerce-bowb.onrender.com/api/products/", {
        
        
      })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
   })
      .catch((err) => console.log(err));
  }, []);

  
  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>🛒 E-Commerce Store</h1>
          <p>Modern shopping experience</p>
        </div>

        <div className="cart-badge">
          <ShoppingCart size={20} />
          <span>{cart.length}</span>
        </div>
      </header>

      <div className="container">

    
        <div className="products-section">
          <div className="section-title">
            <Package />
            <h2>Products</h2>
          </div>

          <div className="products-grid">
            {products.map((p) => (
              <div key={p.id} className="product-card">

                <div className="image-box">
                  <img src={p.image} alt={p.name} />
                </div>

                <div className="product-info">
                  <h3>{p.name}</h3>

                  <div className="price-row">
                    <p className="price">
                      <BadgeIndianRupee size={16} />
                      {p.price}
                    </p>

                    <button onClick={() => addToCart(p)}>
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CART */}
        <div className="cart-section">

          <div className="cart-header">
            <ShoppingCart />
            <h2>Your Cart</h2>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>🛍 Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">

                    <div className="cart-left">
                      <img src={item.image} alt={item.name} />

                      <div>
                        <h4>{item.name}</h4>
                        <p>Qty: {item.qty}</p>
                      </div>
                    </div>

                    <div className="cart-right">
                      <h4>₹{item.price * item.qty}</h4>

                      <button
                        className="delete-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <h2>Total</h2>
                <h2>₹{total}</h2>
              </div>

              <button className="checkout-btn">
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;