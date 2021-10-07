import { ApiFileGetListParam, ApiFilePostParam } from '../../redux/file/api/file/api-file.type';

/* TODO プロパティ決める */
export type FileType = {
  customer_id: number,
  project_id: number,
  id: number,
  customer_name: string,
  project_name: string,
  file_name: string,
  format:string,
  file: string | File,
  comment: string,
  upload_date: string,
  updater: string,
};

export type FileListType = {
  /** 顧客ID */
  customer_id: number,
  /** 案件ID */
  project_id: number,
  /** ファイルID */
  id: number,
  /** No. */
  no: string,
  /** ファイル名 */
  file_name: string,
  /** 形式 */
  format: string,
  /** サイズ */
  size: string,
  /** アップロード日時 */
  upload_date: string,
  /** 更新者 */
  updater: string,
  /** 顧客名 */
  customer_name: string,
  /** 顧客名フリガナ */
  furigana: string,
  /** 案件名 */
  project_name: string,
  /** アイコン_サムネイル */
  icon_thumbnail: string,
  /** コメント */
  comment: string,
};

export type FileSortState = Omit<ApiFileGetListParam,
  | 'upload_date_start'
  | 'upload_date_end'
  | 'upload_date'
  > & {
    /** アップロード日_期間開始 */
    upload_date_start?: Date | null,
    /** アップロード日_期間終了 */
    upload_date_end?: Date | null,
    /** アップロード日時 */
    upload_date?: Date | null,
}

export type FileEditState = ApiFilePostParam['data'];
