import "./DescriptionsBox.css";

const DescriptionsBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An eCommerce shop is an online platform where businesses sell products
          or services directly to consumers over the internet. It allows
          customers to browse a catalog, add items to a virtual cart, and
          complete purchases through secure payment systems. eCommerce shops
          often feature user reviews, detailed product descriptions, and various
          shipping options. They can range from small independent stores to
          large, established retailers.
        </p>
        <p>
          An eCommerce shop is an online platform where businesses sell products
          or services directly to consumers over the internet. It allows
          customers to browse a catalog, add items to a virtual cart, and
          complete purchases
        </p>
      </div>
    </div>
  );
};

export default DescriptionsBox;
