import React from "react";
import { useState, useEffect } from "react";
import {
  useNavigate,
  useNavigation,
  useLocation,
  Link,
} from "react-router-dom";
import "animate.css";
import Footer from "./Footer";
import axios from "axios";
import Navabar from "./Navabar";
import LoaderIcon from "../logo.svg";
import { Card, Button } from "react-bootstrap";
import { HiShoppingCart } from "react-icons/hi";
import LoadingLogo from "./LoadingLogo";
const gradients = [
  ["#00c9ff", "#92fe9d"],
  ["#fc00ff", "#00dbde"],
  ["#2c3e50", "#3498db"],
  ["#004ff9", "#fff94c"],
];

function ShowProducts(props) {
  const [products, setProducts] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [sideMenuClass, setsideMenuClass] = useState(
    " row menu rounded-box w-36 bg-base-200 absolute right-8 top-26 "
  );
  const navi = useNavigate();
  const getProducts = async () => {
    const req = await axios.get("http://localhost:8089/products/all", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setProducts(req.data);
    setloaded(true);
  };
  const getProductsByCateogry = async (category) => {
    console.log(category)
    const req = await axios.get(`http://localhost:8089/products/all/${category}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setProducts(req.data);
    setloaded(true);
  };

  window.onresize = (e) => {
    if (window.innerWidth <= 827) {
      setsideMenuClass(
        "left-40 line border-spacing-1 min-w-max  menu menu-horizontal min-w-fit rounded-box w-36 -translate-y-7 -translate-x-24 bg-base-200 absolute right-13 top-24 "
      );
    } else {
      setsideMenuClass(
        "  row menu rounded-box w-36 bg-base-200 absolute right-8 top-24 "
      );
    }
  };

  const addItemToCart = async (product) => {
    const add = await axios.post(
      `http://localhost:8089/products/cart/${localStorage.getItem("uname")}/${
        product.uniq_Id
      }`,
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  };

  useEffect(() => {
    return () => {
      setloaded(false);
      getProducts();
    };
  }, []);
  return (
    <>
      <Navabar />
      {loaded === false ? (
        <LoadingLogo />
      ) : (
        <>
        <section className="container bg p-7 w-5/6 text-center mt-3">
          <div className=" relative justify-center  shrink mt-5 max-w-fit  menu menu-horizontal  bg-base-200 rounded-box ">
              <li onClick={()=>{
                  getProductsByCateogry("Game")
                }}>
                <Link >Games</Link>
              </li>
              <li>
                <Link onClick={()=>{
                  getProductsByCateogry("Tool")
                }}>Tools</Link>
              </li>
              <li>
                <Link onClick={()=>{
                  getProductsByCateogry("Radio")
                }}>Radios</Link>
              </li>
              <li>
                <Link onClick={()=>{
                  getProductsByCateogry("Bag")
                }}>Bags</Link>
              </li>
              <li>
                <Link onClick={()=>{
                  getProductsByCateogry("Chair")
                }}>Chairs</Link>
              </li>
              <li>
                <Link onClick={()=>{
                  getProductsByCateogry("Watch")
                }}>Watch</Link>
              </li>
            </div>
            <div className=" mt-5 ">
              <div className="row mr-1">
                {products.map((product) => {
                  return (
                    <Card
                      id="show-item"
                      key={product.uniq_Id}
                      className=" cursor-pointer hover:scale-105 hover:shadow-bg-slate-600"
                    >
                      <i
                        id="cart"
                        className="pb-2 m-2 absolute right-1 top-0 cursor-pointer  hover:text-amber-500"
                      >
                        <HiShoppingCart
                          className=""
                          onClick={() => {
                            addItemToCart(product);
                            navi(
                              `/cart?uname=${localStorage.getItem("uname")}`
                            );
                          }}
                          size="32px"
                        />
                      </i>
                      <Card.Img
                        className="mt-3 "
                        src={"https://" + product.images.split("|")[0].trim()}
                        id="hero-img"
                      />

                      <Card.Title
                        id="hero-name"
                        className="max-w-fit animate__animated animate__rubberBand btn btn-ghost mt-3 text-sm capitalize"
                        onClick={() => {
                          navi(`/viewProduct?id=${product.uniq_Id}`);
                        }}
                      >
                        {product.title}
                      </Card.Title>
                    </Card>
                  );
                })}
              </div>
            </div>

            
          </section>
        </>
      )}
      <Footer />
    </>
  );
}

export default ShowProducts;
