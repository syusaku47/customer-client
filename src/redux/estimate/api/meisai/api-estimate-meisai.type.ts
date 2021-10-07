import {
  EstimateMeisaiSideMenu,
  EstimateMeisaiListType,
  EstimateMeisai,
} from '../../../../type/estimate/estimate-meisai.type';

export type UrlParam = {
  id: number;
  meisai_id: number;
};

/* Param */
export type ApiEstimateMeisaiGetParam = UrlParam;

export type ApiEstimateMeisaiPostParam = {
  estimate_id: number;
  meisai_id?: number;
  data: {
    quote_id: number;
    item_kubun?: number;
    category: number;
    sub_category: number;
    category_index?: number;
    sub_category_index?: number;
    construction_materials_name: string;
    standard?: string;
    quantity?: number;
    unit: number;
    quote_unit_price?: number;
    prime_cost?: number;
    remark?: string;
  };
};

export type ApiEstimateMeisaiDeleteParam = UrlParam;

export type ApiEstimateMeisaiGetListParam = {
  id: number;
  data?: {
    /* 【過去見積から明細コピー時の検索用項目】 */
    category?: number;
    sub_category?: number;
    /* 【直接登録時の絞込み用】 */
    detail?: string;
    /* 【見積編集画面での見積明細リスト部の移動ボタン押下時用】 */
    index?: number;
  };
};

export type ApiEstimateMeisaiSideMenuListParam = {
  id: number;
  data?: {
    parent_id?: number;
    category_id?: number;
    sub_category_id?: number;
    /* 【直接登録時の絞込み用】 */
    detail?: string;
    index?: number;
  };
};

export type ApiEstimateMeisaiPrintNamePostParam = {
  data: {
    print_name: string;
    category?: number;
    sub_category?: number;
  };
} & UrlParam;

export type ApiEstimateMeisaiPostListParam = {
  detail_id?: number[];
  from_quote_id?: number;
  to_quote_id?: number;
} & { id: number };

/* Response */
export type ApiEstimateMeisaiGetResponse = EstimateMeisai;

export type ApiEstimateMeisaiListGetResponse = EstimateMeisaiListType;

export type ApiEstimateMeisaiSideMenuListResponse = EstimateMeisaiSideMenu;
