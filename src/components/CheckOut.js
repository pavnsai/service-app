import React, { useEffect } from "react";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import { CartState } from "../context/Context";
import { useHistory } from "react-router-dom";

const CheckOut = () => {
  const {
    state: { cart, isLogin },
    dispatch,
    productDispatch,
  } = CartState();
  const history = useHistory();

  useEffect(() => {
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
    history.push({
      pathname: "/",
      state: {
        data: { value: true },
      },
    });
  }, []);

  return <div>CheckOut</div>;
};

export default withAuthenticator(CheckOut);
