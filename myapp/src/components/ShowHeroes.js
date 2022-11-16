import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useNavigation, useLocation } from "react-router-dom";
// import Card from "../shared/Card";
import "animate.css";
import { useCart } from "react-use-cart";

import axios from "axios";
import ReactPaginate from "react-paginate";
import Navabar from "./Navabar";
import { Card, Button } from "react-bootstrap";
import { HiShoppingCart } from "react-icons/hi";

function ShowHeroes(props) {
  const [heroes, setHeroes] = useState([]);
  const {
    isEmpty,
    addItem,
    totalUniqueItems,
    items,
    updateItemQuntity,
    removeItem,
  } = useCart();

  const navi = useNavigate();
  const getHeroes = async () => {
    const req = await axios.get("http://localhost:8089/heroes/all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setHeroes(req.data);
  };
  const addItemToCart = async (hero) => {
    const add = await axios.post(
      `http://localhost:8089/heroes/cart/${localStorage.getItem("uname")}/${
        hero.id
      }`
    );
  };

  useEffect(() => {
    return () => {
      getHeroes();
    };
  }, []);
  return (
    <>
      <Navabar />
      <section className="bg">
        <div className="container">
          <div className="row">
            {heroes.slice(1, 7).map((hero) => {
              return (
                <Card key={hero.id}>
                  <i id="cart" className="pb-2 cursor-pointer hover:scale-105 hover:text-amber-500">
                    <HiShoppingCart
                      onClick={() => {
                        addItem(hero);
                        addItemToCart(hero);
                        navi(`/cart?uname=${localStorage.getItem("uname")}`);
                      }}
                      size="32px"
                    />
                  </i>

                  <Card.Img src={hero.image} id="hero-img" />
                  <Card.Title
                    id="hero-name"
                    className="animate__animated animate__rubberBand btn btn-ghost mt-3 text-md"
                    onClick={() => {
                      navi(`/viewHero?id=${hero.id}`);
                    }}
                  >
                    {hero.fullName}
                  </Card.Title>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default ShowHeroes;
