import React, { Component, Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../App/store";
import Publishers from "./components/Publishers";

class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Suspense
                        fallback={
                            <div className="loader-wrapper">
                                <div className="loader"></div>
                            </div>
                        }
                    >
                        <Publishers />
                    </Suspense>
                </PersistGate>
            </Provider>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("react-app"));
