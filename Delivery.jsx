
import React, { useState } from "react";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Truck,
  Search,
  Leaf,
  CheckCircle,
} from "lucide-react";

import "./Delivery.css";


const foodItems = [
  {
    id: 1,
    name: "Red Rice & Curry",
    category: "Meals",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
    description: "",
  },
  {
    id: 2,
    name: "String Hoppers & Dhal",
    category: "Breakfast",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600",
    description: "",
  },
  {
    id: 3,
    name: "Kiribath",
    category: "Breakfast",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600",
    description: "",
  },
  {
    id: 4,
    name: "Gotukola Mallung",
    category: "Healthy",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
    description: "",
  },
  {
    id: 5,
    name: "Boiled Kadala",
    category: "Snacks",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600",
    description: "",
  },
  {
    id: 6,
    name: "Egg Hoppers",
    category: "Breakfast",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600",
    description: "",
  },
  {
    id: 7,
    name: "Fish Curry & Rice",
    category: "Meals",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=600",
    description: "",
  },
  {
    id: 8,
    name: "Fresh Fruit Bowl",
    category: "Healthy",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600",
    description: "",
  },
];

function Delivery() {
  
  const [orders, setOrders] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

 
  const [orderMessage, setOrderMessage] = useState("");

  const categories = [
    "All",
    "Meals",
    "Breakfast",
    "Healthy",
    "Snacks",
  ];

 
  const filteredItems = foodItems.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || food.category === category;

    return matchesSearch && matchesCategory;
  });

 
  const addToOrder = (food) => {
    setOrderMessage("");

    setOrders((previousOrders) => {
      const existing = previousOrders.find(
        (item) => item.id === food.id
      );

      if (existing) {
        return previousOrders.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...previousOrders,
        { ...food, quantity: 1 },
      ];
    });
  };

  
  const changeQuantity = (id, amount) => {
    setOrderMessage("");

    setOrders((previousOrders) =>
      previousOrders
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  
  const removeOrder = (id) => {
    setOrderMessage("");

    setOrders((previousOrders) =>
      previousOrders.filter((item) => item.id !== id)
    );
  };

 
  const totalItems = orders.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

 
  const subtotal = orders.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  
  const deliveryFee = subtotal > 0 ? 150 : 0;


  const total = subtotal + deliveryFee;

  const placeOrder = () => {
    if (orders.length === 0) {
      setOrderMessage(
        "."
      );
      return;
    }

    const orderDetails = orders
      .map(
        (item) =>
          `${item.name} x ${item.quantity} = LKR ${
            item.price * item.quantity
          }`
      )
      .join("\n");

    const confirmed = window.confirm(
      `:\n\n${orderDetails}\n\n` +
        ` LKR ${subtotal}\n` +
        `: LKR ${deliveryFee}\n` +
        ` LKR ${total}\n\n` +
        ``   );

    if (confirmed) {
      setOrderMessage(
        "!"
      );

      
      setOrders([]);
    }
  };

  return (
    <div className="delivery-page">
      {/* Navbar */}
      <nav className="delivery-navbar">
        <a href="/" className="delivery-logo">
          <Leaf size={25} />
          FIT<span>LIFE</span>
        </a>

        <div className="delivery-nav-links">
          <a href="/">Home</a>
          <a href="/workouts">Workouts</a>
          <a href="/nutrition">Nutrition</a>
          <a href="/delivery" className="active">
            Delivery
          </a>
        </div>

        <div className="delivery-order-indicator">
          <ShoppingBag size={20} />
          <span>Order Items: {totalItems}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="delivery-hero">
        <div className="delivery-hero-content">
          <span className="delivery-tag">
            <Leaf size={16} />
            HEALTHY FOOD, HEALTHY LIFE
          </span>

          <h1>
            Eat Better.
            <br />
            <span>Live Stronger.</span>
          </h1>

          <p>
            Choose from a variety of healthy meals tailored to your fitness goals.
          </p>

          <a
            href="#food-menu"
            className="delivery-hero-button"
          >
            Explore Menu
            <ShoppingBag size={18} />
          </a>
        </div>

        <div className="delivery-hero-image">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900"
            alt="Healthy food"
          />

          <div className="delivery-image-badge">
            <Leaf size={23} />
            <div>
              <strong>Eat Fresh</strong>
              <small>Feel Your Best</small>
            </div>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="delivery-main">
        <section className="delivery-menu-section" id="food-menu">
          <div className="delivery-section-heading">
            <div>
              <span className="delivery-tag">OUR MENU</span>
              <h2>Healthy Food Store</h2>
              <p></p>
            </div>

            <div className="delivery-search">
              <Search size={20} />

              <input
                type="text"
                placeholder="Search food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Category Buttons */}
          <div className="delivery-categories">
            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "delivery-category selected"
                    : "delivery-category"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Food Cards */}
          <div className="delivery-food-grid">
            {filteredItems.map((food) => (
              <article
                className="delivery-food-card"
                key={food.id}
              >
                <div className="delivery-food-image">
                  <img src={food.image} alt={food.name} />

                  <span className="delivery-food-category">
                    {food.category}
                  </span>
                </div>

                <div className="delivery-food-info">
                  <h3>{food.name}</h3>
                  <p>{food.description}</p>

                  <div className="delivery-food-bottom">
                    <strong>
                      LKR {food.price.toLocaleString("en-LK")}
                    </strong>

                    <button
                      className="delivery-add-button"
                      onClick={() => addToOrder(food)}
                      aria-label={`Add ${food.name} to order`}
                    >
                      <Plus size={21} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <p className="delivery-empty">No food items available.</p>
          )}
        </section>

        {/* Order Summary */}
        <aside className="delivery-order-panel">
          <div className="delivery-order-title">
            <div>
              <ShoppingBag size={23} />
              <h2>Your Order</h2>
            </div>

            <span>{totalItems} items</span>
          </div>

          {orders.length === 0 ? (
            <div className="delivery-order-empty">
              <ShoppingBag size={45} />
              <h3>No Orders Yet</h3>
              <p>
              </p>
            </div>
          ) : (
            <div className="delivery-order-items">
              {orders.map((item) => (
                <div
                  className="delivery-order-item"
                  key={item.id}
                >
                  <img src={item.image} alt={item.name} />

                  <div className="delivery-order-item-info">
                    <h4>{item.name}</h4>

                    <strong>
                      LKR{" "}
                      {(item.price * item.quantity).toLocaleString(
                        "en-LK"
                      )}
                    </strong>

                    <div className="delivery-quantity">
                      <button
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <button
                    className="delivery-remove"
                    onClick={() => removeOrder(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Price Summary */}
          <div className="delivery-price-summary">
            <div>
              <span>Subtotal</span>
              <strong>
                LKR {subtotal.toLocaleString("en-LK")}
              </strong>
            </div>

            <div>
              <span>Delivery Fee</span>
              <strong>
                LKR {deliveryFee.toLocaleString("en-LK")}
              </strong>
            </div>

            <div className="delivery-total">
              <span>Total</span>
              <strong>
                LKR {total.toLocaleString("en-LK")}
              </strong>
            </div>
          </div>

          {/* Place Order */}
          <button
            className="delivery-checkout-button"
            onClick={placeOrder}
          >
            <Truck size={20} />
            Confirm Order
          </button>

          {orderMessage && (
            <div className="delivery-order-message">
              <CheckCircle size={18} />
              <p>{orderMessage}</p>
            </div>
          )}

          <p className="delivery-secure-note">
            Healthy choices for a better you.
          </p>
        </aside>
      </main>

      {/* Footer */}
      <footer className="delivery-footer">
        <a href="/" className="delivery-logo">
          FIT<span>LIFE</span>
        </a>

        <p>Fuel your body. Improve your life.</p>
        <small>© 2026 FITLIFE. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default Delivery;
