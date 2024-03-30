import * as api from "../api";
import _stocks from "../data/stock";

export const getStocks = () => async (dispatch) => {
  try {
    //const { data } = await api.fetchStocks();
    dispatch({ type: "FETCH_ALL", payload: _stocks });
  } catch (error) {
    console.log(error.message);
  }
};

export const createStock = (stock) => async (dispatch) => {
  try {
    //const { data } = await api.createStock(stock);
    dispatch({ type: "CREATE", payload: stock });
  } catch (error) {
    console.log(error);
  }
};

export const deleteStock = (id) => async (dispatch) => {
  try {
    // await api.deleteStock(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error);
  }
};
