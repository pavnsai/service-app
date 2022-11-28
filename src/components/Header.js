import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";
import { AiFillDelete, AiTwotoneHome } from "react-icons/ai";
import { GrServices } from "react-icons/gr";
import { RiLogoutCircleRFill } from "react-icons/ri";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { CartState } from "../context/Context";
import "./styles.css";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Header = () => {
  const {
    state: { cart, isLogin },
    dispatch,
    productDispatch,
  } = CartState();
  const history = useHistory();
  const [loggedIn, setloggedIn] = useState(false);
  useEffect(() => {
    setloggedIn(isLogin);
  }, [isLogin]);
  async function signOut() {
    try {
      await Auth.signOut();
      setloggedIn(false);
      history.push({
        pathname: "/",
      });
      dispatch({
        type: "CHANGE_LOGIN",
        payload: {
          state: false,
        },
      });
      console.log("sined out");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return (
    <Navbar bg="primary" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <GrServices color="white" fontSize="40px" />{" "}
          <Link to="/">Service-Provider</Link>
        </Navbar.Brand>
        {/* <Navbar.Brand style={{ marginLeft: "0px" }}>
          <Link to="/">Service Provider</Link>
        </Navbar.Brand> */}
        <Navbar.Brand>
          <Link to="/">Home</Link>
        </Navbar.Brand>
        {!["cart", ""].includes(useLocation().pathname.split("/")[1]) && (
          <Navbar.Text className="search">
            <FormControl
              style={{ width: 500 }}
              type="search"
              placeholder="Search a professional..."
              className="m-auto"
              aria-label="Search"
              onChange={(e) => {
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </Navbar.Text>
          // <Form inline>
          //   <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          //   <Button variant="outline-info">Search</Button>
          // </Form>
        )}
        <Navbar.Brand>
          {" "}
          {loggedIn ? (
            <Link onClick={signOut}>
              <div>
                <Button
                  style={{ width: "95%", margin: "0 10px" }}
                  variant="danger"
                >
                  Logout
                </Button>
                {/* <RiLogoutCircleRFill color="white" fontSize="40px" /> Logout */}
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <div>
                <Button
                  style={{ width: "95%", margin: "0 10px" }}
                  variant="dark"
                >
                  Login
                </Button>
                {/* <FaSignInAlt color="white" fontSize="40px" /> Login */}
              </div>
            </Link>
          )}
        </Navbar.Brand>
        <Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        className="cartItemImg"
                        alt={prod.name}
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>₹ {prod.price.split(".")[0]}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_FROM_CART",
                            payload: prod,
                          })
                        }
                      />
                    </span>
                  ))}
                  <Link to="/cart">
                    <Button style={{ width: "95%", margin: "0 10px" }}>
                      Go To Cart
                    </Button>
                  </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>Cart is Empty!</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
