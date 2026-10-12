
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Dumbbell } from "lucide-react";

const foods = [
  {
    id: 1, name: "Red Rice", tamil: "சிவப்பு அரிசி",
    category: "Rice & Curry", meal: "Lunch",
    calories: 195, protein: 4, carbs: 42, fat: 1,
    serving: "1 cup cooked", emoji: "🍚",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2, name: "Rice & Fish Curry", tamil: "சோறு மற்றும் மீன் குழம்பு",
    category: "Rice & Curry", meal: "Lunch",
    calories: 420, protein: 25, carbs: 55, fat: 10,
    serving: "1 plate", emoji: "🍛",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3, name: "String Hoppers", tamil: "இடியப்பம்",
    category: "Breakfast", meal: "Breakfast",
    calories: 160, protein: 3, carbs: 34, fat: 1,
    serving: "5 pieces", emoji: "🥢",
    image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4, name: "Pittu", tamil: "பிட்டு",
    category: "Breakfast", meal: "Breakfast",
    calories: 300, protein: 5, carbs: 48, fat: 9,
    serving: "1 medium serving", emoji: "🥥",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5, name: "Egg Hopper", tamil: "முட்டை அப்பம்",
    category: "Breakfast", meal: "Breakfast",
    calories: 155, protein: 7, carbs: 17, fat: 7,
    serving: "1 piece", emoji: "🍳",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6, name: "Dhal Curry", tamil: "பருப்பு கறி",
    category: "Vegetarian", meal: "Lunch",
    calories: 150, protein: 7, carbs: 20, fat: 5,
    serving: "1 small bowl", emoji: "🥣",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7, name: "Boiled Egg", tamil: "அவித்த முட்டை",
    category: "Protein", meal: "Snack",
    calories: 78, protein: 6, carbs: 1, fat: 5,
    serving: "1 egg", emoji: "🥚",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8, name: "Banana", tamil: "வாழைப்பழம்",
    category: "Fruits", meal: "Snack",
    calories: 90, protein: 1, carbs: 23, fat: 0,
    serving: "1 medium", emoji: "🍌",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9, name: "Gotukola Salad", tamil: "வல்லாரை சாலட்",
    category: "Vegetarian", meal: "Lunch",
    calories: 80, protein: 3, carbs: 8, fat: 4,
    serving: "1 bowl", emoji: "🥗",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10, name: "Pol Roti", tamil: "தேங்காய் ரொட்டி",
    category: "Breakfast", meal: "Breakfast",
    calories: 220, protein: 5, carbs: 30, fat: 9,
    serving: "1 medium roti", emoji: "🫓",
    image: "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 11, name: "Grilled Fish", tamil: "சுட்ட மீன்",
    category: "Protein", meal: "Dinner",
    calories: 180, protein: 27, carbs: 0, fat: 8,
    serving: "100 g", emoji: "🐟",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 12, name: "Papaya", tamil: "பப்பாளி",
    category: "Fruits", meal: "Snack",
    calories: 60, protein: 1, carbs: 15, fat: 0,
    serving: "1 cup", emoji: "🍈",
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=600&q=80",
  },
];

const categories = [
  "All", "Rice & Curry", "Breakfast",
  "Vegetarian", "Protein", "Fruits",
];

const initialMeals = () => {
  try {
    return JSON.parse(localStorage.getItem("fitlife-meals") || "[]");
  } catch {
    return [];
  }
};

