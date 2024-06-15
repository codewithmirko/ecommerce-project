import Hero from "../components/Hero/Hero";
import NewCollections from "../components/NewCollections/NewCollections";
import Newsletter from "../components/Newsletter/Newsletter";
import Offers from "../components/Offers/Offers";
import Popular from "../components/Popular/Popular";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <Newsletter />
    </div>
  );
};

export default Shop;
