import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyledText, StyledQuestionsContainer, StyledQuestion } from './styles';

export class HomePage extends React.Component {
  propTypes = {
    counter: PropTypes.number.isRequired,
    incrementCounter: PropTypes.func.isRequired,
  };

  state = {
    draggingIndex: null,
    draggedOverIndex: null,
    questions: [
      'What is your name?',
      'What is your quest?',
      'What is your favourite colour?',
      'What is the airspeed velocity of an unladen swallow?',
      'What is the capital of Assyria',
      'Which is best? African or European Swallows?',
      'What animal could carry a coconut to a temperate zone?',
    ],
  };

  onClick = () => {
    this.props.incrementCounter(this.props.counter + 1);
  };

  setDragging = idx => {
    if (this.state.draggingIndex === idx) return;

    this.setState(state => ({
      ...state,
      draggingIndex: idx,
    }));
  };

  setDraggedOver = event => {
    if (!event || !event.target || !event.target.parentElement) return;
    event.preventDefault();

    const index = parseInt(
      event.target.parentElement.getAttribute('data-idx'),
      10,
    );

    if (this.state.draggedOverIndex === index) return;

    this.setState(state => ({
      ...state,
      draggedOverIndex: index,
    }));
  };

  compare = () => {
    console.log('compare');
    const { questions, draggingIndex, draggedOverIndex } = this.state;

    const questionToMove = questions[draggingIndex];

    console.log('moving:', draggingIndex, draggedOverIndex);

    const newQuestionList = questions.slice(); // shallow copy
    newQuestionList.splice(draggingIndex, 1);
    newQuestionList.splice(draggedOverIndex, 0, questionToMove);

    this.setState(state => ({
      ...state,
      questions: newQuestionList,
    }));
  };

  render() {
    const { counter } = this.props;
    const { draggingIndex, draggedOverIndex, questions } = this.state;

    console.log('draggingindesx', draggingIndex, draggedOverIndex);

    return (
      <div>
        <StyledText>Counter:</StyledText>
        <div>{counter}</div>
        <button type="button" onClick={this.onClick}>
          increment
        </button>

        <StyledQuestionsContainer>
          {questions.map((item, idx) => (
            <StyledQuestion
              className="question"
              draggable
              onDrag={() => this.setDragging(idx)}
              onDragOver={this.setDraggedOver}
              onDrop={this.compare}
              data-idx={idx}
            >
              <div>Q: {item}</div>
              <div>
                A: <input />
              </div>
            </StyledQuestion>
          ))}
        </StyledQuestionsContainer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.mainReducer.counter,
});

const mapDispatchToProps = dispatch => ({
  incrementCounter: int => dispatch({ type: 'UPDATE_COUNTER', payload: int }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
