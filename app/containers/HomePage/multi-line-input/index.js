import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MultiLineInput extends React.Component {
  render() {
    const {
      questionList,
    } = this.props;

    console.log('props', questionList);

    const textAreaValue = JSON.stringify(questionList);

    return (
      <textarea
        name="message"
        rows="12"
        cols="80"
        value={textAreaValue}
      />
    );
  }
}

const mapStateToProps = state => ({
  questionList: state.mainReducer.questionList,
});

const mapDispatchToProps = dispatch => ({
  incrementCounter: int => dispatch({ type: 'UPDATE_COUNTER', payload: int }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiLineInput);
