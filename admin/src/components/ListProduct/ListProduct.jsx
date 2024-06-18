import { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const API_URL = import.meta.env.VITE_API_URL;

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products/allproducts`);

      if (response.ok) {
        const productsData = await response.json();
        setAllProducts(productsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/products/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      await fetchAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-product">
      <h1>All Products</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                <img
                  src={product.image}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{product.name}</p>
                <p>€{product.old_price}</p>
                <p>€{product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => {
                    removeProduct(product.id);
                  }}
                  className="listproduct-remove-icon"
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
