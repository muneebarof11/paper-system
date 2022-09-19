import React, { Component} from 'react';
import BoxLayout from "./common/BoxLayout";

class UnderConstruction extends Component {

    constructor(props) {

        super(props);

        this.state = {
            page_title: '',
            is_loading: false
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <BoxLayout
                        title="Under construction!"
                        back_button={true}
                        back_button_text="Back"
                        add_button={false}
                    >
                        <div className="jumbotron jumbotron-fluid">
                            <div className="container-fluid">
                                <h1 className="display-4">Page is under development, come back later!</h1>
                            </div>
                        </div>

                    </BoxLayout>

                </div>
            </React.Fragment>
        )
    }

}

export default UnderConstruction;
