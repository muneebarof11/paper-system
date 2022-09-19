import React, {Component, Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import Subjects from './components/Subjects';
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from "../../App/store";


class Index extends Component {

    render() {

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Suspense fallback={<div className="mb-5"><div class="loader-wrapper"><div class="loader"></div></div></div>}>
                        <Subjects />
                    </Suspense>
                </PersistGate>
            </Provider>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('react-app'));