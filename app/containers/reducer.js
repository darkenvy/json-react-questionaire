import produce from 'immer';

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
    switch (action.type) {
      case 'UPDATE_QUESTION_LIST':
        console.log('reducer', action);
        draft.counter = action.payload;
        break;
    }
  });
