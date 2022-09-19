import React, { Component} from 'react';
import ReactDOMServer from 'react-dom/server';
import BoxLayout from "../../common/BoxLayout";
import Box from "../../common/Box";

class SSR_PPublishers extends Component {

    render() {
        return <React.Fragment>
                <BoxLayout>
                    {
                        this.props.data.map((data) => {
                            let url = `/classes?stid=${$helper.easyEncode(data.id)}`;
                            return (
                                <div className="col-md-4 row section-box mb-4">
                                    <Box
                                        url={url}
                                        box_class="saved-papers-box"
                                        icon_class="fa-file-text"
                                        box_title={data.name}
                                        parent_class="col-lg-12"
                                        data={data}
                                    />
                                </div>
                            )
                        })
                    }
                </BoxLayout>
        </React.Fragment>
    }
}

let { publishers } = context;

const html = ReactDOMServer.renderToString(
    <SSR_PPublishers loading={false} data={publishers}  />
);

dispatch(html);
