
import React, { useMemo, useState } from "react";
import "./Delivery.css";
import productImage from "../images/images.jpeg";
import fitnessProductImage from "../images/fitness-product.jpg";
import fitnessProductImage2 from "../images/fitness-product-2.jpeg";
import fitnessProductImage3 from "../images/fitness-product-3.jpeg";
import fitnessProductImage10 from "../images/fitness-product-10.jpeg";
import fitnessProductImage4 from "../images/fitness-product-4.jpeg";
import fishRiceRecipe from "../images/fish-rice-recipe.jpg";
import fitnessProductImage5 from "../images/fitness-product-5.jpeg";
import fitnessProductImage11 from "../images/fitness-product-11.jpeg";
import fitnessProductImage12 from "../images/fitness-product-12.jpeg";
import fitnessProductImage13 from "../images/fitness-product-13.jpeg";
import fitnessProductImage6 from "../images/fitness-product-6.jpeg";
import fitnessProductImage7 from "../images/fitness-product-7.jpeg";
import fitnessProductImage9 from "../images/fitness-product-9.jpeg";
import fitnessProductImage8 from "../images/fitness-product-8.jpeg";

import fitnessProductImage14 from "../images/fitness-product-14.jpeg";
const products = [
  {
    id: 1,
    name: "Red Rice & Curry",
    category: "Meals",
    price: 650,
    image: productImage,
  },
  {
    id: 2,
    name: "String Hoppers & Dhal",
    category: "Breakfast",
    price: 350,
    image: fitnessProductImage,
  },
  {
    id: 3,
    name: "Kiribath",
    category: "Breakfast",
    price: 300,
     image: fitnessProductImage2,
  },
  {
    id: 4,
    name: "Gotukola Mallung",
    category: "Healthy",
    price: 200,
   image: fitnessProductImage3,
  },
  {
    id: 5,
    name: "Boiled Kadala",
    category: "Snacks",
    price: 180,
   image: fitnessProductImage4,
  },
  {
    id: 6,
    name: "Egg Hoppers",
    category: "Breakfast",
    price: 250,
   image: fitnessProductImage10,
  },
  {
    id: 7,
    name: "Fish Curry & Rice",
    category: "Meals",
    price: 500,
   image: fishRiceRecipe,
  },
  {
    id: 8,
    name: "Fresh Fruit Bowl",
    category: "Healthy",
    price: 300,
    image: fitnessProductImage5,
  },
  {
    id: 9,
    name: "Whey Protein",
    category: "Supplements",
    price: 8500,
   image: fitnessProductImage11,
  },
  {
    id: 10,
    name: "Fitness Watch",
    category: "Accessories",
    price: 25700,
    image: fitnessProductImage12,
  },
  {
    id: 11,
    name: "Dumbbells",
    category: "Equipment",
    price: 4500,
   image: fitnessProductImage13,
  },
  {
    id: 12,
    name: "Yoga Mat",
    category: "Equipment",
    price: 2500,
    image: fitnessProductImage6,
  },
  {
    id: 13,
    name: "Resistance Bands",
    category: "Equipment",
    price: 1800,
    image: fitnessProductImage7,

  },
  {
    id: 14,
    name: "Skipping Rope",
    category: "Equipment",
    price: 1200,
    image: fitnessProductImage8,
  },
  {
    id: 15,
    name: "Gym Gloves",
    category: "Accessories",
    price: 2200,
    image: fitnessProductImage9,
  },
  {
    id: 16,
    name: "Shaker Bottle",
    category: "Accessories",
    price: 950,
    image: fitnessProductImage14,
  },
];

const categories = [
  "All",
  "Meals",
  "Breakfast",
  "Healthy",
  "Snacks",
  "Supplements",
  "Equipment",
  "Accessories",
];

