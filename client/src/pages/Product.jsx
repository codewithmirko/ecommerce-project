import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import { useParams } from "react-router-dom";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionsBox from "../components/DescriptionsBox/DescriptionsBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  return (
    <div className="product">
      <Breadcrumbs product={product} />
      <ProductDisplay product={product} />
      <DescriptionsBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
