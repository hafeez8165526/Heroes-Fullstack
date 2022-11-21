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

import ShowProducts from "./components/ShowProducts";
import HeroDetails from "./components/ProductDetails";
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
              path="/showProducts"
              element={<ShowProducts className="show-heroes" />}
            />
             <Route path="/cart" element={<Cart />} />
            <Route path="/viewProduct/*" element={<HeroDetails />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
