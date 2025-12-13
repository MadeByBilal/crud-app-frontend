import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  async function fetchProducts() {
    // const res = await fetch("http://localhost:8000/");
    // console.log("res", res);
    // const data = await res.json();
    // console.log("data", data);
    const res = await axios.get("http://localhost:8000");
    console.log(res.data);
    setProducts(res.data);
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-75 mx-auto my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>All Products</h1>
        <Button variant="secondary" onClick={() => navigate("/create-product")}>
          {/* <Link to="/create-product">Create Product</Link> */}
          Create Product
        </Button>
      </div>
      <div
        className="d-flex justify-content-center gap-4 mt-4"
        style={{ flexWrap: "wrap" }}
      >
        {products.map((meriProduct) => {
          return (
            <Card style={{ width: "300px" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{meriProduct.title}</Card.Title>
                <Card.Text>{meriProduct.desc}</Card.Text>
                <Card.Text>Price: ${meriProduct.price}</Card.Text>
                <Card.Text>Rating: {meriProduct.rating}</Card.Text>
                <Card.Text>Review: {meriProduct.review}</Card.Text>
                <Button variant="primary">Details</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
