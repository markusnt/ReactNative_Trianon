import { FETCH_PRODUCTS } from './types';
import { getProducts } from '../../data';



export const fetchProducts = () => dispatch => {
    const books = getProducts();
     dispatch({
        type: FETCH_PRODUCTS,
        payload: books
    })
}

export const fetchProducts = _cdsubgrupo => ({
    type : [
      ProductFetching,
      ProductSuccess,
      ProductError
    ],
    payload : {
      data : () => axios.get(`http://192.168.1.179:1337/produtoS/${_cdsubgrupo}`)
    }
  })