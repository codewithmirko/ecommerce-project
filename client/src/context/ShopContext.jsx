import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [token, setToken] = useState();
  const [all_product, setAll_Product] = useState([]);

  useEffect(() => {
    fetchAllProducts();

    if (localStorage.getItem("auth-token")) {
      console.log("Got the token, next will be fetching cart");
      fetchCart();
    }
  }, []);

  console.log("all products " + all_product);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products/allproducts`);

      if (response.ok) {
        const productData = await response.json();
        console.log("I am the " + productData);
        setAll_Product(productData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_URL}/products/getcart`, {
        method: "POST",
        headers: {
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      });

      if (response.ok) {
        const cartData = await response.json();
        setCartItems(cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (itemId) => {
    try {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      if (localStorage.getItem("auth-token")) {
        const response = await fetch(`${API_URL}/products/addtocart`, {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: itemId }),
        });

        if (response.ok) {
          const cartData = await response.json();
          console.log(cartData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(cartItems);

  const removeFromCart = async (itemId) => {
    try {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      if (localStorage.getItem("auth-token")) {
        const response = await fetch(`${API_URL}/products/removefromcart`, {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: itemId }),
        });

        if (response.ok) {
          const cartData = await response.json();
          console.log(cartData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      let itemAmount = cartItems[item];
      totalItems += itemAmount;
    }
    return totalItems;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    setToken,
    fetchAllProducts,
    fetchCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