function Delivery() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const money = (amount) =>
    `LKR ${amount.toLocaleString("en-LK")}`;

  // Search products and filter by category
  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase().trim();

    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch =
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  // Add a product to the cart
  const addToOrder = (product) => {
    setMessage("");

    setOrders((previousOrders) => {
      const existing = previousOrders.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousOrders.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousOrders, { ...product, quantity: 1 }];
    });
  };

  // Increase or decrease product quantity
  const changeQuantity = (id, amount) => {
    setMessage("");

    setOrders((previousOrders) =>
      previousOrders
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove a product from the cart
  const removeItem = (id) => {
    setMessage("");

    setOrders((previousOrders) =>
      previousOrders.filter((item) => item.id !== id)
    );
  };

  // Calculate order totals
  const subtotal = orders.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal === 0 ? 0 : 300;
  const total = subtotal + deliveryFee;

  // Submit order to the backend
  const confirmOrder = async (event) => {
    event.preventDefault();
    setMessage("");

    if (orders.length === 0) {
      setMessage("Please add products to your order first.");
      return;
    }

    if (
      !customerName.trim() ||
      !phone.trim() ||
      !address.trim()
    ) {
      setMessage(
        "Please enter your name, phone number and address."
      );
      return;
    }

    const token = localStorage.getItem("fitlife-token");

    if (!token) {
      setMessage("Please log in before placing an order.");
      return;
    }

    const payload = {
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items: orders.map(({ id, quantity }) => ({
        productId: id,
        quantity,
      })),
    };

    try {
      setIsSubmitting(true);

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const contentType =
        response.headers.get("content-type") || "";

      const result = contentType.includes("application/json")
        ? await response.json()
        : {
            message:
              "Unexpected response from the server. Check your backend route.",
          };

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        setMessage(
          "Your login session may have expired. Please log in again."
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Could not place your order."
        );
      }

      setMessage(
        `Order placed successfully! Order ID: ${
          result.order?._id ||
          result.orderId ||
          "confirmed"
        }`
      );

      setOrders([]);
      setCustomerName("");
      setPhone("");
      setAddress("");
    } catch (error) {
      setMessage(
        error.message ||
          "Unable to connect to the backend. Check that the server is running."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="delivery-page">
      {/* NAVBAR */}
      <nav className="delivery-navbar">
        <a href="/" className="delivery-logo">
          FIT<span>LIFE</span>
        </a>

        <div className="delivery-nav-links">
          <a href="/">Home</a>
          <a href="/profile">Profile</a>
        </div>
      </nav>

      {/* HERO */}
      <header className="delivery-hero">
        <div className="delivery-hero-content">
          <p className="delivery-eyebrow">
            YOUR HEALTH, OUR MISSION
          </p>

          <h1>
            Healthy Living
            <br />
            <span>Delivered to You</span>
          </h1>

          <p>
            Shop healthy Sri Lankan food and fitness essentials.
          </p>

          <a
            href="#delivery-products"
            className="shop-button"
          >
            Shop Now →
          </a>
        </div>
      </header>

      {/* PRODUCTS */}
      <main className="delivery-main">
        <section
          className="delivery-section"
          id="delivery-products"
        >
          <div className="section-heading">
            <div>
              <p className="delivery-eyebrow">FITLIFE STORE</p>
              <h2>Food & Fitness Products</h2>
            </div>

            <span className="product-count">
              {filteredProducts.length} Products
            </span>
          </div>

          {/* SEARCH */}
          <div className="delivery-search">
            <span aria-hidden="true">⌕</span>

            <input
              type="search"
              placeholder="Search food or fitness products..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          {/* CATEGORY FILTER */}
          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* PRODUCT GRID */}
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
              >
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        "https://placehold.co/600x400/101d16/a7f23d?text=FITLIFE";
                    }}
                  />

                  <span className="product-category">
                    {product.category}
                  </span>
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>

                  <p className="product-english-name">
                    {product.category}
                  </p>

                  <div className="product-bottom">
                    <strong className="product-price">
                      {money(product.price)}
                    </strong>

                    <button
                      type="button"
                      className="add-button"
                      onClick={() => addToOrder(product)}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-products">
              No products found. Try another search.
            </div>
          )}
        </section>

        {/* ORDER SUMMARY */}
        <section className="order-section" id="my-order">
          <div className="order-heading">
            <div>
              <p className="delivery-eyebrow">
                YOUR SELECTION
              </p>
              <h2>Your Order</h2>
            </div>

            <span className="order-count">
              {orders.reduce(
                (count, item) => count + item.quantity,
                0
              )}{" "}
              items
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="empty-order">
              <div className="empty-order-icon">🛒</div>
              <h3>Your order is empty</h3>
              <p>
                Add food or fitness products to get started.
              </p>
            </div>
          ) : (
            <div className="order-items">
              {orders.map((item) => (
                <div className="order-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="order-item-image"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        "https://placehold.co/100x100/101d16/a7f23d?text=FIT";
                    }}
                  />

                  <div className="order-item-details">
                    <h4>{item.name}</h4>
                    <p>{money(item.price)}</p>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="order-item-end">
                    <strong>
                      {money(item.price * item.quantity)}
                    </strong>

                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TOTALS */}
          <div className="order-totals">
            <div>
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>

            <div>
              <span>Delivery fee</span>
              <strong>{money(deliveryFee)}</strong>
            </div>

            <div className="grand-total">
              <span>Total</span>
              <strong>{money(total)}</strong>
            </div>
          </div>

          {/* CUSTOMER DETAILS */}
          <form
            className="customer-form"
            onSubmit={confirmOrder}
          >
            <h3>Delivery Details</h3>

            <label htmlFor="customerName">
              Full name
            </label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(event) =>
                setCustomerName(event.target.value)
              }
              placeholder="Enter your name"
              required
            />

            <label htmlFor="customerPhone">
              Phone number
            </label>
            <input
              id="customerPhone"
              type="tel"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="+94..."
              required
            />

            <label htmlFor="customerAddress">
              Delivery address
            </label>
            <textarea
              id="customerAddress"
              value={address}
              onChange={(event) =>
                setAddress(event.target.value)
              }
              placeholder="Enter your delivery address"
              rows={3}
              required
            />

            {message && (
              <p
                className="order-message"
                role="status"
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="checkout-button"
              disabled={
                orders.length === 0 || isSubmitting
              }
            >
              {isSubmitting
                ? "Placing Order..."
                : "Confirm Order →"}
            </button>

            <p className="demo-note">
              Your order will be saved securely to your
              FITLIFE account.
            </p>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="delivery-footer">
        <a href="/" className="delivery-logo">
          FIT<span>LIFE</span>
        </a>

        <p>
          Choose a healthier lifestyle with FITLIFE.
        </p>

        <small>
          © {new Date().getFullYear()} FITLIFE
        </small>
      </footer>
    </div>
  );
}

export default Delivery;