const css = `
  .nutrition-page {
    --bg: #07110d;
    --panel: #101d16;
    --line: #293b30;
    --green: #a7f23d;
    --muted: #a8b5ad;
    min-height: 100vh;
    padding: 28px;
    color: #f5f8f5;
    background: var(--bg);
    font-family: Inter, Arial, sans-serif;
    box-sizing: border-box;
  }
  .nutrition-page * { box-sizing: border-box; }
  .nutrition-page button,
  .nutrition-page input,
  .nutrition-page select { font: inherit; }
  .nutrition-page button { cursor: pointer; }
  .nutrition-header {
    display: flex; justify-content: space-between;
    align-items: center; gap: 20px; margin-bottom: 26px;
  }
  .nutrition-logo { font-size: 27px; font-weight: 900; letter-spacing: -1px; }
  .nutrition-logo span { color: var(--green); }
  .nutrition-subtitle { color: var(--muted); font-size: 13px; margin-top: 5px; }
  .nutrition-pill {
    display: inline-block; color: var(--green);
    background: #18351e; border: 1px solid #315a31;
    border-radius: 30px; padding: 7px 12px;
    font-size: 12px; font-weight: 800; margin-bottom: 12px;
  }
  .nutrition-hero {
    position: relative; overflow: hidden; isolation: isolate;
    min-height: 250px; padding: 30px;
    display: flex; align-items: center;
    border: 1px solid #294c37; border-radius: 22px;
    background: linear-gradient(90deg,#071b12 0%,#0a2115eF 35%,#07110d55 100%),
      url("https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1500&q=85") center 48%/cover;
    margin-bottom: 22px;
  }
  .nutrition-hero h1 {
    font-size: clamp(32px,4vw,48px); line-height: 1.1;
    letter-spacing: -1.5px; margin: 0 0 12px;
  }
  .nutrition-hero h1 span { color: var(--green); }
  .nutrition-hero p { color: #c0ccc4; line-height: 1.7; max-width: 400px; margin: 0; }
  .nutrition-panel {
    background: var(--panel); border: 1px solid var(--line);
    border-radius: 18px; padding: 20px; margin-bottom: 22px;
  }
  .nutrition-stats {
    display: grid; grid-template-columns: repeat(4,minmax(0,1fr));
    gap: 14px; margin-bottom: 22px;
  }
  .nutrition-stat {
    background: linear-gradient(145deg,#12231a,#0c1712);
    border: 1px solid var(--line); border-radius: 17px; padding: 18px;
  }
  .nutrition-stat-icon { font-size: 25px; }
  .nutrition-stat-label { color: var(--muted); font-size: 13px; margin: 10px 0 5px; }
  .nutrition-stat-value { color: var(--green); font-size: 26px; font-weight: 850; }
  .nutrition-stat-value small { font-size: 12px; color: #d1d9d2; }
  .nutrition-stat-track { height: 6px; background: #27372c; border-radius: 9px; margin-top: 12px; overflow: hidden; }
  .nutrition-stat-track span { display: block; height: 100%; background: var(--green); border-radius: 9px; }
  .nutrition-heading { font-size: 21px; margin: 0 0 17px; }
  .nutrition-search-layout {
    display: grid; grid-template-columns: minmax(220px,1fr) minmax(0,1.1fr);
    gap: 22px; align-items: center;
  }
  .nutrition-input {
    width: 100%; min-width: 0; padding: 13px 15px;
    border-radius: 11px; border: 1px solid #34483a;
    color: white; background: #08130d; outline: none;
  }
  .nutrition-input:focus { border-color: var(--green); }
  .nutrition-categories { display: flex; flex-wrap: wrap; gap: 8px; }
  .nutrition-chip {
    border: 1px solid #34483a; color: #dbe5dd;
    background: #17251b; border-radius: 30px;
    padding: 9px 13px; font-size: 12px; transition: .2s;
  }
  .nutrition-chip.active { color: #07110d; background: var(--green); border-color: var(--green); font-weight: 800; }
  .nutrition-meal-filter { display: flex; align-items: center; gap: 12px; margin-top: 16px; flex-wrap: wrap; }
  .nutrition-meal-filter label { color: var(--muted); font-size: 13px; }
  .nutrition-menu-title { display:flex; justify-content:space-between; align-items:center; gap:12px; margin: 27px 0 17px; }
  .nutrition-menu-title h2 { margin: 0; font-size: 22px; }
  .nutrition-menu-title span { color: var(--muted); font-size: 12px; }
  .nutrition-food-grid {
    display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 17px;
  }
  .nutrition-food-card {
    min-width: 0; overflow: hidden; background: #0e1b14;
    border: 1px solid #2a3d30; border-radius: 16px;
    transition: transform .2s,border-color .2s;
  }
  .nutrition-food-card:hover { transform: translateY(-3px); border-color: #85c941; }
  .nutrition-food-image { height: 155px; position: relative; background: #1a2b20; overflow: hidden; }
  .nutrition-food-image img { width:100%; height:100%; object-fit:cover; display:block; transition: transform .3s; }
  .nutrition-food-card:hover .nutrition-food-image img { transform: scale(1.04); }
  .nutrition-food-image .nutrition-emoji {
    position: absolute; right: 10px; bottom: 10px;
    background: #07110de8; border: 1px solid #52684d;
    border-radius: 50%; width: 34px; height: 34px;
    display: grid; place-items: center; font-size: 19px;
  }
  .nutrition-food-content { padding: 14px; }
  .nutrition-food-content h3 { font-size: 16px; margin: 0 0 5px; }
  .nutrition-tamil { color: var(--muted); font-size: 12px; margin: 0 0 10px; }
  .nutrition-tag {
    display: inline-block; font-size: 10px; font-weight: 800;
    background: #1e3b24; color: #b8ff83;
    border-radius: 30px; padding: 5px 9px; margin-bottom: 12px;
  }
  .nutrition-calories { color: var(--green); font-weight: 800; font-size: 15px; }
  .nutrition-serving { color: var(--muted); font-size: 11px; margin-top: 12px; }
  .nutrition-macros {
    display: flex; justify-content: space-between; gap: 5px;
    color: var(--muted); font-size: 11px; margin: 12px 0;
  }
  .nutrition-macros b { display:block; color: #f4f8f4; margin-top: 5px; font-size: 13px; }
  .nutrition-add {
    width: 100%; border: none; border-radius: 10px;
    background: var(--green); color: #091309;
    padding: 11px 8px; font-weight: 850; font-size: 12px;
  }
  .nutrition-add:hover { background: #c0ff72; }
  .nutrition-bottom {
    display: grid; grid-template-columns: minmax(0,1.3fr) minmax(300px,1fr);
    gap: 20px; margin-top: 26px;
  }
  .nutrition-meal-row {
    display:flex; justify-content:space-between; align-items:center; gap:12px;
    padding: 13px 0; border-bottom: 1px solid var(--line); font-size: 13px;
  }
  .nutrition-meal-name { display:flex; align-items:center; gap:10px; min-width:0; }
  .nutrition-meal-name span { overflow-wrap:anywhere; }
  .nutrition-remove {
    color:#f1b9b9; background:#2a201f; border:1px solid #49302d;
    padding:7px 10px; border-radius:8px; font-size:12px;
  }
  .nutrition-clear {
    width:100%; margin-top:14px; background:#25382a;
    color:white; border:1px solid #3a5040; border-radius:10px; padding:12px;
  }
  .nutrition-empty { color:var(--muted); font-size:13px; line-height:1.7; }
  .nutrition-note { color:#829187; font-size:11px; line-height:1.7; margin-top:22px; }
  .nutrition-page button:focus-visible { outline:2px solid white; outline-offset:3px; }
  @media(max-width:1050px) {
    .nutrition-food-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }
    .nutrition-stats { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .nutrition-search-layout { grid-template-columns:1fr; }
  }
  @media(max-width:650px) {
    .nutrition-page { padding:15px; }
    .nutrition-header { align-items:flex-start; }
    .nutrition-logo { font-size:23px; }
    .nutrition-hero { min-height:230px; padding:22px; background-position:58% center; }
    .nutrition-hero p { max-width:270px; font-size:13px; }
    .nutrition-stats { gap:9px; }
    .nutrition-stat { padding:13px; }
    .nutrition-stat-value { font-size:22px; }
    .nutrition-panel { padding:15px; }
    .nutrition-food-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
    .nutrition-food-image { height:125px; }
    .nutrition-food-content { padding:10px; }
    .nutrition-food-content h3 { font-size:14px; }
    .nutrition-bottom { grid-template-columns:1fr; }
    .nutrition-menu-title { align-items:flex-start; flex-direction:column; }
  }
  @media(max-width:360px) {
    .nutrition-food-grid { grid-template-columns:1fr; }
  }
`;

