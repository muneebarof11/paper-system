import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import logger from 'redux-logger';
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import rootReducer from "../v1/rootReducer";
import configureStore from 'redux/configureStore';
import ReactDOMServer from 'react-dom/server';

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['publishers', 'classes', 'subject', 'section', 'pre', 'saved', 'paper'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk);

export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);


