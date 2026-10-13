
import React from "react";
import { Link } from "react-router-dom";
import { Home, Apple } from "lucide-react";

export default function Nutrition() {
  const foods = [
    { name: "Red Rice & Curry", emoji: "🍛", type: "Rice & Curry" },
    { name: "String Hoppers & Dhal", emoji: "🍜", type: "Breakfast" },
    { name: "Kiribath", emoji: "🍚", type: "Traditional Food" },
    { name: "Gotukola Mallung", emoji: "🥬", type: "Healthy Greens" },
    { name: "Fresh Tropical Fruits", emoji: "🍉", type: "Fruits" },
    { name: "Boiled Kadala", emoji: "🫘", type: "Healthy Snacks" },
    { name: "Rice & Fish Curry", emoji: "🐟", type: "Rice & Curry" },
    { name: "Pittu & Dhal", emoji: "🥣", type: "Breakfast" },
    { name: "Egg Hopper", emoji: "🍳", type: "Breakfast" },
    { name: "Vegetable Kottu", emoji: "🥘", type: "Main Meals" },
    { name: "Pol Roti", emoji: "🫓", type: "Traditional Food" },
    { name: "Drumstick Leaves", emoji: "🌿", type: "Healthy Greens" },
    { name: "Gotukola", emoji: "🥬", type: "Healthy Greens" },
    { name: "Pumpkin", emoji: "🎃", type: "Vegetables" },
    { name: "Okra", emoji: "🥒", type: "Vegetables" },
    { name: "Brinjal", emoji: "🍆", type: "Vegetables" },
    { name: "Beans", emoji: "🫛", type: "Vegetables" },
    { name: "Wood Apple", emoji: "🍈", type: "Fruits" },
    { name: "Guava", emoji: "🍐", type: "Fruits" },
    { name: "King Coconut Water", emoji: "🥥", type: "Healthy Drinks" },
    { name: "Pineapple", emoji: "🍍", type: "Fruits" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#07110d",
      color: "white",
      padding: "25px",
      fontFamily: "Arial, sans-serif"
    }}>
      <Link to="/" style={{
        color: "#a7f23d",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px"
      }}>
        <Home size={20} /> Home
      </Link>

      <h1 style={{ marginTop: "30px", color: "#a7f23d" }}>
        <Apple size={30} /> Sri Lankan Nutrition
      </h1>

      <p style={{ color: "#b8c4ba" }}>
        Traditional food. Natural nutrition. Healthy life.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        gap: "18px",
        marginTop: "30px"
      }}>
        {foods.map((food) => (
          <div key={food.name} style={{
            background: "#101d16",
            border: "1px solid #293b30",
            borderRadius: "15px",
            padding: "22px",
            transition: "0.2s"
          }}>
            <div style={{ fontSize: "42px" }}>
              {food.emoji}
            </div>

            <h3 style={{ marginBottom: "8px" }}>
              {food.name}
            </h3>

            <span style={{
              color: "#a7f23d",
              fontSize: "13px"
            }}>
              {food.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}