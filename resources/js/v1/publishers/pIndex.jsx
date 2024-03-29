import React, {Component, Suspense} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import PPublishers from './components/PPublishers';
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from "../../App/store";

class Index extends Component {

    render() {

        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Suspense fallback={<div className="loader-wrapper"><div className="loader"></div></div>}>
                        <PPublishers />
                    </Suspense>
                </PersistGate>
            </Provider>
        );
    }
}

ReactDOM.render(<Index/>, document.getElementById('react-app'));