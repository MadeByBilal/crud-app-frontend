import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import CreateProduct from "./pages/create-product";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
