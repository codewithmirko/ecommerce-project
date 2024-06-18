import "./NewCollections.css";
import new_collections from "../../assets/new_collections";
import Item from "../Items/Item";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const NewCollections = () => {
  const [new_collections, setNew_collections] = useState([]);

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      const response = await fetch(`${API_URL}/products/newcollection`);

      if (response.ok) {
        const collectionData = await response.json();
        setNew_collections(collectionData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => {
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

export default NewCollections;
