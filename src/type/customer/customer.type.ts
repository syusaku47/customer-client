import { TagModel } from '../../model/tag/tag';
import { ApiCustomerPostParam } from '../../redux/customer/api/customer/api-customer.type';
import { CustomerSort } from '../../components/sp/layout/search-box/customer/customer-search-box.sp.type';
import { ChangeType } from '../api.type';

/* TODO 後で変える */
export type CustomerListType = {
  /** 顧客ID */
  id: number;
  /** 営業担当店舗 */
  sales_shop: string;
  /** 営業担当者 */
  sales_contact: string;
  /** 営業担当者(名称) */
  sales_contact_name: string;
  /** 顧客名 */
  name: string;
  /** 敬称 */
  keisho: string;
  /** 顧客名フリガナ */
  furigana: string;
  /** 顧客TEL1 */
  tel_no: string;
  /** 顧客TEL2 */
  tel_no2: string;
  /** 顧客TEL3 */
  tel_no3: string;
  /** 顧客FAX */
  fax_no: string;
  /** メールアドレス1 */
  mail_address: string;
  /** メールアドレス2 */
  mail_address2: string;
  /** メールアドレス3 */
  mail_address3: string;
  /** 郵便番号 */
  post_no: string;
  /** 都道府県 */
  prefecture: string;
  /** 都道府県(名称) */
  prefecture_name: string;
  /** 市区町村 */
  city: string;
  /** 地名・番地 */
  address: string;
  /** 建物名等 */
  building_name: string;
  /** LINE ID */
  line_id: string;
  /** FACEBOOK ID */
  facebook_id: string;
  /** TWITTER ID */
  twitter_id: string;
  /** INSTAGRAM ID */
  instagram_id: string;
  /** 顧客ランク */
  rank: number;
  /** 顧客ランク(名称) */
  rank_name: string;
  /** 顧客見込みランク */
  estimated_rank: string;
  /** 顧客見込みランク(名称) */
  estimated_rank_name: string;
  /** 発生源 */
  source: string;
  /** エリア */
  area: number;
  /** エリア(名称) */
  area_name: number;
  /** 見込み部位リスト */
  expected_part_list: string[];
  /** 見込み部位ID */
  expected_part_id: number;
  /** 部位リスト */
  part_list: string[];
  /** 部位ID */
  part_id: number;
  /** 建物分類 */
  building_category: number;
  /** 建物分類(名称) */
  building_category_name: number;
  /** 間取り */
  madori: number;
  /** 間取り(名称) */
  madori_name: number;
  /** 築年数 */
  building_age: number;
  /** 備考 */
  remarks: string;
  /** メモ1 */
  memo1: string;
  /** メモ2 */
  memo2: string;
  /** マイカー種別 */
  my_car_type: number;
  /** 関連タグリスト */
  tag_list: number;
  /** 関連タグID */
  tag_id: number;
  /** 紹介者 */
  introducer: string;
  /** 結婚記念日 */
  wedding_anniversary: string;
  /** OBフラグ(1:OB 2:見込み) */
  ob_flag: 1 | 2;
  /** 緯度 */
  lat: string;
  /** 経度 */
  lng: string;
  /** 写真URL */
  img_url: string;
  /** 不備情報のみ */
  deficiency_flag: boolean;
};

