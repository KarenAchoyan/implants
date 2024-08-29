import { createAction } from 'redux-actions';

// Actions for Products CRUD
export const getClients = {
  request: createAction('GET_CLIENTS_REQUEST'),
  success: createAction('GET_CLIENTS_SUCCESS'),
  failure: createAction('GET_CLIENTS_FAILURE'),
};



export const filterClients = {
  request: createAction('FILTER_CLIENTS_REQUEST'),
  success: createAction('FILTER_CLIENTS_SUCCESS'),
  failure: createAction('FILTER_CLIENTS_FAILURE'),
};



export const addClient = {
  request: createAction('ADD_CLIENT_REQUEST'),
  success: createAction('ADD_CLIENT_SUCCESS'),
  failure: createAction('ADD_CLIENT_FAILURE'),
};

export const updateClient = {
  request: createAction('UPDATE_CLIENT_REQUEST'),
  success: createAction('UPDATE_CLIENT_SUCCESS'),
  failure: createAction('UPDATE_CLIENT_FAILURE'),
};

export const deleteClient = {
  request: createAction('DELETE_CLIENT_REQUEST'),
  success: createAction('DELETE_CLIENT_SUCCESS'),
  failure: createAction('DELETE_CLIENT_FAILURE'),
};
