import React, { useEffect } from "react";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import { CartState } from "../context/Context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const CheckOut = () => {
  const {
    state: { cart, isLogin, userName },
    dispatch,
    productDispatch,
  } = CartState();
  const history = useHistory();
  console.log(cart);
  console.log(userName);

  useEffect(() => {
    async function fetchData() {
      await axios
        .post("/", { request: "uploaddata", data: cart, userName: userName })
        .then(
          (res) => {
            dispatch({
              type: "CHANGE_LOGIN",
              payload: {
                state: true,
              },
            });
            dispatch({
              type: "CLEAR_CART",
              payload: {
                state: true,
              },
            });
            dispatch({
              type: "CHANGE_MODAL",
              payload: {
                modal: true,
              },
            });
            history.push({
              pathname: "/",
            });
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    fetchData();
  }, []);

  return (
    <div>
      <Spinner
        animation="grow"
        style={{ marginLeft: "40%", marginTop: "10%" }}
      />
      <Spinner animation="grow" />
      <Spinner animation="grow" />
    </div>
  );
};

export default withAuthenticator(CheckOut);
