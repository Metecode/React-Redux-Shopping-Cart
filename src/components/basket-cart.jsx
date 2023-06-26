import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromBasket,
  addBasket,
} from "../redux/actions";

const BasketCart = (props) => {
  const totalPrice = props.basket.reduce(
    (total, product) => (total += product.price * product.quantity),
    0
  );

  const handleRemoveFromBasket = (productId) => {
    props.removeFromBasket(productId);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedBasket = props.basket.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    const product = updatedBasket.find((item) => item.id === productId);

    props.addBasket(product);
  };

  const handleDecreaseQuantity = (productId) => {
    const productIndex = props.basket.findIndex(
      (item) => item.id === productId
    );

    if (productIndex !== -1) {
      const updatedBasket = [...props.basket];
      const product = updatedBasket[productIndex];

      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        props.removeFromBasket(productId);
      }

      props.decreaseQuantity(
        updatedBasket.filter((item) => item.quantity >= 0)
      );
    }
  };
  return (
    <div>
      <h2>
        <Link to="/">&#10094; Alinacaklar Listem </Link> <span>Faturam</span>
      </h2>
      {props.basket.map((product) => (
        <div className="product">
          <img src={product.image} alt="product.name" />
          <div>
            <h4>{product.name}</h4>
            <p>Adet: {product.quantity}</p>
            <p>{product.price}&#8378;</p>
            <button onClick={() => handleRemoveFromBasket(product.id)}>
              Sepetten Cikar
            </button>
            <button onClick={() => handleIncreaseQuantity(product.id)}>
              Adeti Artır
            </button>
            <button onClick={() => handleDecreaseQuantity(product.id)}>
              Adeti Azalt
            </button>
          </div>
        </div>
      ))}
      <h3>Toplam Sepet Tutari: {totalPrice.toFixed(2)}&#8378;</h3>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    basket: state.basket,
  };
};

export default connect(mapStateToProps, {
  removeFromBasket,
  increaseQuantity,
  decreaseQuantity,
  addBasket,
})(BasketCart);
