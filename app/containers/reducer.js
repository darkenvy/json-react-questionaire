import produce from 'immer';
import { MOVE_QUESTION, UPDATE_QUESTIONS } from './constants';

export const initialState = {
  questionList: [
    { question: 'What is your name?' },
    { question: 'What is your quest?' },
    { question: 'What is your favourite colour?' },
    { question: 'What is the airspeed velocity of an unladen swallow?' },
    { question: 'What is the capital of Assyria' },
    { question: 'Which is best? African or European Swallows?' },
    { question: 'What animal could carry a coconut to a temperate zone?' },
    { question: 'Hello World' },
  ],
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    let selectedElement;
    let position;
    let questionToMove;

    switch (action.type) {
      case UPDATE_QUESTIONS:
        if (Array.isArray(action.payload)) {
          draft.questionList = action.payload;
        }
        break;

      case MOVE_QUESTION:
        [selectedElement, position] = action.payload;

        questionToMove = state.questionList[selectedElement];

        draft.questionList.splice(selectedElement, 1);
        draft.questionList.splice(position, 0, questionToMove);
        break;
    }
  });
