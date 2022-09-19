import React, { Component } from 'react';

class ImportModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="popupModal2" className="modal fade" role="dialog">
                <div className="modal-dialog modal-xl">

                    <div className="modal-content">

                        <div className="modal-body">
                            {this.props.children}
                        </div>

                        <div className="modal-footer no-print">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default ImportModal;
