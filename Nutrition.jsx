
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Apple,
  Search,
  Plus,
  Trash2,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Utensils,
  Leaf,
  X,
} from "lucide-react";
import "./Nutrition.css";

const foods = [
  {
    id: 1,
    name: "Red Rice & Curry",
    emoji: "🍛",
    type: "Rice & Curry",
    calories: 450,
    protein: 15,
    carbs: 72,
    fat: 10,
    description: "Traditional red rice served with Sri Lankan curry.",
  },
  {
    id: 2,
    name: "String Hoppers & Dhal",
    emoji: "🍜",
    type: "Breakfast",
    calories: 320,
    protein: 10,
    carbs: 58,
    fat: 5,
    description: "Steamed string hoppers with dhal curry.",
  },
  {
    id: 3,
    name: "Kiribath",
    emoji: "🍚",
    type: "Traditional Food",
    calories: 280,
    protein: 5,
    carbs: 48,
    fat: 7,
    description: "Traditional Sri Lankan milk rice.",
  },
  {
    id: 4,
    name: "Gotukola Mallung",
    emoji: "🥬",
    type: "Healthy Greens",
    calories: 100,
    protein: 3,
    carbs: 10,
    fat: 5,
    description: "Fresh gotukola with coconut and spices.",
  },
  {
    id: 5,
    name: "Fresh Tropical Fruits",
    emoji: "🍉",
    type: "Fruits",
    calories: 120,
    protein: 2,
    carbs: 30,
    fat: 1,
    description: "A refreshing mix of seasonal tropical fruits.",
  },
  {
    id: 6,
    name: "Boiled Kadala",
    emoji: "🫘",
    type: "Healthy Snacks",
    calories: 180,
    protein: 10,
    carbs: 30,
    fat: 3,
    description: "Boiled chickpeas for a filling snack.",
  },
  {
    id: 7,
    name: "Rice & Fish Curry",
    emoji: "🐟",
    type: "Rice & Curry",
    calories: 480,
    protein: 28,
    carbs: 65,
    fat: 12,
    description: "Rice with fish curry and vegetables.",
  },
  {
    id: 8,
    name: "Pittu & Dhal",
    emoji: "🥣",
    type: "Breakfast",
    calories: 350,
    protein: 11,
    carbs: 55,
    fat: 8,
    description: "Steamed pittu served with dhal curry.",
  },
  {
    id: 9,
    name: "Egg Hopper",
    emoji: "🍳",
    type: "Breakfast",
    calories: 220,
    protein: 9,
    carbs: 25,
    fat: 9,
    description: "A Sri Lankan hopper with a cooked egg.",
  },
  {
    id: 10,
    name: "Vegetable Kottu",
    emoji: "🥘",
    type: "Main Meals",
    calories: 450,
    protein: 12,
    carbs: 65,
    fat: 15,
    description: "Chopped roti cooked with vegetables and spices.",
  },
  {
    id: 11,
    name: "Pol Roti",
    emoji: "🫓",
    type: "Traditional Food",
    calories: 250,
    protein: 5,
    carbs: 35,
    fat: 10,
    description: "Coconut flatbread, a Sri Lankan favourite.",
  },
  {
    id: 12,
    name: "Drumstick Leaves",
    emoji: "🌿",
    type: "Healthy Greens",
    calories: 80,
    protein: 4,
    carbs: 10,
    fat: 3,
    description: "Nutritious moringa leaves cooked with spices.",
  },
  {
    id: 13,
    name: "Pumpkin Curry",
    emoji: "🎃",
    type: "Vegetables",
    calories: 110,
    protein: 3,
    carbs: 18,
    fat: 4,
    description: "Pumpkin cooked with Sri Lankan spices.",
  },
  {
    id: 14,
    name: "Okra",
    emoji: "🥒",
    type: "Vegetables",
    calories: 70,
    protein: 2,
    carbs: 9,
    fat: 3,
    description: "Fresh okra prepared with light seasoning.",
  },
  {
    id: 15,
    name: "Brinjal Curry",
    emoji: "🍆",
    type: "Vegetables",
    calories: 140,
    protein: 3,
    carbs: 15,
    fat: 8,
    description: "Brinjal cooked with traditional spices.",
  },
  {
    id: 16,
    name: "Beans",
    emoji: "🫛",
    type: "Vegetables",
    calories: 60,
    protein: 3,
    carbs: 10,
    fat: 1,
    description: "Fresh green beans, a simple vegetable side.",
  },
  {
    id: 17,
    name: "Wood Apple",
    emoji: "🍈",
    type: "Fruits",
    calories: 140,
    protein: 2,
    carbs: 32,
    fat: 1,
    description: "A traditional tropical fruit.",
  },
  {
    id: 18,
    name: "Guava",
    emoji: "🍐",
    type: "Fruits",
    calories: 68,
    protein: 3,
    carbs: 14,
    fat: 1,
    description: "Fresh guava containing fibre and vitamin C.",
  },
  {
    id: 19,
    name: "King Coconut Water",
    emoji: "🥥",
    type: "Healthy Drinks",
    calories: 45,
    protein: 0,
    carbs: 11,
    fat: 0,
    description: "Refreshing king coconut water.",
  },
  {
    id: 20,
    name: "Pineapple",
    emoji: "🍍",
    type: "Fruits",
    calories: 82,
    protein: 1,
    carbs: 22,
    fat: 0,
    description: "Sweet tropical pineapple pieces.",
  },
  {
    id: 21,
    name: "Boiled Egg",
    emoji: "🥚",
    type: "Healthy Snacks",
    calories: 78,
    protein: 6,
    carbs: 1,
    fat: 5,
    description: "A convenient source of protein.",
  },
];

