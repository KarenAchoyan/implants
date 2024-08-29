import {handleActions} from 'redux-actions';
import {
    getClients,
    addClient,
    updateClient,
    deleteClient,
    filterClients,

} from './actions';

const initialState = {
    clients: [],
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    isLoading: true,
    error: null,
};

const clientReducer = handleActions(
    {
        [getClients.request]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            isLoading: true,
        }),
        [getClients.success]: (state, {payload}) => ({
            ...state,
            clients: payload,
            isFetching: false,
            isLoading: false,
        }),
        [getClients.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            isLoading: false,
            error: payload,
        }),
        [filterClients.success]: (state, {payload}) => ({
            ...state,
            clients: payload,
            isFetching: false,
        }),
        [filterClients.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [updateClient.request]: (state, {payload}) => ({
            ...state,
            isUpdating: true,
        }),
        [updateClient.success]: (state, {payload}) => ({
            ...state,
            clients: state.clients.map((client) =>
                client.id === payload.id ? payload : client
            ),
            isUpdating: false,
        }),
        [updateClient.failure]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),

        [addClient.success]: (state, {payload}) => ({
            ...state,
            clients: [...state.clients, payload],
            isAdding: false,
        }),
        [addClient.failure]: (state, {payload}) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [deleteClient.success]: (state, {payload}) => ({
            ...state,
            clients: state.clients.filter((client) => client.id !== payload),
            isDeleting: false,
        }),


        [deleteClient.failure]: (state, {payload}) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default clientReducer;
