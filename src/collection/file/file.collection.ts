import * as lodash from 'lodash';
import { FileEditState, FileSortState } from '../../type/file/file.type';

export class FileCollection {
  private static _header = [
    'No.',
    'ファイル名',
    '形式',
    'サイズ',
    'アップロード日時',
    '更新者',
    '顧客名',
    '案件名',
    '',
    '',
    '備考',
  ]

  /* TODO 初期化時に当てはめる値を対応履歴用に変更 */
  private static _editInitialState():FileEditState {
    return (lodash.cloneDeep({
      customer_id: NaN,
      project_id: NaN,
      file_name: '',
      format: '',
      file: null,
      comment: '',
    }));
  }

  private static _initialSortState(): FileSortState {
    return (lodash.cloneDeep({
      customer_id: NaN,
      project_id: NaN,
      customer_name: '',
      project_name: '',
      file_name: '',
      upload_date_start: null,
      upload_date_end: null,
      word: '',
      no: '',
      format: '',
      size: '',
      upload_date: null,
      updater: '',
      comment: '',
      filter_by: NaN,
      offset: 0,
      limit: 99999,
      sort_by: 0,
      highlow: 1,
    }));
  }

  static get header() {
    return FileCollection._header;
  }

  static get editInitialState() {
    return FileCollection._editInitialState;
  }

  static get initialSortState() {
    return FileCollection._initialSortState;
  }
}
