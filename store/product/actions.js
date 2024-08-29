import { createAction } from 'redux-actions';

// Actions for Products CRUD
export const getProducts = {
  request: createAction('GET_PRODUCTS_REQUEST'),
  success: createAction('GET_PRODUCTS_SUCCESS'),
  failure: createAction('GET_PRODUCTS_FAILURE'),
};

export const filterProducts = {
  request: createAction('FILTER_PRODUCTS_REQUEST'),
  success: createAction('FILTER_PRODUCTS_SUCCESS'),
  failure: createAction('FILTER_PRODUCTS_FAILURE'),
};

export const callProduct = {
  request: createAction('CALL_PRODUCT_REQUEST'),
  success: createAction('CALL_PRODUCT_SUCCESS'),
  failure: createAction('CALL_PRODUCT_FAILURE'),
};
export const callOrders = {
  request: createAction('CALL_ORDERS_REQUEST'),
  success: createAction('CALL_ORDERS_SUCCESS'),
  failure: createAction('CALL_ORDERS_FAILURE'),
};
export const completedOrder = {
  request: createAction('COMPLETED_ORDER_REQUEST'),
  success: createAction('COMPLETED_ORDER_SUCCESS'),
  failure: createAction('COMPLETED_ORDER_FAILURE'),
};

export const addProduct = {
  request: createAction('ADD_PRODUCT_REQUEST'),
  success: createAction('ADD_PRODUCT_SUCCESS'),
  failure: createAction('ADD_PRODUCT_FAILURE'),
};

export const updateProduct = {
  request: createAction('UPDATE_PRODUCT_REQUEST'),
  success: createAction('UPDATE_PRODUCT_SUCCESS'),
  failure: createAction('UPDATE_PRODUCT_FAILURE'),
};

export const deleteProduct = {
  request: createAction('DELETE_PRODUCT_REQUEST'),
  success: createAction('DELETE_PRODUCT_SUCCESS'),
  failure: createAction('DELETE_PRODUCT_FAILURE'),
};
