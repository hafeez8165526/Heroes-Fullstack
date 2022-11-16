import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { CartProvider, useCart } from "react-use-cart";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import ShowHeroes from "./components/ShowHeroes";
import HeroDetails from "./components/HeroDetails";
import Login from "./components/Login";
import Home from "./components/Home";
import Navabar from "./components/Navabar";
import Cart from './components/Cart';
function App() {
  const [getId, setgetHeroId] = useState("");
  const [heroClicked, setheroClicked] = useState(false);
  const getHeroId = (id) => {
    setgetHeroId(id);
    setheroClicked(true);
  };
  const setheroClick = (val) => {
    setheroClicked(val);
  };

  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home/*" element={<Home />} />
            <Route path="/:reset" element={<Login />} />
            <Route
              path="/showHeroes"
              element={<ShowHeroes className="show-heroes" />}
            />
             <Route path="/cart" element={<Cart />} />
            <Route path="/viewHero/*" element={<HeroDetails />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
