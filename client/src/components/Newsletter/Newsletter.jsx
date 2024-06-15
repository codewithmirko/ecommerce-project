import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers on your Email</h1>
      <p>Subscribe to our Newsletter and stay updated</p>
      <div>
        <input type="email" placeholder="Your E-Mail Address" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default Newsletter;
