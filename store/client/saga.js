import {takeLatest, call, put} from 'redux-saga/effects';
import {
    getClients,
    addClient,
    updateClient,
    deleteClient,
    filterClients,
} from './actions';
import axiosInstance from 'configs/axiosIntance';

function* fetchClientSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/clients', payload));
        const clients = response.data;
        yield put(getClients.success(clients));
    } catch (error) {
        yield put(getClients.failure(error.message));
    }
}


function* fetchFilterClients({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get(`/clients/filter/${payload.id}?min=${payload.min}&max=${payload.max}&categories=${payload.categories}`, payload));
        const clients = response.data.data;
        yield put(filterClients.success(clients));
    } catch (error) {
        yield put(filterClients.failure(error.message));
    }
}


function* addClientSaga(action) {
    try {
        const newProduct = yield call(() => axiosInstance.post('/clients', action.payload));
        yield put(addClient.success(newProduct));
    } catch (error) {
        yield put(addClient.failure(error.message));
    }
}

function* updateClientSaga(action) {
    try {
        const {id, formData} = action.payload;

        const updatedProduct = yield call(() => axiosInstance.post(`/clients/${id}`, formData));
        yield put(updateClient.success(updatedProduct.data.data));
    } catch (error) {
        yield put(updateClient.failure(error.message));
    }
}

function* deleteClientSaga(action) {
    try {
        const {payload: clientId} = action;
        yield call(() => axiosInstance.delete(`/clients/${clientId}`));
        yield put(deleteClient.success(clientId));
    } catch (error) {
        yield put(deleteClient.failure(error.message));
    }
}

export function* clientSaga() {
    yield takeLatest(getClients.request, fetchClientSaga);
    yield takeLatest(filterClients.request, fetchFilterClients);
    yield takeLatest(addClient.request, addClientSaga);
    yield takeLatest(updateClient.request, updateClientSaga);
    yield takeLatest(deleteClient.request, deleteClientSaga);
}
