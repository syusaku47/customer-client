import {
  SupportHistory,
  SupportHistoryListType,
} from '../../../../type/support-history/support-history.type';
import { PartialRequired } from '../../../../type/api.type';

/* Param */
export type ApiSupportHistoryGetParam = {
  /** 対応履歴ID */
  id: number;
};

export type ApiSupportHistoryPostParam = {
  data: PartialRequired<
    {
      /** 顧客ID */
      customer_id: number;
      /** 案件ID */
      project_id: number;
      /** 受付日時 */
      reception_time: string;
      /** 受付時 */
      reception_hour: number;
      /** 受付分 */
      reception_minutes: number;
      /** 受付担当店舗 */
      customer_responsible_store: number;
      /** 受付担当担当者 */
      customer_representative: number;
      /** カテゴリ */
      category: number;
      /** 媒体 */
      media: number;
      /** 顧客名 */
      customer_name: string;
      /** 案件名 */
      project_name: string;
      /** 画像 */
      image: Blob & any; // TODO anyの修正
      /** 対応内容 */
      supported_content: string;
      /** 対応担当店舗 */
      supported_responsible_store: number;
      /** 対応担当担当者 */
      supported_representative: number;
      /** 対応済みフラグ */
      is_fixed: number;
      /** 件名 */
      supported_history_name: string;
      /** 対応者 */
      supported_person: number;
      /** 対応日 */
      supported_complete_date: string;
      /** 対応詳細 */
      supported_detail: string;
    },
    'customer_id' | 'reception_time' | 'customer_name'
  >;
  id?: number;
};

export type ApiSupportHistoryGetListParam = Partial<{
  customer_id: number;
  project_id: number;
  /** 受付日 */
  reception_date: string;
  /** カテゴリ */
  category: number;
  /** 対応区分(0:未対応 1:全て 2:対応済) */
  supported_kubun: number;
  /** 文字列検索 */
  word: string;
  /** キーワード検索 */
  sp_word: string;
  /** 顧客名 */
  customer_name: string;
  /** 顧客担当店舗 */
  customer_responsible_store: number;
  /** 顧客担当担当者 */
  customer_representative: number;
  /** 対応担当店舗 */
  supported_responsible_store: number;
  /** 対応担当担当者 */
  supported_representative: number;
  /** 案件名 */
  project_name: string;
  /** 受付日時_開始年 */
  date_time_start_year: number;
  /** 受付日時_開始月 */
  date_time_start_month: number;
  /** 受付日時_開始日 */
  date_time_start_date: number;
  /** 受付日時_終了年 */
  date_time_end_year: number;
  /** 受付日時_終了月 */
  date_time_end_month: number;
  /** 受付日時_終了日 */
  date_time_end_date: number;
  /** 件名 */
  subject: string;
  /** 対応者 */
  supported_person: number;
  /** 対応日_開始年 */
  supported_complete_start_year: number;
  /** 対応日_開始月 */
  supported_complete_start_month: number;
  /** 対応日_開始日 */
  supported_complete_start_date: number;
  /** 対応日_終了年 */
  supported_complete_end_year: number;
  /** 対応日_終了月 */
  supported_complete_end_month: number;
  /** 対応日_終了日 */
  supported_complete_end_date: number;
  /** 対応済みフラグ(0:未対応 1:対応済) */
  is_fixed: number;
  /* 対応日 */
  supported_complete_date: string,
  offset: number;
  limit: number;
  sort_by: number;
  highlow: number;
  filter_by: number;
}>;

/* Response */
export type ApiSupportHistoryGetResponse = SupportHistory;

export type ApiSupportHistoryGetListResponse = SupportHistoryListType;
