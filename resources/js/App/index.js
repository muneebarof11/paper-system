import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {BrowserRouter, Route} from 'react-router-dom';
import Main from './Router';
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from "./store";

class Index extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.count('APP re-render count');
        return true;
    }

    render() {

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <Route component={Main}/>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('react-app'));
