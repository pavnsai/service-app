import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ServicePage from "./components/ServicePage";
import React from "react";
import { withAuthenticator, Button, Heading } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "./aws-exports";
import { Amplify, Auth, API, graphqlOperation } from "aws-amplify";
import CheckOut from "./components/CheckOut";
import DummySignInPage from "./components/DummySignInPage";

Amplify.configure(awsconfig);

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="App">
        <Route path="/" exact>
          <ServicePage />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/checkout">
          <CheckOut />
        </Route>
        <Route path="/login">
          <DummySignInPage />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