export default function Nutrition() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [meal, setMeal] = useState("All");
  const [myMeals, setMyMeals] = useState(initialMeals);

  React.useEffect(() => {
    try {
      localStorage.setItem("fitlife-meals", JSON.stringify(myMeals));
    } catch {
      // The page remains usable if browser storage is unavailable.
    }
  }, [myMeals]);

  const filteredFoods = useMemo(() => {
    const query = search.trim().toLowerCase();

    return foods.filter((food) => {
      const matchesSearch =
        food.name.toLowerCase().includes(query) ||
        food.tamil.toLowerCase().includes(query);

      return (
        matchesSearch &&
        (category === "All" || food.category === category) &&
        (meal === "All" || food.meal === meal)
      );
    });
  }, [search, category, meal]);

  const totals = myMeals.reduce(
    (sum, food) => ({
      calories: sum.calories + food.calories,
      protein: sum.protein + food.protein,
      carbs: sum.carbs + food.carbs,
      fat: sum.fat + food.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  function addFood(food) {
    setMyMeals((current) => [...current, food]);
  }

  function removeFood(index) {
    setMyMeals((current) => current.filter((_, i) => i !== index));
  }

  const stats = [
   
  ];

  return (
    <main className="nutrition-page">
      <style>{css}</style>

      <header className="nutrition-header">
        <div>
          <div className="nutrition-logo">
            FIT<span>LIFE</span>
          </div>
          <div className="nutrition-subtitle">
            Healthy Life For Everyone
          </div>
        </div>
        <div style={{ color: "#a7f23d", fontSize: 13, fontWeight: 700 }}>
          🥗 NUTRITION
        </div>
      </header>

      <section className="nutrition-hero">
        <div>
          <div className="nutrition-pill">🌿 FITLIFE / NUTRITION</div>
          <h1>
            Eat Healthy,<br />
            <span>Live Better.</span>
          </h1>
          <p>
            Discover Sri Lankan foods and track your daily nutrition.
          </p>
        </div>
      </section>

      <section className="nutrition-stats">
        {stats.map((stat) => (
          <article className="nutrition-stat" key={stat.label}>
            <div className="nutrition-stat-icon">{stat.icon}</div>
            <div className="nutrition-stat-label">{stat.label}</div>
            <div className="nutrition-stat-value">
              {stat.value} <small>{stat.unit}</small>
            </div>
            <div
              className="nutrition-stat-track"
              aria-label={`${stat.label}: ${stat.value} of ${stat.goal}`}
            >
              <span
                style={{
                  width: `${Math.min(100, (stat.value / stat.goal) * 100)}%`,
                }}
              />
            </div>
            <div className="nutrition-serving">
              Reference: {stat.goal} {stat.unit}
            </div>
          </article>
        ))}
      </section>

      <section className="nutrition-panel">
        <h2 className="nutrition-heading">🔎 Find Your Food</h2>

        <div className="nutrition-search-layout">
          <input
            className="nutrition-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food in English or Tamil..."
            aria-label="Search foods"
          />

          <div>
            <div className="nutrition-categories">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`nutrition-chip ${category === item ? "active" : ""}`}
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="nutrition-meal-filter">
              <label htmlFor="nutrition-meal">Meal</label>
              <select
                id="nutrition-meal"
                className="nutrition-input"
                style={{ width: "auto", flex: 1 }}
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
              >
                <option value="All">All Meals</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snacks</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className="nutrition-menu-title">
        <h2>🥗 Sri Lankan Food Menu</h2>
        <span>{filteredFoods.length} food options</span>
      </div>

      <section className="nutrition-food-grid">
        {filteredFoods.map((food) => (
          <article className="nutrition-food-card" key={food.id}>
            <div className="nutrition-food-image">
              <img
                src={food.image}
                alt={food.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="nutrition-emoji">{food.emoji}</span>
            </div>

            <div className="nutrition-food-content">
              <h3>{food.name}</h3>
              <p className="nutrition-tamil">{food.tamil}</p>
              <span className="nutrition-tag">{food.category}</span>

              <div className="nutrition-calories">
                {food.calories} kcal
              </div>

              <div className="nutrition-macros">
                <span>Protein<b>{food.protein}g</b></span>
                <span>Carbs<b>{food.carbs}g</b></span>
                <span>Fat<b>{food.fat}g</b></span>
              </div>

              <div className="nutrition-serving">
                Serving: {food.serving}
              </div>

              <button
                className="nutrition-add"
                style={{ marginTop: 12 }}
                onClick={() => addFood(food)}
              >
                + Add to My Meal
              </button>
            </div>
          </article>
        ))}
      </section>

      {filteredFoods.length === 0 && (
        <p className="nutrition-empty">
          No foods found. Try another search or category.
        </p>
      )}

      <section className="nutrition-bottom">
        <div className="nutrition-panel">
          <h2 className="nutrition-heading">💚 My Daily Meal</h2>

          {myMeals.length === 0 ? (
            <p className="nutrition-empty">
              Your meal list is empty. Add foods from the menu above.
            </p>
          ) : (
            <>
              {myMeals.map((food, index) => (
                <div
                  className="nutrition-meal-row"
                  key={`${food.id}-${index}`}
                >
                  <div className="nutrition-meal-name">
                    <span style={{ fontSize: 22 }}>{food.emoji}</span>
                    <span>{food.name}</span>
                  </div>
                  <span style={{ whiteSpace: "nowrap", color: "#a7f23d" }}>
                    {food.calories} kcal
                  </span>
                  <button
                    className="nutrition-remove"
                    onClick={() => removeFood(index)}
                    aria-label={`Remove ${food.name}`}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <h3 style={{ color: "#a7f23d", marginTop: 20 }}>
                Total: {totals.calories} kcal
              </h3>

              <div className="nutrition-macros">
                <span>Protein<b>{totals.protein}g</b></span>
                <span>Carbs<b>{totals.carbs}g</b></span>
                <span>Fat<b>{totals.fat}g</b></span>
              </div>

              <button
                className="nutrition-clear"
                onClick={() => setMyMeals([])}
              >
                🗑 Clear Meal
              </button>
            </>
          )}
        </div>

        <div className="nutrition-panel">
          <h2 className="nutrition-heading">📊 Nutrition Summary</h2>
          <p className="nutrition-empty">
            Your daily nutrition totals update whenever you add or remove
            food items from My Daily Meal.
          </p>
          {stats.map((stat) => (
            <div className="nutrition-meal-row" key={stat.label}>
              <span>{stat.icon} {stat.label}</span>
              <strong style={{ color: "#a7f23d" }}>
                {stat.value} {stat.unit}
              </strong>
            </div>
          ))}
        </div>
      </section>

      <p className="nutrition-note">
        ⓘ Nutrition values are estimates, not medical advice.
        Actual values depend on ingredients, preparation and serving sizes.
        Food images are loaded from external image URLs and require internet access.
      </p>
    </main>
  );
}