const categories = [
  "All Foods",
  "Rice & Curry",
  "Breakfast",
  "Traditional Food",
  "Healthy Greens",
  "Fruits",
  "Healthy Snacks",
  "Main Meals",
  "Vegetables",
  "Healthy Drinks",
];

export default function Nutrition() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Foods");
  const [mealPlan, setMealPlan] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("fitlife-meals") || "[]"
      );
    } catch {
      return [];
    }
  });
  const [showPlan, setShowPlan] = useState(false);
  const [message, setMessage] = useState("");

  const saveMealPlan = (nextPlan) => {
    setMealPlan(nextPlan);
    localStorage.setItem(
      "fitlife-meals",
      JSON.stringify(nextPlan)
    );
  };

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchesSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All Foods" ||
        food.type === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const totalCalories = mealPlan.reduce(
    (total, item) => total + item.calories * item.quantity,
    0
  );

  const totalProtein = mealPlan.reduce(
    (total, item) => total + item.protein * item.quantity,
    0
  );

  const totalCarbs = mealPlan.reduce(
    (total, item) => total + item.carbs * item.quantity,
    0
  );

  const totalFat = mealPlan.reduce(
    (total, item) => total + item.fat * item.quantity,
    0
  );

  const addFood = (food) => {
    const existing = mealPlan.find(
      (item) => item.id === food.id
    );

    let nextPlan;

    if (existing) {
      nextPlan = mealPlan.map((item) =>
        item.id === food.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      nextPlan = [
        ...mealPlan,
        { ...food, quantity: 1 },
      ];
    }

    saveMealPlan(nextPlan);
    setMessage(`${food.name} added to your meal plan!`);

    setTimeout(() => setMessage(""), 2500);
  };

  const changeQuantity = (id, amount) => {
    const nextPlan = mealPlan
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveMealPlan(nextPlan);
  };

  const removeFood = (id) => {
    saveMealPlan(
      mealPlan.filter((item) => item.id !== id)
    );
  };

  return (
    <main className="nutrition-page">
      <header className="nutrition-navbar">
        <Link to="/" className="nutrition-logo">
          <Apple size={27} />
          <span>FIT<span>LIFE</span></span>
        </Link>

        <nav className="nutrition-nav-links">
          <Link to="/">
            <Home size={17} /> Home
          </Link>

          <Link to="/wellness">Wellness</Link>

          <Link to="/nutrition" className="active">
            Nutrition
          </Link>
        </nav>

        <button
          className="meal-plan-nav"
          onClick={() => setShowPlan(true)}
        >
          <Utensils size={17} />
          My Meal Plan
          <span>{mealPlan.reduce((n, item) => n + item.quantity, 0)}</span>
        </button>
      </header>

      <section className="nutrition-hero">
        <div className="nutrition-hero-content">
          <span className="nutrition-eyebrow">
            <Leaf size={15} /> EAT SMART · LIVE STRONG
          </span>

          <h1>
            Nourish Your Body.
            <br />
            <span>Fuel Your Life.</span>
          </h1>

          <p>
            Discover nutritious Sri Lankan foods and build
            healthy eating habits with FITLIFE.
          </p>

          <button
            className="nutrition-primary-btn"
            onClick={() =>
              document
                .getElementById("food-library")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Foods <Apple size={18} />
          </button>
        </div>

        <div className="nutrition-hero-art">
          <div className="nutrition-art-circle">
            <span>🥗</span>
          </div>
          <div className="nutrition-floating-card">
            <Flame size={20} />
            <div>
              <strong>Eat Better</strong>
              <small>Feel stronger every day</small>
            </div>
          </div>
        </div>
      </section>

      <section className="nutrition-stats">
        <div className="nutrition-stat-card">
          <div className="nutrition-stat-icon">
            <Flame size={22} />
          </div>
          <div>
            <p>Calories Added</p>
            <h2>{totalCalories.toLocaleString()}</h2>
            <small>kcal in your meal plan</small>
          </div>
        </div>

        <div className="nutrition-stat-card">
          <div className="nutrition-stat-icon">
            <Beef size={22} />
          </div>
          <div>
            <p>Protein</p>
            <h2>{totalProtein}g</h2>
            <small>From selected foods</small>
          </div>
        </div>

        <div className="nutrition-stat-card">
          <div className="nutrition-stat-icon">
            <Wheat size={22} />
          </div>
          <div>
            <p>Carbohydrates</p>
            <h2>{totalCarbs}g</h2>
            <small>From selected foods</small>
          </div>
        </div>

        <div className="nutrition-stat-card">
          <div className="nutrition-stat-icon">
            <Droplets size={22} />
          </div>
          <div>
            <p>Fat</p>
            <h2>{totalFat}g</h2>
            <small>From selected foods</small>
          </div>
        </div>
      </section>

      <section
        className="nutrition-food-section"
        id="food-library"
      >
        <div className="nutrition-section-heading">
          <div>
            <span className="nutrition-eyebrow">
              YOUR FOOD LIBRARY
            </span>
            <h2>Explore Sri Lankan Nutrition</h2>
            <p>
              Find your favourite foods and add them to your
              daily meal plan.
            </p>
          </div>

          <span className="food-count">
            {filteredFoods.length} foods
          </span>
        </div>

        <div className="nutrition-search">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search rice, fruits, vegetables..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="nutrition-categories">
          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item ? "selected" : ""
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {message && (
          <div className="nutrition-success-message">
            {message}
          </div>
        )}

        <div className="nutrition-food-grid">
          {filteredFoods.map((food) => (
            <article
              className="nutrition-food-card"
              key={food.id}
            >
              <div className="nutrition-food-emoji">
                {food.emoji}
                <span>{food.type}</span>
              </div>

              <div className="nutrition-food-content">
                <h3>{food.name}</h3>
                <p>{food.description}</p>

                <div className="nutrition-calorie-line">
                  <Flame size={16} />
                  <strong>{food.calories} kcal</strong>
                  <span>per serving (estimated)</span>
                </div>

                <div className="nutrition-macros">
                  <div>
                    <strong>{food.protein}g</strong>
                    <small>Protein</small>
                  </div>
                  <div>
                    <strong>{food.carbs}g</strong>
                    <small>Carbs</small>
                  </div>
                  <div>
                    <strong>{food.fat}g</strong>
                    <small>Fat</small>
                  </div>
                </div>

                <button
                  className="nutrition-add-btn"
                  onClick={() => addFood(food)}
                >
                  <Plus size={18} />
                  Add to Meal Plan
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="nutrition-empty">
            <span>🥗</span>
            <h3>No foods found</h3>
            <p>Try another food name or category.</p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All Foods");
              }}
            >
              Show All Foods
            </button>
          </div>
        )}
      </section>

      <footer className="nutrition-footer">
        <Apple size={20} />
        <p>
          FITLIFE · Eat well, move better, live healthier.
        </p>
      </footer>

      {showPlan && (
        <div
          className="nutrition-modal-overlay"
          onClick={() => setShowPlan(false)}
        >
          <section
            className="nutrition-meal-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="nutrition-modal-header">
              <div>
                <span className="nutrition-eyebrow">
                  YOUR DAILY FOOD
                </span>
                <h2>My Meal Plan</h2>
              </div>

              <button
                className="nutrition-close-btn"
                onClick={() => setShowPlan(false)}
                aria-label="Close meal plan"
              >
                <X size={23} />
              </button>
            </div>

            <div className="nutrition-modal-calories">
              <Flame size={25} />
              <div>
                <strong>{totalCalories} kcal</strong>
                <span>Total estimated calories</span>
              </div>
            </div>

            {mealPlan.length === 0 ? (
              <div className="nutrition-empty">
                <span>🍽️</span>
                <h3>Your meal plan is empty</h3>
                <p>Add foods to start planning your meals.</p>
                <button onClick={() => setShowPlan(false)}>
                  Explore Foods
                </button>
              </div>
            ) : (
              <div className="nutrition-meal-list">
                {mealPlan.map((item) => (
                  <div
                    className="nutrition-meal-item"
                    key={item.id}
                  >
                    <span className="meal-item-emoji">
                      {item.emoji}
                    </span>

                    <div className="meal-item-info">
                      <strong>{item.name}</strong>
                      <small>
                        {item.calories * item.quantity} kcal
                      </small>
                    </div>

                    <div className="meal-quantity">
                      <button
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="meal-remove-btn"
                      onClick={() => removeFood(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="nutrition-modal-footer">
              <div>
                <span>Total</span>
                <strong>{totalCalories} kcal</strong>
              </div>

              <button
                onClick={() => setShowPlan(false)}
              >
                Continue
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
