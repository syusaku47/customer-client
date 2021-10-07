import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { TagActions } from './tag.action';
import { TagType } from '../../type/tag/tag.type';

export type TagState = {
  masterMyCarTypeList: TagType[];
  partList: TagType[];
  relevantTagList: TagType[];
};

const initialState: TagState = {
  masterMyCarTypeList: [],
  partList: [],
  relevantTagList: [],
};

export const TagReducer = reducerWithInitialState<TagState>(initialState)
  .case(TagActions.setMasterMyCarTypeList, (state, payload) => ({
    ...state,
    masterMyCarTypeList: lodash.cloneDeep(payload),
  }))
  .case(TagActions.setPartList, (state, payload) => ({
    ...state,
    partList: lodash.cloneDeep(payload),
  }))
  .case(TagActions.setRelevantTagList, (state, payload) => ({
    ...state,
    relevantTagList: lodash.cloneDeep(payload),
  }))
  .case(TagActions.resetState, () => initialState)
  .default((state) => state);
