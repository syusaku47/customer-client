import { TagModel } from '../../model/tag/tag';
import {
  ApiEstimateGetListParam,
  ApiEstimatePostParam,
} from '../../redux/estimate/api/estimate/api-estimate.type';
import { ApiEstimateMeisaiPostParam } from '../../redux/estimate/api/meisai/api-estimate-meisai.type';
import { ChangeType } from '../api.type';

export type EstimateListType = {
  /** 案件ID */
  project_id: number;
  /** 見積ID */
  id: number;
  /** 受注フラグ */
  order_flag: boolean;
  /** 見積番号 */
  quote_no: string;
  /** 見積日 */
  quote_date: string;
  /** 現場名称 */
  field_name: string;
  /** 案件名 */
  project_name: string;
  /** 案件担当者 */
  project_representative_name: string;
  /** 見積作成者 */
  quote_creator: string;
  /** 見積金額 */
  quote_price: number;
  /** 消費税額(見積) */
  tax_amount_quote: number;
  /** 税込合計見積 */
  including_tax_total_quote: number;
  /** 原価合計 */
  cost_sum: number;
  /** 消費税額(原価) */
  tax_amount_cost: number;
  /** 税込合計原価 */
  including_tax_total_cost: number;
  /** 調整額 */
  adjustment_amount: number;
  /** 受注工期_開始 */
  order_construction_start: string;
  /** 受注工期_終了 */
  order_construction_end: string;
  /** 顧客名 */
  customer_name: string;
  /** フリガナ */
  furigana: string;
  /** 受注金額 */
  order_price: number;
  /** 受注原価 */
  order_cost: number;
  /** 着工予定日 */
  construction_start_date: string;
  /** 完工予定日 */
  completion_end_date: string;
  /** 着工式 */
  groundbreaking_ceremony: string;
  /** 完工式 */
  completion_based: string;
};

export type Estimate = {
  /** 案件ID */
  project_id: number;
  /** 見積ID */
  id: number;
  /** 現場名称 */
  field_name: string;
  /** 案件名 */
  project_name: string;
  /** 顧客名 */
  customer_name: string;
  /** 見積作成者 */
  quote_creator: string;
  /** 見積作成者 */
  quote_creator_name: string;
  /** 見積日付 */
  quote_date: string;
  /** 見積番号 */
  quote_no: string;
  /** 見積金額 */
  quote_price: number;
  /** 工期_開始 */
  order_construction_start: string;
  /** 工期_終了 */
  order_construction_end: string;
  /** 見積有効期限 */
  quote_expiration_date: string;
  /** 発注予定日 */
  order_expected_date: string;
  /** 備考 */
  remarks: string;
  /** 調整額 */
  adjustment_amount: number;
  /** 現場協力費（見積）% */
  field_cost_quote: number;
  /** 現場協力費（原価）% */
  field_cost: number;
  /** 呼び原価（見積）% */
  call_cost_quote: number;
  /** 呼び原価（原価）% */
  call_cost: number;
  /** 受注フラグ */
  order_flag: boolean;
};

export type EstimateEditState = ChangeType<
  Required<ApiEstimatePostParam['data']>,
  {
    /** 見積日付 */
    quote_date: Date | null;
    /** 工期_開始 */
    order_construction_start: Date | null;
    /** 工期_終了 */
    order_construction_end: Date | null;
    /** 見積有効期限 */
    quote_expiration_date: Date | null;
    /** 発注予定日 */
    order_expected_date: Date | null;
  }
  >;

export type EstimateMeisaiState = Required<ApiEstimateMeisaiPostParam['data']>;

export type EditPriceAreaState = {
  estimate_price: number;
  estimate_total_price: number;
  estimate_tax: number;
  genka_price: number;
  genka_total_price: number;
  genka_tax: number;
  arari_price: number;
  arari_percent: number;
  estimate_total_price_tax_in: number;
  genka_total_price_tax_in: number;
  adjustment_amount: number;
  genba_estimate_price: number;
  field_cost_quote: number;
  genba_genka_price: number;
  field_cost: number;
  yobi_estimate_price: number;
  call_cost_quote: number;
  yobi_genka_price: number;
  call_cost: number;
};

export type EstimateSortState = Partial<
  ChangeType<
    ApiEstimateGetListParam,
    {
      order_construction_start: Date | null;
      order_construction_end: Date | null;
      quote_date: Date | null;
      construction_parts: TagModel | null;
    }
  >
>;

export type EstimateDialogSortState = {
  project_name: string;
  customer_name: string;
  meisai: string;
  quote_creator: number;
  construction_part: number[];
};
