import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Card, ListGroup, ListGroupItem, Badge, Button } from "react-bootstrap";
import Navabar from "./Navabar";
import Footer from "./Footer";
import LoadingLogo from './LoadingLogo';
function ProductDetails(props) {
  const nav = useNavigate();
  const [loaded, setloaded] = useState(false)
  
  
  const addItemToCart = async (hero) => {
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
  const [product, setProduct] = useState({
    url: "https://www.argos.co.uk/product/1021174",

    currency: "GBP",
    uniq_Id: "9e20b264-14c8-5e3b-a4bb-c6862b277745",
    title: "Morphy Richards Accents 5 Piece Tool Set - Black",
    images:
      "media.4rgos.it/i/Argos/1021174_R_Z001A_UC1425802 | media.4rgos.it/i/Argos/1021174_R_Z001A_UC17689180",
    sku: 1021174.0,
    scraped_at: "29:21.6",
    price: 30.0,
  });
  const { search } = useLocation();
  const navi = useNavigate();
  let id = search.split("=")[1];
  useEffect(() => {
    return () => {
      setloaded(false)
      getProduct();
    };
  }, []);

  const getProduct = async () => {
    const url = "http://localhost:8089/products/" + id;
    const req = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setProduct(req.data);
    setloaded(true)
  };
  return (
    <div>
      <Navabar />
      {loaded===false ? <LoadingLogo/>:
      (
        <>
      {product && (
        
        <Card id="show-item" className=" top-20">
        <Card.Title className="font-extrabold italic text-xl text-center m-auto pb-1 hover:scale-125 hover:animate-bounce">
        <h1 className="badge badge-lg p-3 badge-info">{product.title}</h1>
          </Card.Title>
          <Card.Body className="border-4 rounded-md">
          <ListGroup
          variant="flush"
          className=" container-fluid table table-compact"
          >
          <ListGroupItem variant="light" className="row list-group-flush">
          <div className="col-md-6 col-sm-6 col-xs-12 font-bold">
          Title
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                {product.title}
                </div>
              </ListGroupItem>
              <ListGroupItem variant="light" className="row list-group-flush">
                <div className="col-md-6 col-sm-6 col-xs-12 font-bold">SKu</div>
                <div id="occ" className="col-md-6 col-sm-6 col-xs-12">
                  {product.sku}
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
            
          <button
            className=" btn bg-success animate animate__jackInTheBox"
            onClick={() => {
              addItemToCart(product);
              nav("/cart");
            }}
            >
            Add To Cart
          </button>
        </Card>
      )}
      </>)
    }

      <button
        id="back-button"
        className="btn top-20 "
        type="button"
        onClick={() => {
          navi("/showProducts");
        }}
        >
        <FontAwesomeIcon size="3x" icon={faArrowLeft} />
      </button>
      <Footer />
    </div>
  );
}

export default ProductDetails;
