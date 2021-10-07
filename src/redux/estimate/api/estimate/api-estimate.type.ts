import {
  Estimate,
  EstimateListType,
} from '../../../../type/estimate/estimate.type';

/* Param */
export type ApiEstimateGetParam = {
  data?: {
    project_id: number;
  };
  id: number;
};

export type ApiEstimatePostParam = {
  data: {
    project_id: number;
    quote_date: string;
    order_construction_start: string;
    order_construction_end: string;
    quote_expiration_date: string;
    order_expected_date: string;
    remarks?: string;
    adjustment_amount?: number;
    field_cost_quote?: number;
    field_cost?: number;
    call_cost_quote?: number;
    call_cost?: number;
  };
  id?: number;
};

export type ApiEstimateGetListParamType = 'A' | 'B' | 'C'

export type ApiEstimateGetListParam = Partial<
  {
    project_id: number;
    project_name: string;
    quote_creator: number;
    field_name: string;
    is_order_project: number; // 0:発注案件を含まない 1:発注案件を含む
    sales_contact: number;
    quote_creator_word: string;
    customer_name: string;
    detail: string;
    construction_parts: number[];
    sales_shop: number;
    is_order: number;
    quote_no: string;
    quote_date: string;
    quote_price: number;
    tax_amount_quote: number;
    including_tax_total_quote: number;
    cost_sum: number;
    tax_amount_cost: number;
    including_tax_total_cost: number;
    adjustment_amount: number;
    order_construction_start: string;
    order_construction_end: string;
    offset: number;
    limit: number;
    sort_by: number;
    highlow: number;
    filter_by: number;
  }
>;

/* Response */
export type ApiEstimateGetResponse = Estimate;

export type ApiEstimateListGetResponse = EstimateListType;
