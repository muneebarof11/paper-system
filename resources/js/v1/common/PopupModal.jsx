import React, { Component } from 'react';

class PopupModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const className = this.props.className ? this.props.className : '';
        return (
            <div id="popupModal" className="modal fade" role="dialog">
                <div className={`modal-dialog ${className}`}>

                    <div className="modal-content">

                        <div className="modal-body">
                            {this.props.children}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default PopupModal;
