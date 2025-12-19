import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../App.css";
import "./form.css";

function CreateProduct() {
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    price: "",
    rating: "",
    review: "",
  });
  const [productImage, setProductImage] = useState(null);
  const navigate = useNavigate();

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("desc", product.desc);
      formData.append("price", product.price);
      formData.append("rating", product.rating);
      formData.append("review", product.review);
      if (productImage) {
        formData.append("productImage", productImage);
      }

      await axios.post("http://localhost:8000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product created successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to create product");
    }
  }

  return (
    <div className="app-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Create Product</h1>
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            ← Back
          </button>
        </div>

        <div className="form-container">
          <form onSubmit={submitHandler} className="product-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={changeHandler}
                placeholder="Enter product title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="desc"
                value={product.desc}
                onChange={changeHandler}
                placeholder="Enter product description"
                rows="3"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={changeHandler}
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={product.rating}
                  onChange={changeHandler}
                  placeholder="0-5"
                  min="0"
                  max="5"
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Review</label>
              <input
                type="text"
                name="review"
                value={product.review}
                onChange={changeHandler}
                placeholder="Enter review"
              />
            </div>

            <div className="form-group">
              <label>Product Image</label>
              <input
                type="file"
                onChange={(e) => setProductImage(e.target.files[0])}
                accept="image/*"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
