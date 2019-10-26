import axios from 'axios';
import { API_BASE, AXIOS_CONFIG } from '../constants';
import { FETCH_PRODUCTS, FETCH_PRODUCTS_ERROR } from './types';

export const fetchProducts = (filter, forceRefresh = false) => async (dispatch, getState) => {
  try {
    let isNewFilter = (getState().lists.filter != filter) || forceRefresh;
    let nextPage = isNewFilter ? 1 : getState().lists.nextPage;
    let payload = isNewFilter ? [] : getState().lists.productList;
    if (isNewFilter) {
      //clear existing list
      dispatch({
        type: FETCH_PRODUCTS,
        payload: [],
        nextPage: 1,
        noMoreProducts: false,
        filter
      });
    }

    const res = await axios.get(`${API_BASE}_sort=${filter}&_page=${nextPage}&_limit=40`, AXIOS_CONFIG);
    if (res.data.length != 0) {
      //found more products
      dispatch({
        type: FETCH_PRODUCTS,
        payload: [...payload, ...res.data],
        nextPage: nextPage + 1,
        noMoreProducts: false,
        filter
      });
      return true;
    } else {
      //no more products, got empty array
      dispatch({
        type: FETCH_PRODUCTS,
        payload,
        nextPage,
        noMoreProducts: true,
        filter
      });
    }
    return false;
  } catch (e) {
    dispatch({ type: FETCH_PRODUCTS_ERROR });
    console.log('ERROR: fetchProducts', e.message);
    alert('Could not load the products\nPlease try again later');
    return false;
  }
};
