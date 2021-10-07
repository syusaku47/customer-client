import { PartialRequired } from '../../../../type/api.type';
import { Order } from '../../../../type/order/order.type';

export type ApiOrderGetParam = {
  project_id: number;
};

/* Param */
export type ApiOrderPostParam = PartialRequired<{
  /** 案件ID */
  project_id: number,
  /** 見積ID */
  quote_id: number,
  /** 契約日 */
  contract_date: string,
  /** 着工予定日 */
  construction_start_date: string,
  /** 完工予定日 */
  completion_end_date: string,
  /** 着工式 */
  groundbreaking_ceremony: string,
  /** 完工式 */
  completion_based: string,
  /** 契約金 */
  contract_money: number,
  /** 契約金_請求日 */
  contract_billing_date: string,
  /** 契約金_入金予定日 */
  contract_expected_date: string,
  /** 着工金 */
  start_construction_money: number,
  /** 着工金_請求日 */
  start_construction_billing_date: string,
  /** 着工金_入金予定日 */
  start_construction_expected_date: string,
  /** 中間金1 */
  intermediate_gold1: number,
  /** 中間金1_請求日 */
  intermediate1_billing_date: string,
  /** 中間金1_入金予定日 */
  intermediate1_expected_date: string,
  /** 中間金2 */
  intermediate_gold2: number,
  /** 中間金2_請求日 */
  intermediate2_billing_date: string,
  /** 中間金2_入金予定日 */
  intermediate2_expected_date: string,
  /** 完工金 */
  completion_money: number,
  /** 完工金_請求日 */
  completion_billing_date: string,
  /** 完工金_入金予定日 */
  completion_expected_date: string,
  /** 未割当金 */
  unallocated_money: number,
  /** 備考 */
  remarks: string,
  /** 備考 */
  },
  'project_id'
>;

/* Response */
export type ApiOrderGetResponse = Order;
