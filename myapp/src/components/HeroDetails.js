import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { CartProvider, useCart } from "react-use-cart";
import { Card, ListGroup, ListGroupItem, Badge, Button } from "react-bootstrap";
import Navabar from "./Navabar";
function HeroDetails(props) {
  const [btnClass, setbtnClass] = useState("bg-primary");
  const {addItem,items}=useCart()
  console.log(items)
  const nav=useNavigate()
  const [windowClass, setwindowClass] = useState(`container shadow ${window.innerWidth>=414 ? 'stats' :'stat'}`)
  const setWindowClass=()=>{
  setwindowClass(`container shadow ${window.innerWidth>=414 ? 'stats' :'stat'}`)
  }
  window.onresize=()=>{
    setWindowClass()
  }
  const [hero, sethero] = useState({
    id: 1,
    name: "A-Bomb",
    slug: "1-a-bomb",

    intelligence: 38,
    strength: 100,
    speed: 17,
    durability: 80,
    power: 24,
    combat: 64,

    occupation: "Musician, adventurer, author; formerly talk show host",
  });
  const { search } = useLocation();
  const navi = useNavigate();
  let id = search.split("=")[1];
  useEffect(() => {
    return () => {
      getHero();
    };
  }, []);

  const getHero = async () => {
    const url = "http://localhost:8089/heroes/" + id;
    const req = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    sethero(req.data);
  };
  return (
    <div>
      <Navabar />
      {hero && (
        <Card>
          <Card.Title className="font-extrabold italic text-xl text-center">
            <h1 className="badge badge-lg p-3">{hero.fullName}</h1>
          </Card.Title>
          <Card.Body className="border-4 rounded-md">
            <ListGroup
              variant="flush"
              className=" container-fluid table table-compact"
            >
              <ListGroupItem variant="light" className="row list-group-flush">
                <div className="col-md-6 col-sm-6 col-xs-12 font-bold">
                  FullName
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  {hero.fullName}
                </div>
              </ListGroupItem>
              <ListGroupItem variant="light" className="row list-group-flush">
                <div className="col-md-6 col-sm-6 col-xs-12 font-bold">
                  Occupation
                </div>
                <div id="occ" className="col-md-6 col-sm-6 col-xs-12">
                  {hero.occupation}
                </div>
              </ListGroupItem>
              <ListGroupItem variant="light" className="row">
                <div>Stats</div>
                {/* <ListGroup horizontal> */}
                <ListGroup
                  horizontal
                  className={windowClass}
                >
                  <ListGroupItem className=" ">
                    <div className="stat-title text-bold">Intelligence</div>
                    {hero.intelligence >= 80 ? (
                      <div className="stat-value text-success">
                        {hero.intelligence}
                      </div>
                    ) : (
                      <div className="stat-value text-error">
                        {hero.intelligence}
                      </div>
                    )}
                  </ListGroupItem>
                  <ListGroupItem className="">
                    <div className=" stat-title ">Strength</div>
                    {hero.strength >= 80 ? (
                      <div className="stat-value text-success">
                        {hero.strength}
                      </div>
                    ) : (
                      <div className="stat-value text-error">
                        {hero.strength}
                      </div>
                    )}
                  </ListGroupItem>
                  <ListGroupItem className="  ">
                    <div className="stat-title">Speed</div>
                    {hero.speed >= 80 ? (
                      <div className="stat-value text-success">
                        {hero.speed}
                      </div>
                    ) : (
                      <div className="stat-value text-error">{hero.speed}</div>
                    )}
                  </ListGroupItem>
                  <ListGroupItem className="  ">
                    <div className="stat-title">Durability</div>
                    {hero.durability >= 80 ? (
                      <div className="stat-value text-success">
                        {hero.durability}
                      </div>
                    ) : (
                      <div className="stat-value text-error">
                        {hero.durability}
                      </div>
                    )}
                  </ListGroupItem>
                  {/* </ListGroup> */}
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
          <button className="btn bg-success animate animate__jackInTheBox"
          onClick={()=>{
            addItem(hero)
            nav("/cart")
          }}
          >
            Add To Cart
          </button>
        </Card>
      )}
      <button
        id="back-button"
        className="btn btn-hover"
        type="button"
        onClick={() => {
          setbtnClass("bg-primary");
          navi("/showHeroes");
        }}
      >
        <FontAwesomeIcon size="3x" icon={faArrowLeft} />
      </button>
    </div>
  );
}

export default HeroDetails;
