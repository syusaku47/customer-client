import actionCreatorFactory from 'typescript-fsa';
import { FileListType, FileType, FileSortState } from '../../type/file/file.type';
import { ApiFileDownloadParam } from './api/download/api-file-download';
import { apiFile } from './api/file/api-file';

const ActionCreator = actionCreatorFactory('file');

export const FileActions = {
  api: {
    file: {
      ...apiFile,
      download: ActionCreator<ApiFileDownloadParam>('download'),
    },
  },
  setFile: ActionCreator<FileType | null>('set/file'),
  setList: ActionCreator<FileListType[]>('set/list'),
  setSort: ActionCreator<FileSortState | null>('set/sort'),
  resetState: ActionCreator('reset/state'),
};