export type Customer = {
  /** 顧客ID */
  id: number;
  /** 営業担当店舗 */
  sales_shop: number;
  /** 営業担当店舗(名称) */
  sales_shop_name: string;
  /** 営業担当者 */
  sales_contact: number;
  /** 営業担当者(名称) */
  sales_contact_name: string;
  /** 顧客名 */
  name: string;
  /** 敬称 */
  keisho: string;
  /** 顧客名フリガナ */
  furigana: string;
  /** 顧客TEL1 */
  tel_no: string;
  /** 顧客TEL2 */
  tel_no2: string;
  /** 顧客TEL3 */
  tel_no3: string;
  /** 顧客FAX */
  fax_no: string;
  /** メールアドレス1 */
  mail_address: string;
  /** メールアドレス2 */
  mail_address2: string;
  /** メールアドレス3 */
  mail_address3: string;
  /** 郵便番号 */
  post_no: string;
  /** 都道府県 */
  prefecture: number;
  /** 都道府県(名称) */
  prefecture_name: string;
  /** 市区町村 */
  city: string;
  /** 地名・番地 */
  address: string;
  /** 地名・番地(名称) */
  address_name: string;
  /** 建物名等 */
  building_name: string;
  /** LINE ID */
  line_id: string;
  /** FACEBOOK ID */
  facebook_id: string;
  /** TWITTER ID */
  twitter_id: string;
  /** INSTAGRAM ID */
  instagram_id: string;
  /** 顧客ランク */
  rank: number;
  /** 顧客ランク(名称) */
  rank_name: string;
  /** 顧客見込みランク */
  estimated_rank: number;
  /** 顧客見込みランク(名称) */
  estimated_rank_name: string;
  /** 発生源 */
  source: number;
  /** 発生源(名称) */
  source_name: string;
  /** エリア */
  area: number;
  /** エリア(名称) */
  area_name: string;
  /** 見込み部位リスト */
  expected_part_list: number[];
  /** 見込み部位リスト(名称) */
  expected_part_list_name: string[];
  /** 部位リスト */
  part_list: number[];
  /** 部位リスト(名称) */
  part_list_name: string[];
  /** 建物分類 */
  building_category: number;
  /** 建物分類(名称) */
  building_category_name: number;
  /** 間取り */
  madori: number;
  /** 間取り(名称) */
  madori_name: string;
  /** 築年数 */
  building_age: number;
  /** 備考 */
  remarks: string;
  /** メモ1 */
  memo1: string;
  /** メモ2 */
  memo2: string;
  /** マイカー種別 */
  my_car_type: number[];
  /** マイカー種別(名称) */
  my_car_type_name: string[];
  /** マイカー種別(その他) */
  my_car_type_other: string;
  /** 関連タグリスト */
  tag_list: number[];
  /** 関連タグリスト(名称) */
  tag_list_name: string[];
  /** 紹介者 */
  introducer: string;
  /** 結婚記念日 */
  wedding_anniversary: string;
  /** 緯度 */
  lat: string;
  /** 経度 */
  lng: string;
};

export type CustomerSortState = Partial<{
  name: string;
  furigana: string;
  tel_no: string;
  tel_no2: string /* TODO: 緊急連絡先のキー名の確認 */;
  post_no1: string;
  post_no2: string;
  prefecture: number;
  address: string;
  estimated_rank: number;
  estimated_rank_filter: number;
  rank: number;
  rank_filter: number;
  area: number;
  sales_shop: number;
  sales_contact: number;
  customer_category: number /* TODO: 顧客分類の有無・キー名の確認 */;
  building_category: number;
  madori: number;
  building_age: number;
  completion_start_year: number;
  completion_start_month: number;
  completion_end_year: number;
  completion_end_month: number;
  last_completion_start_year: number;
  last_completion_start_month: number;
  last_completion_end_year: number;
  last_completion_end_month: number;
  total_work_price_min: number;
  total_work_price_max: number;
  work_times_min: number;
  work_times_max: number;
  tags: TagModel | null;
  parts: TagModel | null;
  remarks: string;
  is_deficiency: boolean;
  offset: number;
  limit: number;
  sort_by: number;
  highlow: number;
  ob_flag: number;
}>;

export type EditState = Omit<
  ApiCustomerPostParam['data'],
  | 'expected_part_list'
  | 'part_list'
  | 'my_car_type'
  | 'tag_list'
  | 'wedding_anniversary'
> &
  Partial<{
    estimated_rank: number;
    expected_part_list: TagModel | null;
    part_list: TagModel | null;
    my_car_type: TagModel | null;
    tag_list: TagModel | null;
    post_no1: string;
    post_no2: string;
    wedding_anniversary: Date | null;
    ob_flag: number;
  }>;

export type SortCustomerDialogState = ChangeType<
  Omit<
    CustomerSort,
    | 'building_age_filter'
    | 'completion_start_year'
    | 'completion_start_month'
    | 'completion_end_year'
    | 'completion_end_month'
    | 'last_completion_start_year'
    | 'last_completion_start_month'
    | 'last_completion_end_year'
    | 'last_completion_end_month'
    | 'total_work_price_min'
    | 'total_work_price_max'
    | 'work_times_min'
    | 'work_times_max'
    | 'customer_category'
  >,
  Partial<{
    estimated_rank: number;
    estimated_rank_filter: number;
    is_deficiency2: boolean;
    is_deficiency3: boolean;
  }>
>;
