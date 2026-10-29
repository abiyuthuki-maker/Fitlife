import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Keep this catalogue in sync with the products shown in Delivery.jsx.
// Prices are taken from this server-side list, never from the browser request.
const PRODUCT_CATALOG = [
  { id: 1, name: "Red Rice & Curry", price: 450 },
  { id: 2, name: "String Hoppers & Dhal", price: 350 },
  { id: 3, name: "Kiribath", price: 300 },
  { id: 4, name: "Gotukola Mallung", price: 200 },
  { id: 5, name: "Boiled Kadala", price: 180 },
  { id: 6, name: "Egg Hoppers", price: 250 },
  { id: 7, name: "Fish Curry & Rice", price: 500 },
  { id: 8, name: "Fresh Fruit Bowl", price: 300 },
  { id: 9, name: "Whey Protein", price: 8500 },
  { id: 10, name: "Fitness Watch", price: 12000 },
  { id: 11, name: "Dumbbells", price: 4500 },
  { id: 12, name: "Yoga Mat", price: 2500 },
  { id: 13, name: "Resistance Bands", price: 1800 },
  { id: 14, name: "Skipping Rope", price: 1200 },
  { id: 15, name: "Gym Gloves", price: 2200 },
  { id: 16, name: "Shaker Bottle", price: 950 },
];

const DELIVERY_FEE = 300;

function getAuthenticatedUserId(req) {
  // Supports common JWT middleware payload conventions.
  const candidate =
    req.user?._id ||
    req.user?.id ||
    req.user?.userId ||
    req.user?.sub;

  return candidate && mongoose.Types.ObjectId.isValid(candidate)
    ? candidate
    : null;
}

// POST /api/orders — authenticated checkout
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required. Please log in again.",
      });
    }

    const { customerName, phone, address, items } = req.body || {};

    if (
      typeof customerName !== "string" ||
      !customerName.trim() ||
      typeof phone !== "string" ||
      !phone.trim() ||
      typeof address !== "string" ||
      !address.trim()
    ) {
      return res.status(400).json({
        message: "Name, phone number and delivery address are required.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Add at least one product to your order.",
      });
    }

    if (items.length > PRODUCT_CATALOG.length) {
      return res.status(400).json({ message: "Too many order items." });
    }

    const normalizedItems = [];
    const seenProductIds = new Set();

    for (const item of items) {
      const productId = Number(item?.productId);
      const quantity = Number(item?.quantity);

      if (
        !Number.isInteger(productId) ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 100
      ) {
        return res.status(400).json({
          message: "Each item must have a valid product ID and quantity (1–100).",
        });
      }

      if (seenProductIds.has(productId)) {
        return res.status(400).json({
          message: "Please send each product only once with its total quantity.",
        });
      }
      seenProductIds.add(productId);

      const product = PRODUCT_CATALOG.find((entry) => entry.id === productId);

      if (!product) {
        return res.status(400).json({
          message: `Product ${productId} is not available.`,
        });
      }

      normalizedItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    const subtotal = normalizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const deliveryFee = DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      user: userId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      items: normalizedItems,
      subtotal,
      deliveryFee,
      total,
    });

    return res.status(201).json({
      message: "Order placed successfully.",
      order: {
        _id: order._id,
        customerName: order.customerName,
        items: order.items,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      message: "Server error while placing the order.",
    });
  }
});

// GET /api/orders/my — list only the signed-in user's orders
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const userId = getAuthenticatedUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required. Please log in again.",
      });
    }

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.json({ orders });
  } catch (error) {
    console.error("Get my orders error:", error);
    return res.status(500).json({
      message: "Server error while loading your orders.",
    });
  }
});

export default router;
