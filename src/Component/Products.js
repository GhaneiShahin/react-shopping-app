import React, { Component } from "react";
import util from "../util";
import "./Products.css";

export default class Products extends Component {

  render() {
    const productItems = this.props.products.map((product) => (
      <div className="col-md-4" key={product.id}>
        <div className="thumbnail text-center img">
          <a
            href={`#${product.id}`}
            onClick={(e) => this.props.handleAddToCart(e, product)}
          >
            <img
              className=""
              src={`products/${product.sku}.jpg`}
              alt={product.title}
            />
            <p>{product.title}</p>
          </a>
          <b className="price">{util.formatCurrency(product.price)}</b>
          <button
            className="btn btn-success"
            onClick={(e) => this.props.handleAddToCart(e, product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    ));

    return <div className="row">{productItems}</div>;
  }
}
