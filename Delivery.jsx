import React, { useState } from "react";
import {
  Truck,
  MapPin,
  Package,
  CheckCircle,
  Clock,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

function Delivery() {
  const [orderId, setOrderId] = useState("");

  const handleTrack = (e) => {
    e.preventDefault();

    if (!orderId.trim()) {
      alert("Please enter your Order ID.");
      return;
    }

    alert(`Tracking Order: ${orderId}`);
  };

  return (
    <div className="delivery-page">

      {/* HEADER */}
      <header className="delivery-header">

        <a href="/" className="delivery-logo">
          <span className="delivery-logo-icon">
            <ShoppingBag size={20} />
          </span>

          FIT<span>LIFE</span>
        </a>

        <a href="/" className="delivery-back">
          <ArrowLeft size={17} />
          Back to Home
        </a>

      </header>


      {/* HERO */}
      <section className="delivery-hero">

        <div className="delivery-hero-content">

          <span className="section-label">
            FITLIFE DELIVERY
          </span>

          <h1>
            Your Fitness.
            <br />
            <span>Delivered.</span>
          </h1>

          <p>
            Order fitness equipment, accessories and
            wellness products from FITLIFE Store and
            get them delivered directly to your door.
          </p>

        </div>

        <div className="delivery-truck">
          <Truck size={110} strokeWidth={1.2} />
        </div>

      </section>


      {/* DELIVERY FEATURES */}
      <section className="delivery-features-grid">

        <div className="delivery-feature-card">

          <div className="delivery-feature-icon">
            <Truck />
          </div>

          <h3>
            Fast Delivery
          </h3>

          <p>
            Get your fitness products delivered quickly
            and safely.
          </p>

        </div>


        <div className="delivery-feature-card">

          <div className="delivery-feature-icon">
            <MapPin />
          </div>

          <h3>
            Doorstep Delivery
          </h3>

          <p>
            We deliver your order directly to your
            preferred address.
          </p>

        </div>


        <div className="delivery-feature-card">

          <div className="delivery-feature-icon">
            <Package />
          </div>

          <h3>
            Secure Packaging
          </h3>

          <p>
            Your products are carefully packed before
            delivery.
          </p>

        </div>

      </section>


      {/* TRACK ORDER */}
      <section className="track-order">

        <div className="track-heading">

          <span className="section-label">
            ORDER TRACKING
          </span>

          <h2>
            Track Your <span>Order</span>
          </h2>

          <p>
            Enter your order ID to check your delivery status.
          </p>

        </div>


        <form
          className="track-form"
          onSubmit={handleTrack}
        >

          <input
            type="text"
            placeholder="Enter Order ID e.g. FL-2026-001"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />

          <button type="submit">
            Track Order
            <Truck size={17} />
          </button>

        </form>

      </section>


      {/* ORDER STATUS */}
      <section className="delivery-status-section">

        <div className="status-heading">

          <span className="section-label">
            DELIVERY STATUS
          </span>

          <h2>
            How Your Order <span>Moves</span>
          </h2>

        </div>


        <div className="delivery-timeline">

          <div className="timeline-item completed">

            <div className="timeline-icon">
              <CheckCircle size={21} />
            </div>

            <div>
              <h3>
                Order Confirmed
              </h3>

              <p>
                Your order has been successfully received.
              </p>
            </div>

          </div>


          <div className="timeline-line"></div>


          <div className="timeline-item completed">

            <div className="timeline-icon">
              <Package size={21} />
            </div>

            <div>
              <h3>
                Preparing
              </h3>

              <p>
                Your products are being packed and prepared.
              </p>
            </div>

          </div>


          <div className="timeline-line"></div>


          <div className="timeline-item">

            <div className="timeline-icon">
              <Truck size={21} />
            </div>

            <div>
              <h3>
                Out for Delivery
              </h3>

              <p>
                Your package is on its way to you.
              </p>
            </div>

          </div>


          <div className="timeline-line"></div>


          <div className="timeline-item">

            <div className="timeline-icon">
              <MapPin size={21} />
            </div>

            <div>
              <h3>
                Delivered
              </h3>

              <p>
                Your fitness products arrive at your doorstep.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* DELIVERY INFO */}
      <section className="delivery-info">

        <div>
          <Clock size={25} />

          <div>
            <strong>
              Delivery Time
            </strong>

            <span>
              2–5 working days
            </span>
          </div>
        </div>


        <div>
          <MapPin size={25} />

          <div>
            <strong>
              Delivery Area
            </strong>

            <span>
              Sri Lanka
            </span>
          </div>
        </div>


        <div>
          <Package size={25} />

          <div>
            <strong>
              Safe Delivery
            </strong>

            <span>
              Securely packed products
            </span>
          </div>
        </div>

      </section>


      {/* FOOTER */}
      <footer className="delivery-footer">

        <a href="/">
          <ShoppingBag size={18} />
          FIT<span>LIFE</span>
        </a>

        <p>
          © 2026 FITLIFE. Your fitness. Your wellness. Your life.
        </p>

      </footer>

    </div>
  );
}

export default Delivery;