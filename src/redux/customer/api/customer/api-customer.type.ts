import {
  Customer,
  CustomerListType,
} from '../../../../type/customer/customer.type';

/* Param */
export type ApiCustomerGetParam = {
  id: number;
};

export type ApiCustomerPostParam = {
  data: {
    sales_shop?: number;
    sales_contact: number;
    name: string;
    keisho?: string;
    furigana?: string;
    tel_no?: string;
    tel_no2?: string;
    tel_no3?: string;
    fax_no?: string;
    mail_address?: string;
    mail_address2?: string;
    mail_address3?: string;
    post_no: string;
    prefecture: number;
    city: string;
    address: string;
    building_name?: string;
    line_id?: string;
    facebook_id?: string;
    twitter_id?: string;
    instagram_id?: string;
    rank?: number;
    source?: number;
    area?: number;
    expected_part_list?: number[];
    part_list?: number[];
    building_category?: number;
    madori?: number;
    building_age?: number;
    remarks?: string;
    memo1?: string;
    memo2?: string;
    my_car_type?: number[];
    my_car_type_other?: string;
    tag_list?: number[];
    introducer?: string;
    wedding_anniversary?: string;
    lat?: string;
    lng?: string;
  };
  id?: number;
  isEdit?: boolean;
};

export type ApiCustomerGetListParam = {
  sales_shop?: number;
  sales_contact?: number;
  name?: string;
  furigana?: string;
  tel_no?: string;
  is_deficiency?: 1 | 0; // 1:不備情報のみ 0:不備情報以外も含む
  /* TODO: 緊急連絡先のパラメーターの確認 */
  post_no?: string;
  prefecture?: number;
  // city?: string;
  address?: string;
  // building_name?: string;
  rank?: number;
  rank_filter?: number; // 1:のみ 2:以上 3:以下
  estimated_rank?: number;
  estimated_rank_filter?: number; // 1:OB 2:見込み
  area?: number;
  /* TODO: 顧客分類の有無確認 */
  building_category?: number;
  madori?: number;
  building_age?: number;
  /* TODO: 築年数フィルターの有無確認 */
  completion_start_year?: number;
  completion_start_month?: number;
  completion_end_year?: number;
  completion_end_month?: number;
  last_completion_start_year?: number;
  last_completion_start_month?: number;
  last_completion_end_year?: number;
  last_completion_end_month?: number;
  total_work_price_min?: number;
  total_work_price_max?: number;
  work_times_min?: number;
  work_times_max?: number;
  tags?: number[];
  parts?: number[];
  remarks?: string;
  offset?: number;
  limit?: number;
  sort_by?: number;
  highlow?: number;
  north_lat?: string;
  north_lng?: string;
  south_lat?: string;
  south_lng?: string;
};

/* Response */
export type ApiCustomerListGetResponse = CustomerListType;
export type ApiCustomerGetResponse = Customer;
