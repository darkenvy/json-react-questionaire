import produce from 'immer';

export const initialState = {
  counter: 11,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'UPDATE_COUNTER':
        console.log('reducer', action);
        draft.counter = action.payload;
        break;
    }
  });
