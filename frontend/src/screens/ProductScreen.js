import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

// Actions
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import MagnifyingGlass from "./MagnifyingGlass";

const ProductScreen = ({ match, history }) => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && id !== product._id) {
      // Use 'id' instead of 'match.params.id'
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id, product]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    navigate(`/cart`);
  };

  const handleHover = () => {
    if (product) {
      const text = `Product: ${product.name}, Price: $${product.price}, Description: ${product.description}`;
      const value = new SpeechSynthesisUtterance(text);

      value.onend = () => {
        const finishedText = "Product details have been read.";
        const finishedValue = new SpeechSynthesisUtterance(finishedText);

        window.speechSynthesis.speak(finishedValue);
      };

      window.speechSynthesis.speak(value);
    }
  };

  return (
    <div className="productscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              {product && (
                <MagnifyingGlass
                  imageSrc={product.imageUrl}
                  alt={product.name}
                />
              )}
            </div>
            <div className="left__info">
              <p className="left__name" onMouseEnter={handleHover}>
                {product && product.name}
              </p>
              <p onMouseEnter={handleHover}>
                Price: ${product && product.price}
              </p>
              <p onMouseEnter={handleHover}>
                Description: {product && product.description}
              </p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:
                <span>රු:{product && product.price}</span>
              </p>
              <p>
                Status:
                <span>
                  {product &&
                    (product.countInStock > 0 ? "In Stock" : "Out of Stock")}
                </span>
              </p>
              <p>
                Qty
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {product &&
                    [...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                </select>
              </p>
              <p>
                <button
                  type="button"
                  onClick={addToCartHandler}
                  onMouseEnter={handleHover}
                >
                  Add To Cart
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
