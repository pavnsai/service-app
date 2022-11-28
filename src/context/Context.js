import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
// import { faker } from "@faker-js/faker";
import faker from "faker";

import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();
faker.seed(99);

const Context = ({ children }) => {
  const [products, updateProducts] = useState([]);
  useEffect(() => {
    console.log("updating");
    dispatch({
      type: "UPDATE",
      payload: {
        products: [
          {
            id: "ab7ddb0b-c39f-4490-8fd0-6c4ba6775e96",
            name: "Fantastic Frozen Gloves",
            price: "525.00",
            image: "http://placeimg.com/640/480/people",
            typeOfService: "Photography",
            inStock: 6,
            fastDelivery: true,
            ratings: 2,
          },
          {
            id: "368b4bd4-de36-4a91-8691-42138711c350",
            name: "Rustic Fresh Car",
            price: "553.00",
            image: "http://placeimg.com/640/480/animals",
            typeOfService: "Photography",
            inStock: 6,
            fastDelivery: true,
            ratings: 2,
          },
          {
            id: "84038fa6-cad5-44ff-b724-c80693feafed",
            name: "Intelligent Cotton Ball",
            price: "717.00",
            image: "http://placeimg.com/640/480/food",
            typeOfService: "Hair Saloon",
            inStock: 0,
            fastDelivery: false,
            ratings: 3,
          },
          {
            id: "64a4ffb2-ac3b-4492-941b-dfe0c5e0bdbb",
            name: "Small Fresh Keyboard",
            price: "919.00",
            image: "http://placeimg.com/640/480/abstract",
            typeOfService: "Photography",
            inStock: 0,
            fastDelivery: false,
            ratings: 3,
          },
          {
            id: "8186bcdb-3613-4973-8d37-9b4571c4d293",
            name: "Handmade Granite Bike",
            price: "355.00",
            image: "http://placeimg.com/640/480/animals",
            typeOfService: "Hair Saloon",
            inStock: 3,
            fastDelivery: true,
            ratings: 2,
          },
          {
            id: "c3cb8048-fc17-4662-b89c-e78605f1bb7c",
            name: "Ergonomic Rubber Ball",
            price: "903.00",
            image: "http://placeimg.com/640/480/sports",
            typeOfService: "Photography",
            inStock: 5,
            fastDelivery: false,
            ratings: 4,
          },
          {
            id: "ddac81c2-c48d-4b33-8b76-5999499bf1f3",
            name: "Ergonomic Plastic Tuna",
            price: "967.00",
            image: "http://placeimg.com/640/480/fashion",
            typeOfService: "Electronic Repair",
            inStock: 6,
            fastDelivery: false,
            ratings: 2,
          },
          {
            id: "a5dbe930-f13b-42fa-a0cc-42717dcffcfd",
            name: "Generic Frozen Cheese",
            price: "414.00",
            image: "http://placeimg.com/640/480/business",
            typeOfService: "Photography",
            inStock: 7,
            fastDelivery: true,
            ratings: 3,
          },
          {
            id: "a3adb1bd-3111-487f-ab62-4149190ab387",
            name: "Tasty Metal Pizza",
            price: "159.00",
            image: "http://placeimg.com/640/480/business",
            typeOfService: "Photography",
            inStock: 7,
            fastDelivery: false,
            ratings: 3,
          },
          {
            id: "40e23a62-d708-4ae0-9ea1-22090db637ad",
            name: "Awesome Granite Computer",
            price: "461.00",
            image: "http://placeimg.com/640/480/fashion",
            typeOfService: "Photography",
            inStock: 3,
            fastDelivery: false,
            ratings: 4,
          },
          {
            id: "519bc9bc-a0e4-4dce-90d6-b9175a4fe2f5",
            name: "Ergonomic Frozen Bacon",
            price: "427.00",
            image: "http://placeimg.com/640/480/nature",
            typeOfService: "Electronic Repair",
            inStock: 7,
            fastDelivery: true,
            ratings: 1,
          },
          {
            id: "041228ff-176c-4eb6-9026-01e957259dae",
            name: "Sleek Granite Computer",
            price: "448.00",
            image: "http://placeimg.com/640/480/food",
            typeOfService: "Hair Saloon",
            inStock: 5,
            fastDelivery: true,
            ratings: 5,
          },
          {
            id: "d7a48efe-434f-41d6-b8d1-a5d64fbf3156",
            name: "Handmade Soft Salad",
            price: "615.00",
            image: "http://placeimg.com/640/480/nightlife",
            typeOfService: "Hair Saloon",
            inStock: 5,
            fastDelivery: true,
            ratings: 1,
          },
          {
            id: "5dbca214-a00b-43e1-a34f-dd541f3172b7",
            name: "Handmade Steel Ball",
            price: "411.00",
            image: "http://placeimg.com/640/480/technics",
            typeOfService: "Electronic Repair",
            inStock: 7,
            fastDelivery: true,
            ratings: 1,
          },
          {
            id: "cdf386d1-b5c8-4479-acd8-3d08b481d409",
            name: "Awesome Granite Gloves",
            price: "741.00",
            image: "http://placeimg.com/640/480/food",
            typeOfService: "Electronic Repair",
            inStock: 7,
            fastDelivery: true,
            ratings: 3,
          },
          {
            id: "50ff4ddd-683b-4f46-8be2-df62ce00e5e7",
            name: "Awesome Metal Table",
            price: "698.00",
            image: "http://placeimg.com/640/480/food",
            typeOfService: "Photography",
            inStock: 5,
            fastDelivery: false,
            ratings: 2,
          },
          {
            id: "1104cd2d-d442-42b7-abed-78c456ff9c46",
            name: "Intelligent Metal Keyboard",
            price: "426.00",
            image: "http://placeimg.com/640/480/city",
            typeOfService: "Hair Saloon",
            inStock: 5,
            fastDelivery: false,
            ratings: 1,
          },
          {
            id: "629725bd-a9f1-4be9-a9da-0fa10ef55023",
            name: "Unbranded Granite Fish",
            price: "554.00",
            image: "http://placeimg.com/640/480/nightlife",
            typeOfService: "Electronic Repair",
            inStock: 7,
            fastDelivery: true,
            ratings: 1,
          },
          {
            id: "06f5602e-30b3-45c9-af27-08344bcb9606",
            name: "Fantastic Metal Chips",
            price: "675.00",
            image: "http://placeimg.com/640/480/abstract",
            typeOfService: "Hair Saloon",
            inStock: 3,
            fastDelivery: true,
            ratings: 1,
          },
          {
            id: "4f5c5c9e-4891-48c3-9c1c-e1a9ea31b34b",
            name: "Intelligent Concrete Fish",
            price: "191.00",
            image: "http://placeimg.com/640/480/technics",
            typeOfService: "Photography",
            inStock: 6,
            fastDelivery: true,
            ratings: 3,
          },
        ],
        services: [
          {
            id: "1a9ea31b-34b2-43b3-9198-7fc76cad5812",
            serviceName: "Photography",
            image:
              "http://photorest.net/wp-content/uploads/2015/07/photography-art-300x169.jpg",
          },
          {
            id: "5847168d-762a-4d0f-9830-9267bf3df39e",
            serviceName: "Electronic Repair",
            image:
              "https://www.globalspec.com/ImageRepository/LearnMore/20172/Soldering_a_0805f63417e41b9e4ba69c9b3d6c739f0998.png",
          },
          {
            id: "d672791c-e64f-465c-b463-0838917d211e",
            serviceName: "Hair Saloon",
            image: "http://placeimg.com/640/480/food",
          },
        ],
      },
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
    isLogin: false,
  });
  console.log(state);
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);

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
