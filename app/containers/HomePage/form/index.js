import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MOVE_QUESTION } from 'containers/constants';
import { StyledQuestion } from './styles';

export class Form extends React.Component {
  state = {
    draggingIndex: null,
    draggedOverIndex: null,
  };

  static propTypes = {
    moveQuestion: PropTypes.func.isRequired,
    questionList: PropTypes.array.isRequired,
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
    const { draggingIndex, draggedOverIndex } = this.state;

    this.props.moveQuestion(draggingIndex, draggedOverIndex);
  };

  render() {
    const { questionList } = this.props;

    return (
      <div>
        {questionList.map((item, idx) => (
          <StyledQuestion
            className="question"
            draggable
            onDrag={() => this.setDragging(idx)}
            onDragOver={this.setDraggedOver}
            onDrop={this.compare}
            data-idx={idx}
            key={item.question}
          >
            <label htmlFor={`question-${idx}`}>{item.question}</label>
            <input id={`question-${idx}`} />
          </StyledQuestion>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  questionList: state.mainReducer.questionList,
});

const mapDispatchToProps = dispatch => ({
  moveQuestion: (selectedElement, position) =>
    dispatch({ type: MOVE_QUESTION, payload: [selectedElement, position] }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
