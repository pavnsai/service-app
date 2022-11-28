import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ServicePage from "./components/ServicePage";
import React from "react";

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
      </div>
    </BrowserRouter>
  );
}

export default App;
