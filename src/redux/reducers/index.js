import SHOP_DATA from "../../shop-data";

const INITIAL_STATE = {
  productList: SHOP_DATA,
  basket: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADD_BASKET":
      const existingProductIndex = state.basket.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        const updatedBasket = state.basket.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, basket: updatedBasket };
      } else {
        const updatedBasket = [
          ...state.basket,
          { ...action.payload, quantity: 1 },
        ];
        return { ...state, basket: updatedBasket };
      }

    case "REMOVE_FROM_BASKET":
      const filteredBasket = state.basket.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, basket: filteredBasket };

    case "DECREASE_QUANTITY":
      const decreasedBasket = state.basket
        .map((item) => {
          if (item.id === action.payload.id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return null;
          }
          return item;
        })
        .filter((item) => item !== null);
      return { ...state, basket: decreasedBasket };

    default:
      return state;
  }
};
