import { ApiSupportHistoryGetListParam, ApiSupportHistoryPostParam } from '../../redux/support-history/api/api-support-history/api-support-history.type';

export type SupportHistory = {
  /** 顧客ID */
  customer_id: number,
  /** 案件ID */
  project_id: number,
  /** 対応履歴ID */
  id: number,
  /** 受付日 */
  reception_date: string,
  /** 受付時 */
  reception_hour: number,
  /** 受付分 */
  reception_minutes: number,
  /** 受付担当店舗 */
  customer_responsible_store: number,
  /** 受付担当担当者 */
  customer_representative: number,
  /** カテゴリ */
  category: number,
  category_name: string,
  /** 媒体 */
  media: number,
  media_name: string,
  /** 顧客名 */
  customer_name: string,
  /** 案件名 */
  project_name: string,
  /** 画像 */
  image: string | File,
  /** 画像名 */
  image_name: string,
  /** 対応内容 */
  supported_content: string,
  /** 対応担当店舗 */
  supported_responsible_store: number,
  /** 対応担当担当者 */
  supported_representative: number,
  /** 対応済みフラグ */
  fixed_flag: boolean,
  /** 受付日時 */
  reception_time: string,
  /** 件名 */
  supported_history_name: string,
  /** 対応者 */
  supported_person: number,
  supported_person_name: string,
  /** 対応日 */
  supported_complete_date: string,
  /** 対応詳細 */
  supported_detail: string,
};

export type SupportHistoryListType = {
  /** 顧客ID */
  customer_id: number,
  /** 案件ID */
  project_id: number,
  /** 対応履歴ID */
  id: number,
  /** 対応済みフラグ */
  fixed_flag: boolean,
  /** 受付日時 */
  reception_time: string,
  /** カテゴリ */
  category: string,
  /** 顧客名 */
  customer_name: string,
  /** 顧客名フリガナ */
  furigana: string,
  /** 案件名 */
  project_name: string,
  /** 案件担当者 */
  project_representative: string,
  /** 対応者 */
  supported_person: string,
  /** 対応日 */
  supported_complete_date: string,
  /** 対応履歴名 */
  supported_history_name: string,
};

export type SupportHistorySortState = Omit<ApiSupportHistoryGetListParam,
| 'reception_date'
| 'supported_complete_date'
| 'reception_time'
  > & {
  /** 受付日時 */
  reception_time?: Date | null,
  /** 受付日 */
  reception_date?: Date | null,
  /** 対応日 */
  supported_complete_date?: Date | null,
  }

export type SupportHistoryEditState = Omit<ApiSupportHistoryPostParam['data'],
  | 'reception_time'
  | 'image'
  | 'supported_complete_date'
  > & {
  /** 受付日時 */
  reception_time: Date | null,
  /** 対応日 */
  supported_complete_date?: Date | null,
  /** 画像 */
  image?: Blob | null & any // TODO anyの修正
}
