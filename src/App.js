import React, { Component } from "react";
import Products from "./Component/Products";
import Filter from "./Component/Filter";
import Basket from "./Component/Basket";
import Navbar from "./Component/Navbar";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      size: "",
      sort: "",
      cartItems: [],
      products: [],
      filteredProducts: []
    };
  }

  componentWillMount() {
    if (localStorage.getItem("cartItems")) {
      this.setState({
        cartItems: JSON.parse(localStorage.getItem("cartItems"))
      });
    }

    fetch("")
      .then((res) => res.json())
      .catch((err) =>
        fetch("db.json")
          .then((res) => res.json())
          .then((data) => data.products)
      )
      .then((data) => {
        this.setState({ products: data });
        this.listProducts();
      });
  }

  handleRemoveFromCart = (e, product) => {
    this.setState((state) => {
      const cartItems = state.cartItems.filter((a) => a.id !== product.id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  handleAddToCart = (e, product) => {
    this.setState((state) => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;
      cartItems.forEach((c) => {
        if (c.id === product.id) {
          c.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  };

  listProducts = () => {
    this.setState((state) => {
      if (state.sort !== "") {
        state.products.sort((a, b) =>
          state.sort === "lowestprice"
            ? a.price > b.price
              ? 1
              : -1
            : a.price < b.price
            ? 1
            : -1
        );
      } else {
        state.products.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      if (state.size !== "") {
        return {
          filteredProducts: state.products.filter(
            (a) => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0
          )
        };
      }
      return { filteredProducts: state.products };
    });
  };
  handleSortChange = (e) => {
    this.setState({ sort: e.target.value });
    this.listProducts();
  };
  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
    this.listProducts();
  };

  render() {
    return (
      <div className="">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <Filter
                count={this.state.filteredProducts.length}
                handleSortChange={this.handleSortChange}
                handleSizeChange={this.handleSizeChange}
              />
              <hr />
              <Products
                products={this.state.filteredProducts}
                handleAddToCart={this.handleAddToCart}
                className="img"
              />
            </div>
            <div className="col-md-3">
              <Basket
                cartItems={this.state.cartItems}
                handleRemoveFromCart={this.handleRemoveFromCart}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
