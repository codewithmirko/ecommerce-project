import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./components/Footer/Footer";
import men_banner from "./assets/banner_mens.png";
import women_banner from "./assets/banner_women.png";
import kids_banner from "./assets/banner_kids.png";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route
          path="/men"
          element={<ShopCategory category="men" banner={men_banner} />}
        />
        <Route
          path="/women"
          element={<ShopCategory category="women" banner={women_banner} />}
        />
        <Route
          path="/kids"
          element={<ShopCategory category="kid" banner={kids_banner} />}
        />
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="login" element={<LoginSignup />} />
        <Route path="*" element={<Shop />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
