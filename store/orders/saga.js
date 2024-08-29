import {takeLatest, call, put} from 'redux-saga/effects';
import {
    getOrders,
    addOrder,
} from './actions';
import axiosInstance from 'configs/axiosIntance';

function* fetchOrdersSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/orders', payload));
        const clients = response.data;
        yield put(getOrders.success(clients));
    } catch (error) {
        yield put(getOrders.failure(error.message));
    }
}


function* addOrderSaga(action) {
    try {
        const newProduct = yield call(() => axiosInstance.post('/orders/add', action.payload));
        yield put(addOrder.success(newProduct));
    } catch (error) {
        yield put(addOrder.failure(error.message));
    }
}


export function* orderSaga() {
    yield takeLatest(getOrders.request, fetchOrdersSaga);
    yield takeLatest(addOrder.request, addOrderSaga);
}
