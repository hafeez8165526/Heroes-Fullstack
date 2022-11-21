import React from "react";
import Navabar from "./Navabar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import { Card, ListGroup, ListGroupItem, ModalTitle } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { BiCapsule, BiWindowClose } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import LoadingLogo from './LoadingLogo';
import {
  AnimatePresence,
  motion,
  LazyMotion,
  domAnimation,
  delay,
  LayoutGroup,
  List,
} from "framer-motion";

const gradients = [
  ["#00c9ff", "#92fe9d"],
  ["#fc00ff", "#00dbde"],
  ["#2c3e50", "#3498db"],
  ["#004ff9", "#fff94c"],
];

function Cart() {
  const [loaded, setloaded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const getCartItems = async () => {
    const items = await axios.get(
      `http://localhost:8089/cart/${localStorage.getItem("uname")}/all`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setCartItems(items.data);
    setloaded(true);
  };
  const removeCartItem = async (productId) => {
    const items = await axios.delete(
      `http://localhost:8089/cart/delete/${localStorage.getItem(
        "uname"
      )}/${productId}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setCartItems(items.data);
  };
  useEffect(() => {
    return () => {
      setloaded(false);
      getCartItems();
    };
  }, []);

  return (
    <div>
      <Navabar />

      {loaded === false ? (
       <LoadingLogo/>
      ) : (
        <div className="">
          <Card className=" m-auto w-3/5 min-h-full top-20 ">
            <div className="card-title m-auto">
              <h1>Cart Items</h1>
            </div>
            <div className="card-body text-center">
              <AnimatePresence>
                {cartItems.map((item, i) => {
                  return (
                    <>
                      <motion.div
                        initial={{ y: 150, x: 0, opacity: 0 }}
                        animate={{ y: 0, x: 0, opacity: 1 }}
                        whileHover={{
                          scale: 1.06,
                          transition: { duration: 0.3 },
                          backgroundColor: [
                            gradients[
                              i >= gradients.length
                                ? cartItems.length % (i === 0 ? 1 : i)
                                : i
                            ][0],
                            gradients[
                              i >= gradients.length
                                ? cartItems.length % (i === 0 ? 1 : i)
                                : i
                            ][1],
                          ],
                        }}
                        exit={{ opacity: 0, duration: 0.5 }}
                        className="bg-slate-200 table-row shadow 
                       rounded-md
                    
                    "
                      >
                        <tr className="card-title ">
                          <ModalTitle className="m-auto  text-base font-medium">
                            {item.title}
                          </ModalTitle>
                          <GrClose
                            size="15px"
                            onClick={() => removeCartItem(item.uniq_Id)}
                            className=" m-2 inline-flex justify-end font-bold hover:scale-150 cursor-pointer "
                          />
                        </tr>
                        <ListGroup className="table  m-auto text-center col-auto ">
                          <ListGroupItem className="table-row m-auto text-center ">
                            <td>Id</td>

                            <i className="break-words  text-sm col-auto">
                              {item.uniq_Id}
                            </i>
                          </ListGroupItem>
                          <ListGroupItem className="table-row">
                            <td>Price</td>
                            <td className="badge badge-lg badge-secondary">
                              {item.price}
                            </td>
                          </ListGroupItem>
                        </ListGroup>
                      </motion.div>
                    </>
                  );
                })}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Cart;
