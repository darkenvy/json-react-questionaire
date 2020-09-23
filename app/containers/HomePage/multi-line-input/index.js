import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { UPDATE_QUESTIONS } from 'containers/constants';
import { StyledTextArea } from './styles';

class MultiLineInput extends React.Component {
  state = {
    textareaValue: '',
    questionListClone: [],
  };

  static propTypes = {
    updateQuestions: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(nextProps, state) {
    /* We keep a copy of the questionList in this component so that we know when getDerivedStateFromProps is firing
     * from a update to questionList in the redux store. That is all we care about. Too bad we cant use the old
     * react hooks :P
     *
     * If the questions look the same, return null; dont update state. */
    if (
      JSON.stringify(nextProps.questionList) ===
      JSON.stringify(state.questionListClone)
    ) {
      console.log('getDerivedStateFromProps not needed!!!');
      return null;
    }

    return {
      textareaValue: JSON.stringify(nextProps.questionList),
      questionListClone: nextProps.questionList,
    };
  }

  onChange = event => {
    const value = get(event, 'target.value', '');

    /* for performance, we could add a debounce here to only check JSON every x seconds
     * as of right now, it will check it each time per keystroke */
    let validQuestions = null;

    try {
      validQuestions = JSON.parse(value);
    } catch (error) {
      validQuestions = null;
    }

    if (validQuestions) this.props.updateQuestions(validQuestions);

    // update text field. Required every keystroke; even if it is invalid JSON
    this.setState(state => ({
      ...state,
      textareaValue: value,
    }));
  };

  render() {
    const { textareaValue } = this.state;

    return (
      <StyledTextArea
        name="message"
        rows="12"
        cols="80"
        value={textareaValue}
        onChange={this.onChange}
      />
    );
  }
}

const mapStateToProps = state => ({
  questionList: state.mainReducer.questionList,
});

const mapDispatchToProps = dispatch => ({
  updateQuestions: arr => dispatch({ type: UPDATE_QUESTIONS, payload: arr }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultiLineInput);
