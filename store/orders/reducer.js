import {handleActions} from 'redux-actions';
import {
    getOrders,
    addOrder,

} from './actions';

const initialState = {
    orders: [],
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    isLoading: true,
    error: null,
};

const orderReducer = handleActions(
    {
        [getOrders.request]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            isLoading: true,
        }),
        [getOrders.success]: (state, {payload}) => ({
            ...state,
            orders: payload,
            isFetching: false,
            isLoading: false,
        }),
        [getOrders.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            isLoading: false,
            error: payload,
        }),

        [addOrder.success]: (state, {payload}) => ({
            ...state,
            orders: [...state.orders, payload],
            isAdding: false,
        }),
        [addOrder.failure]: (state, {payload}) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),

    },
    initialState
);

export default orderReducer;
