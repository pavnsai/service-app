import React, { useEffect } from "react";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import { CartState } from "../context/Context";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
        .post(
          "https://thucsi4ibdq7iqsbulp7fhbexu0dmaah.lambda-url.us-east-1.on.aws/",
          { request: "uploaddata", data: cart, userName: userName }
        )
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

  return <div>CheckOut</div>;
};

export default withAuthenticator(CheckOut);
