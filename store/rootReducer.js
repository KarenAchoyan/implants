import { combineReducers } from "redux";
import productReducer from "./product/reducer";
import clientReducer from "./client/reducer";
import orderReducer from "./orders/reducer";

const rootReducer = combineReducers({
    product: productReducer,
    client:clientReducer,
    order:orderReducer
})

export default rootReducer;
