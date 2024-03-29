import React, { Component } from 'react';
import {removeQuestion} from "../../../redux/Actions";
import {connect} from "react-redux";

class MatchColumn extends Component {

    constructor(props) {
        super(props);

        this.prepareMcqQuestionData = this.prepareMcqQuestionData.bind(this);

        this.state = {
            q: {
                id: 0,
                en: {
                    statement: '',
                    columns: [],
                },
            },
            number: 0
        }
    }

    componentDidMount() {
        this.prepareMcqQuestionData();
        this.triggerRemoveItem = this.triggerRemoveItem.bind(this);
    }

    triggerRemoveItem(id) {
        const c = window.confirm('Are you sure?');
        if (!c) return false;

        const formData = new FormData();
        formData.append('id', $helper.easyEncode(id));
        formData.append('type', this.props.type);

        this.props.removeQuestion(formData, this.props.type, this.props.number-1);
    }


    render() {
        let q = this.state.q;
        let number = this.state.number;
        return (
            (q.en.statement.length <= 0) ?
                <React.Fragment />
            :
            <div className="mt-4 mb-4 row pb-4 pt-2">
                <div className="col-lg-10">
                    <h5 className="mb-2">{number}) {q.en.statement}</h5>
                    <table className="table-bordered col-lg-6">
                        <tbody>
                        {q.en.columns.length > 0 ?
                            q.en.columns.map((c, i) => {
                                return (
                                    <tr>
                                        <td className="py-2 pl-2">{c.A}</td>
                                        <td className="py-2 pl-2">{c.B}</td>
                                    </tr>
                                )
                            })
                            : <React.Fragment></React.Fragment>
                        }
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-1">
                    <button typeof="button" className="btn btn-dark"
                            onClick={() => this.triggerRemoveItem(q.id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        )
    }

    prepareMcqQuestionData() {
        let question = this.props.question;
        let number = this.props.number;
        if(question.length <= 0) return false;
        if(typeof question.translations === typeof undefined) return false;

        let q = this.state.q;
        let i = 0, j = 1;
        let t = question.translations.find(q => q.locale === 'en');
        if(t && Object.keys(t).length <= 0) {
            t = question.translations.find(q => q.locale === 'ur');
        }

        if(!t) return false;

        q.id = question.id;
        q.en.statement = t.question_statement;
        let columnA = t.left_column_options.length > 0 ? JSON.parse(t.left_column_options) : [];
        let columnB = t.right_column_options.length > 0 ? JSON.parse(t.right_column_options) : [];
        for(let k=0; k < columnA.length; k++) {
            q.en.columns.push({A: columnA[k], B: columnB[k]})
        }
        this.setState({q: q, number: number})
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        removeQuestion: (formData, type, index) => dispatch(removeQuestion(dispatch, formData, type, index)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchColumn);

