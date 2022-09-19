import React, { Component } from 'react';
import BoxLayout from "./common/BoxLayout";

class Route404 extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <BoxLayout
                        title="Page Not Found!"
                        back_button={true}
                        back_button_text="Back"
                        add_button={false}
                    >
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container-fluid">
                                <h1 className="display-4">Page you are looking for doesn't exist!!!!!
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </h1>
                            </div>
                        </div>

                    </BoxLayout>

                </div>
            </React.Fragment>
        )
    }
}

export default Route404;
