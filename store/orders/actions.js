import { createAction } from 'redux-actions';

// Actions for Products CRUD
export const getOrders = {
  request: createAction('GET_ORDERS_REQUEST'),
  success: createAction('GET_ORDERS_SUCCESS'),
  failure: createAction('GET_ORDERS_FAILURE'),
};


export const addOrder = {
  request: createAction('ADD_ORDER_REQUEST'),
  success: createAction('ADD_ORDER_SUCCESS'),
  failure: createAction('ADD_ORDER_FAILURE'),
};

