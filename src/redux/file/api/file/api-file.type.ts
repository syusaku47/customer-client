import { FileListType, FileType } from '../../../../type/file/file.type';
/* Param */
export type ApiFileGetParam = {
  id: number,
};

export type ApiFilePostParam = {
  data: {
    /** 顧客ID */
    customer_id: number,
    /** 案件ID */
    project_id?: number,
    /** ファイル名 */
    file_name: string,
    /** 形式 */
    format: string,
    /** ファイル */
    file: File | null,
    /** コメント */
    comment?: string,
  };
  /** ファイルID */
  id?: number;
};

export type ApiFileGetListParam = Partial<{
  /** 顧客ID */
  customer_id: number,
  /** 案件ID */
  project_id: number,
  /** 顧客名 */
  customer_name: string,
  /** 案件名 */
  project_name: string,
  /** ファイル名 */
  file_name: string,
  /** アップロード日_期間開始 */
  upload_date_start: string,
  /** アップロード日_期間終了 */
  upload_date_end: string,
  /** キーワード検索 */
  word: string,
  /** No. */
  no: string,
  /** 形式 */
  format: string,
  /** サイズ */
  size: string,
  /** アップロード日時 */
  upload_date: string,
  /** 更新者 */
  updater: string,
  /** コメント */
  comment: string,
  /** 絞込み基準列 */
  filter_by: number,
  offset: number;
  limit: number;
  sort_by: number;
  highlow: number;
}>;

/* Response */
export type ApiFileGetResponse = FileType;

export type ApiFileGetListResponse = FileListType;
