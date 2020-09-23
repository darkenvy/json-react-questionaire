import React from 'react';
import { StyledQuestion } from './styles';

export class HomePage extends React.Component {
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
    const { questions, draggingIndex, draggedOverIndex } = this.state;
    const questionToMove = questions[draggingIndex];
    const newQuestionList = questions.slice(); // shallow copy

    newQuestionList.splice(draggingIndex, 1);
    newQuestionList.splice(draggedOverIndex, 0, questionToMove);

    this.setState(state => ({
      ...state,
      questions: newQuestionList,
    }));
  };

  render() {
    const { questions } = this.state;

    return (
      <div>
        {questions.map((item, idx) => (
          <StyledQuestion
            className="question"
            draggable
            onDrag={() => this.setDragging(idx)}
            onDragOver={this.setDraggedOver}
            onDrop={this.compare}
            data-idx={idx}
          >
            <div>
              <span>Q: </span>
              <span>{item}</span>
            </div>
            <div>
              <span>A: </span>
              <input />
            </div>
          </StyledQuestion>
        ))}
      </div>
    );
  }
}

export default HomePage;
