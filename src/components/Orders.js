import React, { useEffect, useState } from "react";
import { withAuthenticator, Heading } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { CartState } from "../context/Context";
import axios from "axios";
import { Paginated } from "./Paginated";
import datajson from "./data.json";
import datajson2 from "./data2.json";
import { COLUMNS, ORDER_COLUMNS, COLUMNS2 } from "./column";
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
const Orders = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData(user) {
      await axios
        .post(
          "https://thucsi4ibdq7iqsbulp7fhbexu0dmaah.lambda-url.us-east-1.on.aws/",
          { request: "pastdata", userName: user }
        )
        .then(
          (res) => {
            setData(res.data.pastData);
          },
          (error) => {
            console.log(error);
          }
        );
    }
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
        dispatch({
          type: "CHANGE_USERNAME",
          payload: {
            userName: user.username,
          },
        });
        fetchData(user.username);
        console.log(user);
      })
      .catch((err) => {
        dispatch({
          type: "CHANGE_LOGIN",
          payload: {
            state: false,
          },
        });
        dispatch({
          type: "CHANGE_USERNAME",
          payload: {
            userName: "",
          },
        });
        console.log(err);
      });
  }, []);

  return data && data.length !== 0 ? (
    <Container style={{ marginTop: "20px" }}>
      <Paginated data={data} columns={ORDER_COLUMNS} />
    </Container>
  ) : (
    <div>hi</div>
  );
};

export default withAuthenticator(Orders);
