import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import logger from 'redux-logger';
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import rootReducer from "../v1/rootReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist:['pre', 'saved', 'paper', 'section'],
    blacklist: ['publishers', 'classes', 'subject']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk, logger);

export const store = createStore(persistedReducer, middleware);
// store.subscribe(()=>{
//     console.log(store.getState(),"dispach state1122")
// });
export const persistor = persistStore(store);
// persistor.flush();
// persistor.purge();

