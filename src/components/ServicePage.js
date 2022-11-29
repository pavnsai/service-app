import React, { useState, useEffect } from "react";
import { CartState } from "../context/Context";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";

const ServicePage = () => {
  const {
    state: { products, services, modal },
    dispatch,
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();
  const [spinner, setSpinner] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setModalOpen(modal);
  }, [modal]);
  const handleClickfromModal = () => {
    dispatch({
      type: "CHANGE_MODAL",
      payload: {
        modal: false,
      },
    });
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
