import React, {Component} from 'react';

const boxes = Array.from({length: 5}, (_, i) => i + 1);
const sheets = Array.from({length: 4}, (_, i) => i + 1);

class BubbleSheet extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let k = 0;
        return (
            <React.Fragment>
                <section className="bubble-sheet-container container-fluid row px-0 mx-0">
                    {sheets.map(s =>
                        <div className="col-sm-3">
                            <table className="table table-bordered bubble-sheet text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">&nbsp;</th>
                                        <th scope="col"><span>A</span></th>
                                        <th scope="col"><span>B</span></th>
                                        <th scope="col"><span>C</span></th>
                                        <th scope="col"><span>D</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    boxes.map(b => {
                                        return  <tr>
                                            <th scope="row">{++k}</th>
                                            <td><span>A</span></td>
                                            <td><span>B</span></td>
                                            <td><span>C</span></td>
                                            <td><span>D</span></td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }

}

export default BubbleSheet
