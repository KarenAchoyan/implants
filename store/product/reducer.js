import {handleActions} from 'redux-actions';
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    filterProducts,
    callProduct,
    callOrders, completedOrder
} from './actions';

const initialState = {
    products: [],
    orders: [],
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    isLoading: true,
    error: null,
};

const productReducer = handleActions(
    {
        [getProducts.request]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            isLoading: true,
        }),
        [getProducts.success]: (state, {payload}) => ({
            ...state,
            products: payload,
            isFetching: false,
            isLoading: false,
        }),
        [getProducts.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            isLoading: false,
            error: payload,
        }),
        [callOrders.request]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            isLoading: true,
        }),
        [callOrders.success]: (state, {payload}) => ({
            ...state,
            orders: payload,
            isFetching: false,
            isLoading: false,
        }),
        [callOrders.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            isLoading: false,
            error: payload,
        }),
        [filterProducts.success]: (state, {payload}) => ({
            ...state,
            products: payload,
            isFetching: false,
        }),
        [filterProducts.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [updateProduct.request]: (state, {payload}) => ({
            ...state,
            isUpdating: true,
        }),
        [updateProduct.success]: (state, {payload}) => ({
            ...state,
            products: state.products.map((product) =>
                product.id === payload.id ? payload : product
            ),
            isUpdating: false,
        }),
        [completedOrder.success]: (state, {payload}) => ({
            ...state,
            orders: state.orders.map((order) =>
                order.id === payload.id ? payload : order
            ),
            isUpdating: false,
        }),
        [completedOrder.failure]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [callProduct.request]: (state, {payload}) => ({
            ...state,
            isUpdating: true,
        }),
        [callProduct.success]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
        }),
        [updateProduct.failure]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),

        [addProduct.success]: (state, {payload}) => ({
            ...state,
            products: [...state.products, payload],
            isAdding: false,
        }),
        [addProduct.failure]: (state, {payload}) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [deleteProduct.success]: (state, {payload}) => ({
            ...state,
            products: state.products.filter((product) => product.id !== payload),
            isDeleting: false,
        }),
        [deleteProduct.failure]: (state, {payload}) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default productReducer;
