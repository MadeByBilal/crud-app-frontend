import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import "../App.css";
import "./products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      const res = await axios.get("http://localhost:8000/");
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to load products");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function deleteProduct(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8000/${id}`);
        setProducts(products.filter((p) => p._id !== id));
        toast.success("Product deleted");
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  }

  return (
    <div className="app-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Products</h1>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/create-product")}
          >
            + Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", color: "#999" }}>
            <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
              No products yet
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/create-product")}
            >
              Create Your First Product
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img
                    src={
                      product.productImage
                        ? `http://localhost:8000${product.productImage}`
                        : "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={product.title}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                </div>
                <div className="product-content">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-desc">{product.desc}</p>
                  <div className="product-info">
                    <span className="product-price">${product.price}</span>
                    <span className="product-rating">⭐ {product.rating}</span>
                  </div>
                  {product.review && (
                    <p className="product-review">"{product.review}"</p>
                  )}
                  <div className="product-actions">
                    <button
                      className="btn-icon edit"
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                      title="Edit"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      className="btn-icon delete"
                      onClick={() => deleteProduct(product._id)}
                      title="Delete"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
