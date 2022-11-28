import React, { useEffect } from "react";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import { CartState } from "../context/Context";

const CheckOut = () => {
  const {
    state: { cart, isLogin },
    dispatch,
    productDispatch,
  } = CartState();
  useEffect(() => {
    dispatch({
      type: "CHANGE_LOGIN",
      payload: {
        state: true,
      },
    });
  }, []);

  return <div>CheckOut</div>;
};

export default withAuthenticator(CheckOut);
