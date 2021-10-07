import { MasterMeisai } from '../../../../type/master/master-meisai.type';

/* Param */
export type ApiMasterMeisaiGetListParam = {
    shohin_kubun?: string;
    category_name?: string;
    subcategory_name?: string;
    word?: string;
    is_muko?: 0 | 1;
    sort_by?: number;
    highlow?: number;
    offset?: number;
    limit?: number;
};

export type ApiMasterMeisaiPostParam = {
  data: {
    product_kubun: number,
    category_id: number,
    subcategory_id: number,
    name: string,
    standard: string,
    quantity: number,
    credit_id: number,
    quote_unit_price: string,
    prime_cost: string,
    image: File | any, // TODO any解除
    is_valid: 0 | 1,
    };
  id?: number;
};

/* Response */
export type ApiMasterMeisaiGetListResponse = MasterMeisai;
