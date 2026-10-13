

import React from "react";
import { Link } from "react-router-dom";
import {
 Home,
 Flame,
 Clock,
 Dumbbell,
 TrendingUp,
 Target,
 CheckCircle,
} from "lucide-react";


const workouts = [
 /*{
   name: "Full Body Workout",
   duration: "20 minutes",
   calories: "180 kcal",
   image:
     "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80",
 },
 {
   name: "Strength Training",
   duration: "30 minutes",
   calories: "260 kcal",
   image:
     "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80",
 },
 {
   name: "Yoga & Flexibility",
   duration: "15 minutes",
   calories: "100 kcal",
   image:
     "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=700&q=80",
 },*/
];


const weekly = [
 { day: "Mon", value: 65 },
 { day: "Tue", value: 85 },
 { day: "Wed", value: 45 },
 { day: "Thu", value: 95 },
 { day: "Fri", value: 70 },
 { day: "Sat", value: 55 },
 { day: "Sun", value: 30 },
];


export default function Progress() {
 return (
   <main className="progress-page">
     <style>{`
       * { box-sizing: border-box; }


       .progress-page {
         min-height: 100vh;
         padding: 25px;
         background: #000a06ff;
         color: white;
         font-family: Arial, sans-serif;
       }


       .progress-container {
         max-width: 1200px;
         margin: auto;
       }


       .progress-nav {
         display: flex;
         justify-content: space-between;
         align-items: center;
         padding: 17px 22px;
         background: #050505ff;
         border: 1px solid #202c1bff;
         border-radius: 15px;
         margin-bottom: 30px;
       }


       .progress-logo {
         color: #89ca2eff;
         font-size: 23px;
         font-weight: 900;
       }


       .progress-logo span { color: white; }


       .back-home {
         display: flex;
         align-items: center;
         gap: 8px;
         padding: 11px 15px;
         border-radius: 9px;
         background: #a7f23d;
         color: #040a08ff;
         text-decoration: none;
         font-size: 13px;
         font-weight: bold;
       }


       .progress-heading { margin-bottom: 25px; }


       .progress-heading h1 {
         margin: 0 0 10px;
         font-size: 35px;
       }


       .progress-heading h1 span { color: #a7f23d; }


       .progress-heading p {
         color: #9eaca1;
         line-height: 1.6;
       }


       .progress-stats {
         display: grid;
         grid-template-columns: repeat(4, minmax(0, 1fr));
         gap: 16px;
         margin-bottom: 28px;
       }


       .stat-card {
         padding: 22px;
         background: #010a05ff;
         border: 1px solid #293b30;
         border-radius: 15px;
       }


       .stat-icon {
         display: grid;
         place-items: center;
         width: 43px;
         height: 43px;
         margin-bottom: 15px;
         border-radius: 12px;
         background: #243820;
         color: #a7f23d;
       }


       .stat-card p {
         color: #a9b6ab;
         font-size: 13px;
       }


       .stat-card h2 { margin-bottom: 0; }


       .stat-card small {
         color: #77ac3bff;
         font-size: 12px;
       }


       .progress-panel {
         padding: 24px;
         margin-bottom: 25px;
         background: #010a05ff;
         border: 1px solid #293b30;
         border-radius: 17px;
       }


       .progress-panel h2 { margin-top: 0; }


       .panel-subtitle {
         margin-bottom: 25px;
         color: #9eaca1;
         font-size: 13px;
       }


       .weekly-chart {
         display: flex;
         align-items: end;
         justify-content: space-around;
         gap: 15px;
         height: 180px;
       }


       .chart-column {
         display: flex;
         flex: 1;
         height: 100%;
         flex-direction: column;
         justify-content: end;
         align-items: center;
         gap: 10px;
       }


       .chart-bar {
         width: 100%;
         max-width: 42px;
         min-height: 8px;
         background: #263fceff;
         border-radius: 8px 8px 0 0;
       }


       .chart-column span {
         color: #a9b6ab;
         font-size: 12px;
       }


       .workout-grid {
         display: grid;
         grid-template-columns: repeat(3, minmax(0, 1fr));
         gap: 20px;
       }


       .workout-card {
         overflow: hidden;
         background: #101d16;
         border: 1px solid #293b30;
         border-radius: 16px;
         transition: transform .2s;
       }


       .workout-card:hover {
         transform: translateY(-4px);
         border-color: #a7f23d;
       }


       .workout-image {
         display: block;
         width: 100%;
         height: 190px;
         object-fit: cover;
         background: #1b2a20;
       }


       .workout-details { padding: 18px; }


       .workout-details h3 { margin-top: 0; }


       .workout-details p {
         color: #a9b6ab;
         font-size: 13px;
       }


       .workout-calories {
         color: #a7f23d !important;
         font-weight: bold;
       }


       .workout-status {
         display: flex;
         align-items: center;
         gap: 7px;
         margin-top: 15px;
         color: #a7f23d;
         font-size: 12px;
       }


       .goal-box {
         display: flex;
         align-items: center;
         gap: 15px;
         padding: 18px;
         margin-top: 20px;
         background: #19281b;
         border-radius: 12px;
       }


       .goal-box svg { color: #a7f23d; }


       .goal-box p {
         margin-bottom: 0;
         color: #a9b6ab;
         font-size: 13px;
         line-height: 1.5;
       }


       .progress-footer {
         padding: 25px 0;
         color: #829084;
         text-align: center;
         font-size: 12px;
       }


       @media (max-width: 850px) {
         .progress-stats { grid-template-columns: repeat(2, 1fr); }
         .workout-grid { grid-template-columns: repeat(2, 1fr); }
       }


       @media (max-width: 520px) {
         .progress-page { padding: 14px; }
         .progress-heading h1 { font-size: 28px; }
         .progress-stats { gap: 10px; }
         .stat-card { padding: 15px; }
         .progress-panel { padding: 16px; }
         .workout-grid { grid-template-columns: 1fr; }
         .progress-nav { padding: 13px; }
         .progress-logo { font-size: 19px; }
         .back-home { padding: 10px; }
       }
     `}</style>


     <div className="progress-container">
       <nav className="progress-nav">
         <div className="progress-logo">
           FIT<span>LIFE</span>
         </div>


         <Link to="/" className="back-home">
           <Home size={17} />
           Back to Home
         </Link>
       </nav>


       <header className="progress-heading">
         <h1>
           My <span>Progress</span>
         </h1>
         <p>Track your fitness journey and celebrate your achievements.</p>
       </header>


       <section className="progress-stats">
         <div className="stat-card">
           <div className="stat-icon"><Flame /></div>
           <p>Calories Burned</p>
           <h2>1,250 <small>kcal</small></h2>
         </div>


         <div className="stat-card">
           <div className="stat-icon"><Clock /></div>
           <p>Workout Time</p>
           <h2>4.5 <small>hours</small></h2>
         </div>


         <div className="stat-card">
           <div className="stat-icon"><Dumbbell /></div>
           <p>Workouts Done</p>
           <h2>12 <small>sessions</small></h2>
         </div>


         <div className="stat-card">
           <div className="stat-icon"><Target /></div>
           <p>Weekly Goal</p>
           <h2>75<small>%</small></h2>
         </div>
       </section>


       <section className="progress-panel">
         <h2>
           <TrendingUp
             color="#a7f23d"
             size={21}
             style={{ verticalAlign: "middle", marginRight: 8 }}
           />
           Weekly Activity
         </h2>


         <p className="panel-subtitle">
           Your sample workout activity for this week
         </p>


         <div className="weekly-chart">
           {weekly.map((item) => (
             <div className="chart-column" key={item.day}>
               <div
                 className="chart-bar"
                 style={{ height: `${item.value}%` }}
                 title={`${item.value}%`}
               />
               <span>{item.day}</span>
             </div>
           ))}
         </div>


         <div className="goal-box">
           <Target size={30} />
           <div>
             <strong>Keep Going!</strong>
             <p>Stay consistent and keep working toward your fitness goals.</p>
           </div>
         </div>
       </section>


       <section className="progress-panel">
         <h2>Workout Activity</h2>
         <p className="panel-subtitle">
           Explore your workout sessions.
         </p>


         <div className="workout-grid">
           {workouts.map((workout) => (
             <article className="workout-card" key={workout.name}>
               <img
                 className="workout-image"
                 src={workout.image}
                 alt={workout.name}
                 loading="lazy"
               />


               <div className="workout-details">
                 <h3>{workout.name}</h3>
                 <p>
                   <Clock size={14} style={{ verticalAlign: "middle" }} />
                   {" "}{workout.duration}
                 </p>


                 <p className="workout-calories">
                   <Flame size={14} style={{ verticalAlign: "middle" }} />
                   {" "}{workout.calories}
                 </p>


                 <div className="workout-status">
                   <CheckCircle size={16} />
                   Example Workout
                 </div>
               </div>
             </article>
           ))}
         </div>
       </section>


       <footer className="progress-footer">
         FITLIFE · Every step counts toward a healthier you.
       </footer>
     </div>
   </main>
 );
}
