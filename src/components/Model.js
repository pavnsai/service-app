import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, Card } from "react-bootstrap";
import Rating from "./Rating";

export default function Model({ handleClick, status, prod }) {
  return (
    <>
      <Modal show={status} onHide={handleClick}>
        <Modal.Header closeButton="true" closeVariant="white">
          <Modal.Title>{prod.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "400px", overflowY: "auto" }}>
          <Card>
            <img
              className="rounded-circle shadow-4-strong"
              alt={prod.name}
              src={prod.image}
            />
            <Card.Body>
              <Card.Title
                style={{ cursor: "pointer" }}
                // onClick={() => onClickFunction(prod)}
              >
                {prod.name}
              </Card.Title>
              <Card.Subtitle style={{ paddingBottom: 10 }}>
                <div>₹ {prod.price.split(".")[0]}</div>
              </Card.Subtitle>
              <div>₹ {prod.price.split(".")[0]}</div>
              <Rating rating={prod.ratings} />
              <div>₹ {prod.price.split(".")[0]}</div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
