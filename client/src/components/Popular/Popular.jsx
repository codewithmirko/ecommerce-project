import "./Popular.css";
import Item from "../Items/Item";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

console.log("before");
const apiUrl = API_URL;
console.log("after");

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetchPopularItems();
  }, []);

  const fetchPopularItems = async () => {
    try {
      const response = await fetch(`${API_URL}/products/popular-women`);

      if (response.ok) {
        const popularItemsData = await response.json();
        setPopularProducts(popularItemsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
