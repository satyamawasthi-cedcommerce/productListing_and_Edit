import "./App.css";
import "@shopify/polaris/build/esm/styles.css";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import ProductGrid from "./components/productListing/ProductGrid";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProductGrid />} />
      </Routes>
    </div>
  );
}

export default App;
