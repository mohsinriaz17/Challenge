import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  productList: [],
  nextPage: 1,
  noMoreProducts: false,
  filter: null,

};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        productList: action.payload,
        nextPage: action.nextPage,
        noMoreProducts: action.noMoreProducts,
        filter: action.filter
      };
    }
    case FETCH_PRODUCTS_ERROR: {
      return { ...INITIAL_STATE };
    }
    default:
      return state;
  }
}
