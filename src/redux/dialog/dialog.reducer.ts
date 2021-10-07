import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { DialogActions } from './dialog.action';
import { DialogProps } from '../../type/dialog.type';

export type DialogState = { dialogs: DialogProps[]};

const initialState: DialogState = { dialogs: [] };

export const DialogReducer = reducerWithInitialState<DialogState>(initialState)
  .case(DialogActions.push, (state, payload) => ({
    ...state,
    dialogs: [...state.dialogs, lodash.cloneDeep(payload)],
  }))
  .case(DialogActions.pop, (state) => {
    const { dialogs } = state;
    const arr = lodash.cloneDeep(dialogs);
    if (state.dialogs.length > 0) {
      arr.splice(state.dialogs.length - 1, 1);
    }
    return {
      ...state,
      dialogs: arr,
    };
  })
  .case(DialogActions.clear, (state) => ({
    ...state,
    dialogs: [],
  }))
  .case(DialogActions.resetState, () => initialState)
  .default((state) => state);
