import React, { useEffect, useState } from "react";
import { CartState } from "../Context/Context";
import { Button, Col, ListGroup, Row, Form, Image } from "react-bootstrap";
import Rating from "../Components/Rating";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + Number(cur.price)*cur.qty, 0));
  }, [cart]);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />{" "}
                  {/**fluid-takes full width of the section */}
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>₹ {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control as="select" value={prod.qty}
                  
                  onChange={(e)=>
                    dispatch({
                      type:'CHANGE_CART_QTY',
                      payload:{
                        id:prod.id,
                        qty:e.target.value,
                      }
                    })
                  }>
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option> //qty starts from 1, keys start from 0: x+1
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }>
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span>Total: ₹{total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
