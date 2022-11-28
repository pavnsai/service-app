import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import { CartState } from "../context/Context";
import ServiceCard from "./ServiceCard";
import Model from "./Model";
import ServiceModal from "./ServiceModal";
import { useHistory, useLocation } from "react-router-dom";

const ServicePage = () => {
  const {
    state: { products, services },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();
  const location = useLocation();
  const prop = location.state?.data?.value;
  const [modalOpen, setModalOpen] = useState(false);
  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  useEffect(() => {
    // console.log("inside");
    const arr = [
      {
        id: "1a9ea31b-34b2-43b3-9198-7fc76cad5812",
        serviceName: "Photography",
        image: "http://placeimg.com/640/480/nature",
      },
      {
        id: "5847168d-762a-4d0f-9830-9267bf3df39e",
        serviceName: "Electronic Repair",
        image: "http://placeimg.com/640/480/cats",
      },
      {
        id: "d672791c-e64f-465c-b463-0838917d211e",
        serviceName: "Hair Saloon",
        image: "http://placeimg.com/640/480/food",
      },
    ];
    if (prop) setModalOpen(true);
    // updateServices(arr);
  }, []);
  const handleClickfromModal = () => {
    console.log("hello from modal");
    setModalOpen(false);
  };
  return (
    <div>
      <div style={{ marginLeft: "10%" }}>
        <h2>Choose the service you need</h2>
      </div>
      <div className="home">
        <div className="productContainer" style={{ marginLeft: "10%" }}>
          {services.map((prod) => (
            <ServiceCard prod={prod} key={prod.id} />
          ))}
        </div>
        {modalOpen && (
          <ServiceModal status={modalOpen} handleClick={handleClickfromModal} />
        )}
      </div>
    </div>
  );
};

export default ServicePage;
