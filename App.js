
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Wellness from "./pages/Wellness";
import Nutrition from "./pages/Nutrition";
import Progress from "./pages/Progress";
import GetStarted from "./pages/GetStarted";



import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wellness" element={<Wellness />} />
       <Route path="/nutrition" element={<Nutrition />} />
       <Route path="/progress" element={<Progress />} />
       <Route path="/" element={<GetStarted />} />
     

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;