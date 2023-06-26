export const addBasket = (product) => {
  return { type: "ADD_BASKET", payload: { ...product, quantity: 1 } };
};

export const removeFromBasket = (productId) => {
  return { type: "REMOVE_FROM_BASKET", payload: { id: productId } };
};
export const increaseQuantity = (productId) => {
  return { type: "INCREASE_QUANTITY", payload: { id: productId } };
};

export const decreaseQuantity = (productId) => {
  return { type: "DECREASE_QUANTITY", payload: { id: productId } };
};
