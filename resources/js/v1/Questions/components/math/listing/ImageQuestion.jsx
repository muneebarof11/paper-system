import React, { Component } from 'react';
import {removeQuestion} from "../../../redux/Actions";
import {connect} from "react-redux";

class ImageQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            q: {
                id: 0,
                en: {
                    statement: '',
                    image: ''
                },
                rtl: {
                    statement: '',
                    image: ''
                }
            },
            number: 0
        };

        this.prepareQuestionData = this.prepareQuestionData.bind(this);
        this.triggerRemoveItem = this.triggerRemoveItem.bind(this);
    }

    componentDidMount() {
        this.prepareQuestionData();
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
            <div className="mt-4 mb-4 row pt-2 pb-2">
                <div className="col-lg-5">
                    <div className="row">
                        <h5 className="mb-2 col-lg-6">
                            {number}) {q.en.statement}
                        </h5>
                        <div className="image-container col-lg-6">
                            <img src={$helper.getImageBasePath() + q.en.image} className="img-thumbnail" alt={q.en.statement} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-1">
                    <button typeof="button" className="btn btn-dark"
                            onClick={() => this.triggerRemoveItem(q.id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
                <div className={`col-lg-5 urdu-font text-right`}>
                    <h5 className="mb-2 text-right">
                        {q.rtl.statement}
                    </h5>
                </div>
            </div>
        )
    }

    prepareQuestionData() {
        let question = this.props.question;
        let number = this.props.number;
        if(question.length <= 0) return false;
        if(typeof question.translations === typeof undefined) return false;

        let q = this.state.q;
        let i = 0, j = 1;
        let t = question.translations.find(q => q.locale === 'en');
        if(typeof t === typeof undefined) return false;
        if(typeof t.question_statement === typeof undefined) return false;

        // check its only urdu
        if($helper.checkUTF8(t.question_statement)) {
            q.rtl.statement = t.question_statement;
        } else {
            q.en.statement = t.question_statement;
        }

        q.id = question.id;
        q.en.image = t.question_image;

        /**
         * loop through other language statement only if it exists
         * English, Urdu & Isl (or some other) will not have this index
         */
        t = question.translations.find(q => q.locale === 'ur');
        if (typeof t !== typeof undefined) {
            q.rtl.statement = t.question_statement;
            q.rtl.image = t.question_image;
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageQuestion);
