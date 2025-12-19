import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import "./form.css";

function EditProduct() {
  const [productData, setProductData] = useState({});
  const [productImage, setProductImage] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  async function fetchProduct() {
    try {
      const product = await axios.get(`http://localhost:8000/${params.id}`);
      setProductData(product.data);
    } catch (error) {
      toast.error("Failed to load product");
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setProductData({ ...productData, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("desc", productData.desc);
      formData.append("price", productData.price);
      formData.append("rating", productData.rating);
      formData.append("review", productData.review);
      if (productImage) {
        formData.append("productImage", productImage);
      }

      await axios.patch(`http://localhost:8000/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update product");
    }
  }

  return (
    <div className="app-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Edit Product</h1>
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
                value={productData.title || ""}
                onChange={changeHandler}
                placeholder="Enter product title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="desc"
                value={productData.desc || ""}
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
                  value={productData.price || ""}
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
                  value={productData.rating || ""}
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
                value={productData.review || ""}
                onChange={changeHandler}
                placeholder="Enter review"
              />
            </div>

            <div className="form-group">
              <label>Product Image</label>
              {productData.productImage && (
                <div className="current-image">
                  <img
                    src={`http://localhost:8000${productData.productImage}`}
                    alt="Current"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <p style={{ fontSize: "0.85rem", color: "#666" }}>
                    Current image
                  </p>
                </div>
              )}
              <input
                type="file"
                onChange={(e) => setProductImage(e.target.files[0])}
                accept="image/*"
              />
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#999",
                  marginTop: "0.5rem",
                }}
              >
                Leave empty to keep current image
              </p>
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
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
