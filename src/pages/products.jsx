import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import toast from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  async function fetchProducts() {
    // const res = await fetch("https://admin-portal-integration-node.onrender.com/");
    // console.log("res", res);
    // const data = await res.json();
    // console.log("data", data);
    const res = await axios.get(
      "https://admin-portal-integration-node.onrender.com"
    );
    console.log(res.data);
    setProducts(res.data);
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  async function deleteProduct(id) {
    const product = await axios.delete(
      `https://admin-portal-integration-node.onrender.com/${id}`
    );
    const singleProduct = products.filter(
      (meriProduct) => meriProduct._id !== id
    );
    setProducts(singleProduct);
    toast.success("Product deleted successfully");
  }
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
                <div className="d-flex align-items-center justify-content-between">
                  <Button variant="primary">Details</Button>
                  <div className="actions d-flex gap-2">
                    <MdDelete
                      className="fs-2 border p-1"
                      onClick={() => deleteProduct(meriProduct._id)}
                    />
                    <MdEdit
                      className="fs-2 border p-1"
                      onClick={() =>
                        navigate(`/edit-product/${meriProduct._id}`)
                      }
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
