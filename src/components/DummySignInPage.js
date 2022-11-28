import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import { CartState } from "../context/Context";

const DummySignInPage = () => {
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
    history.push({
      pathname: "/",
    });
  }, []);

  return <div>DummySignInPage</div>;
};

export default withAuthenticator(DummySignInPage);
