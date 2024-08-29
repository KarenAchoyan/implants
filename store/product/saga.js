import {takeLatest, call, put} from 'redux-saga/effects';
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    filterProducts, callProduct, callOrders, completedOrder,
} from './actions';
import axiosInstance from 'configs/axiosIntance';

function* fetchProductsSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/products', payload));
        const products = response.data;
        yield put(getProducts.success(products));
    } catch (error) {
        yield put(getProducts.failure(error.message));
    }
}
function* fetchOrdersSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/products/ordering/all', payload));
        const products = response.data;
        yield put(callOrders.success(products));
    } catch (error) {
        yield put(callOrders.failure(error.message));
    }
}


function* fetchFilterProducts({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get(`/products/filter/${payload.id}?min=${payload.min}&max=${payload.max}&categories=${payload.categories}`, payload));
        const products = response.data.data;
        yield put(filterProducts.success(products));
    } catch (error) {
        yield put(filterProducts.failure(error.message));
    }
}


function* addProductSaga(action) {
    debugger
    try {
        const newProduct = yield call(() => axiosInstance.post('/products', action.payload));
        yield put(addProduct.success(newProduct));
    } catch (error) {
        yield put(addProduct.failure(error.message));
    }
}

function* updateProductSaga(action) {
    try {
        const {id, formData} = action.payload;
        const updatedProduct = yield call(() => axiosInstance.post(`/products/${id}`, formData));
        yield put(updateProduct.success(updatedProduct.data.product));
    } catch (error) {
        yield put(updateProduct.failure(error.message));
    }
}

function* completedProductSaga(action) {
    try {
        const {id} = action.payload;
        const updatedProduct = yield call(() => axiosInstance.get(`/products/ordering/completed/${id}`));
        yield put(completedOrder.success(updatedProduct.data.order));
    } catch (error) {
        yield put(completedOrder.failure(error.message));
    }
}
function* callProductSaga(action) {
    try {
        const {id, formData} = action.payload;
        const updatedProduct = yield call(() => axiosInstance.post(`/products/ordering/${id}`, formData));
        yield put(callProduct.success(updatedProduct.data.order));
    } catch (error) {
        yield put(callProduct.failure(error.message));
    }
}

function* deleteProductSaga(action) {
    try {
        const {id} = action.payload;
        yield call(() => axiosInstance.delete(`/products/${id}`));
        yield put(deleteProduct.success(id));
    } catch (error) {
        yield put(deleteProduct.failure(error.message));
    }
}

export function* productSaga() {
    yield takeLatest(getProducts.request, fetchProductsSaga);
    yield takeLatest(filterProducts.request, fetchFilterProducts);
    yield takeLatest(addProduct.request, addProductSaga);
    yield takeLatest(updateProduct.request, updateProductSaga);
    yield takeLatest(deleteProduct.request, deleteProductSaga);
    yield takeLatest(callProduct.request, callProductSaga);
    yield takeLatest(callOrders.request, fetchOrdersSaga);
    yield takeLatest(completedOrder.request, completedProductSaga);
}
