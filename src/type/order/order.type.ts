import { ApiOrderPostParam } from '../../redux/order/api/order/api-order.type';

/* TODO API定義書ができ次第、パラメータを書き換え */
export type Order = {
  /** 案件ID */
  project_id: number;
  /** 見積ID */
  quote_id: number;
  /** 契約金 */
  contract_money: number;
  /** 契約金_請求日 */
  contract_billing_date: string;
  /** 契約金_入金予定日 */
  contract_expected_date: string;
  /** 着工金 */
  start_construction_money: number;
  /** 着工金_請求日 */
  start_construction_billing_date: string;
  /** 着工金_入金予定日 */
  start_construction_expected_date: string;
  /** 中間金1 */
  intermediate_gold1: number;
  /** 中間金1_請求日 */
  intermediate1_billing_date: string;
  /** 中間金1_入金予定日 */
  intermediate1_expected_date: string;
  /** 中間金2 */
  intermediate_gold2: number;
  /** 中間金2_請求日 */
  intermediate2_billing_date: string;
  /** 中間金2_入金予定日 */
  intermediate2_expected_date: string;
  /** 完工金 */
  completion_money: number;
  /** 完工金_請求日 */
  completion_billing_date: string;
  /** 完工金_入金予定日 */
  completion_expected_date: string;
  /** 未割り当て金 */
  unallocated_money: number;
  /** 備考 */
  remarks: string;
};

export type OrderEditState = Omit<
  ApiOrderPostParam,
  | 'contract_date'
  | 'construction_start_date'
  | 'completion_end_date'
  | 'groundbreaking_ceremony'
  | 'completion_based'
  | 'contract_billing_date'
  | 'contract_expected_date'
  | 'start_construction_billing_date'
  | 'start_construction_expected_date'
  | 'intermediate1_billing_date'
  | 'intermediate1_expected_date'
  | 'intermediate2_billing_date'
  | 'intermediate2_expected_date'
  | 'completion_billing_date'
  | 'completion_expected_date'
> & {
  /** 契約日 */
  contract_date: Date | null;
  /** 着工予定日 */
  construction_start_date: Date | null;
  /** 完工予定日 */
  completion_end_date: Date | null;
  /** 着工式 */
  groundbreaking_ceremony: Date | null;
  /** 完工式 */
  completion_based: Date | null;
  /** 契約金_請求日 */
  contract_billing_date: Date | null;
  /** 契約金_入金予定日 */
  contract_expected_date: Date | null;
  /** 着工金_請求日 */
  start_construction_billing_date: Date | null;
  /** 着工金_入金予定日 */
  start_construction_expected_date: Date | null;
  /** 中間金1_請求日 */
  intermediate1_billing_date: Date | null;
  /** 中間金1_入金予定日 */
  intermediate1_expected_date: Date | null;
  /** 中間金2_請求日 */
  intermediate2_billing_date: Date | null;
  /** 中間金2_入金予定日 */
  intermediate2_expected_date: Date | null;
  /** 完工金_請求日 */
  completion_billing_date: Date | null;
  /** 完工金_入金予定日 */
  completion_expected_date: Date | null;
};
