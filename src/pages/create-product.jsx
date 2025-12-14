import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CreateProduct() {
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    price: "",
    rating: "",
    review: "",
  });
  const navigate = useNavigate();
  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setProduct({ ...product, [name]: value });
  }
  async function submitHandler(e) {
    e.preventDefault();
    const res = await axios.post(
      "https://admin-portal-integration-node.onrender.com/",
      product
    );
    console.log(res);
    toast.success("Product created successfully");
    navigate("/");
  }
  return (
    <div className="w-50 mx-auto my-4">
      <h2>Create Product</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Pants"
            name="title"
            value={product.title}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product info"
            name="desc"
            value={product.desc}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="15"
            name="price"
            value={product.price}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            placeholder="0-5"
            name="rating"
            value={product.rating}
            onChange={changeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>Review</Form.Label>
          <Form.Control
            type="text"
            placeholder="Client's Review"
            name="review"
            value={product.review}
            onChange={changeHandler}
          />
        </Form.Group>
        <Button type="submit" variant="success">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default CreateProduct;
