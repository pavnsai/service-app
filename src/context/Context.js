import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
// import { faker } from "@faker-js/faker";
import faker from "faker";
import axios from "axios";
import { cartReducer, productReducer } from "./Reducers";
import { Auth } from "aws-amplify";

const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
  const [products, updateProducts] = useState([]);
  let temp = false;
  useEffect(() => {
    console.log("updating");
    async function fetchData() {
      await axios
        .post(
          "https://thucsi4ibdq7iqsbulp7fhbexu0dmaah.lambda-url.us-east-1.on.aws/",
          { request: "getdata" }
        )
        .then(
          (res) => {
            dispatch({
              type: "UPDATE",
              payload: res.data,
            });
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
    }
    fetchData();

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

  // const products = [...Array(20)].map(() => ({
  //   id: faker.datatype.uuid(),
  //   name: faker.commerce.productName(),
  //   price: faker.commerce.price(),
  //   image: faker.random.image(),
  //   typeOfService: faker.random.arrayElement([
  //     "Photography",
  //     "Electronic Repair",
  //     "Hair Saloon",
  //   ]),
  //   inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
  //   fastDelivery: faker.datatype.boolean(),
  //   ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  // }));
  console.log(products);
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    services: [],
    cart: [],
    isLogin: temp,
    modal: false,
    userName: "",
  });
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
