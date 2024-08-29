import {all} from "redux-saga/effects";
import {productSaga} from "./product/saga";
import {clientSaga} from "./client/saga";
import {orderSaga} from "./orders/saga";

function* rootSaga() {
    yield all([
        productSaga(),
        clientSaga(),
        orderSaga()
    ]);
}

export default rootSaga;
