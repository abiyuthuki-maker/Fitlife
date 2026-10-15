
import React, { useMemo, useState } from "react";
import "./Delivery.css";

const products = [
  {
    id: 1,
    name: "Red Rice & Curry",
    category: "Meals",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "String Hoppers & Dhal",
    category: "Breakfast",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Kiribath",
    category: "Breakfast",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Gotukola Mallung",
    category: "Healthy",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Boiled Kadala",
    category: "Snacks",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Egg Hoppers",
    category: "Breakfast",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Fish Curry & Rice",
    category: "Meals",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Fresh Fruit Bowl",
    category: "Healthy",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Whey Protein",
    category: "Supplements",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Fitness Watch",
    category: "Accessories",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Dumbbells",
    category: "Equipment",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Yoga Mat",
    category: "Equipment",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1603988363607-e1e4a66962c0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    name: "Resistance Bands",
    category: "Equipment",
    price: 1800,
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 14,
    name: "Skipping Rope",
    category: "Equipment",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    name: "Gym Gloves",
    category: "Accessories",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 16,
    name: "Shaker Bottle",
    category: "Accessories",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
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
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const money = (amount) =>
    `LKR ${amount.toLocaleString("en-LK")}`;

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

  const removeItem = (id) => {
    setOrders((previousOrders) =>
      previousOrders.filter((item) => item.id !== id)
    );
  };

  const subtotal = orders.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = subtotal === 0 ? 0 : 300;
  const total = subtotal + deliveryFee;

  const confirmOrder = (event) => {
    event.preventDefault();

    if (orders.length === 0) {
      setMessage("Please add products to your order first.");
      return;
    }

    if (
      !customerName.trim() ||
      !phone.trim() ||
      !address.trim()
    ) {
      setMessage("Please enter your name, phone number and address.");
      return;
    }

    const orderDetails = {
      customerName,
      phone,
      address,
      items: orders.map(({ id, name, price, quantity }) => ({
        id,
        name,
        price,
        quantity,
      })),
      subtotal,
      deliveryFee,
      total,
      createdAt: new Date().toISOString(),
    };

    // Demo only: this does not send the order to a backend.
    console.log("FITLIFE Order:", orderDetails);

    setMessage(
      "Order details are ready! This is a demo; no backend is connected."
    );
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

          <a href="#delivery-products" className="shop-button">
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
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {/* CATEGORY FILTER */}
          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
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
              <article className="product-card" key={product.id}>
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
              <p className="delivery-eyebrow">YOUR SELECTION</p>
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
                        aria-label="Decrease quantity"
                        onClick={() => changeQuantity(item.id, -1)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        aria-label="Increase quantity"
                        onClick={() => changeQuantity(item.id, 1)}
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
          <form className="customer-form" onSubmit={confirmOrder}>
            <h3>Delivery Details</h3>

            <label htmlFor="customerName">Full name</label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              placeholder="Enter your name"
              required
            />

            <label htmlFor="customerPhone">Phone number</label>
            <input
              id="customerPhone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+94..."
              required
            />

            <label htmlFor="customerAddress">Delivery address</label>
            <textarea
              id="customerAddress"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter your delivery address"
              rows="3"
              required
            />

            {message && (
              <p className="order-message" role="status">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="checkout-button"
              disabled={orders.length === 0}
            >
              Confirm Order →
            </button>

            <p className="demo-note">
              Demo only: connect a backend/API to receive real orders.
            </p>
          </form>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="delivery-footer">
        <a href="/" className="delivery-logo">
          FIT<span>LIFE</span>
        </a>

        <p>Choose a healthier lifestyle with FITLIFE.</p>

        <small>© {new Date().getFullYear()} FITLIFE</small>
      </footer>
    </div>
  );
}

export default Delivery;
