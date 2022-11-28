import { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();
  const history = useHistory();

  useEffect(() => {
    const roads = [
      {
        id: "d7a48efe-434f-41d6-b8d1-a5d64fbf3156",
        name: "Handmade Soft Salad",
        price: "615.00",
        image: "http://placeimg.com/640/480/nightlife",
        typeOfService: "Hair Saloon",
        inStock: 5,
        fastDelivery: true,
        ratings: 1,
        qty: 1,
      },
    ];
    let cartAmount = Number(0);
    cart.forEach((element) => {
      cartAmount += Number(element.qty.toString().substring(0, 1)); //* Number(element.qty.substring(0, 1));
    });
    console.log(cartAmount);
    console.log(cart);
    setTotal(
      cart.reduce((acc, curr) => {
        console.log(curr.qty);
        return (
          acc + Number(curr.price) * Number(curr.qty.toString().substring(0, 1))
        );
      }, 0)
    );
  }, [cart]);

  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => {
        dispatch({
          type: "CHANGE_LOGIN",
          payload: {
            state: true,
          },
        });
        console.log(user);
      })
      .catch((err) => {
        dispatch({
          type: "CHANGE_LOGIN",
          payload: {
            state: false,
          },
        });
        console.log(err);
      });
  }, []);

  return (
    <div className="home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>₹ {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) => {
                      console.log(e.target.value);
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      });
                    }}
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>
                        {x + 1}
                        {x + 1 === 1 ? "hour" : "hours"}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
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
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <Button
          type="button"
          disabled={cart.length === 0}
          variant="dark"
          onClick={() => {
            history.push({
              pathname: "/checkout",
              state: {
                data: "jds",
              },
            });
          }}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
