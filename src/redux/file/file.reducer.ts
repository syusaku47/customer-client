import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { FileListType, FileSortState, FileType } from '../../type/file/file.type';
import { FileActions } from './file.action';
import { FileCollection } from '../../collection/file/file.collection';

export type FileState = {
  file: FileType | null;
  list: FileListType[];
  sort: FileSortState
};

const initialState: FileState = {
  file: null,
  list: [],
  sort: FileCollection.initialSortState(),
};

export const FileReducer = reducerWithInitialState<FileState>(initialState)
  .case(FileActions.setFile, (state, payload) => ({
    ...state,
    file: lodash.cloneDeep(payload),
  }))
  .case(FileActions.setList, (state, payload) => ({
    ...state,
    list: lodash.cloneDeep(payload),
  }))
  .case(FileActions.setSort, (state, payload) => ({
    ...state,
    sort: payload ? lodash.cloneDeep({
      ...state.sort,
      ...payload,
    }) : FileCollection.initialSortState(),
  }))
  .case(FileActions.resetState, () => initialState)
  .default((state) => state);
