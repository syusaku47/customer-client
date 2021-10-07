import {
  ApiProjectGetListParam,
  ApiProjectPostParam,
} from '../../redux/project/api/project/api-project.type';
import { TagModel } from '../../model/tag/tag';
import { ChangeType } from '../api.type';

/* TODO プロパティ決める */
export type Project = {
  /** 顧客ID */
  customer_id: number;
  /** 案件ID */
  id: number;
  /** 顧客名 */
  customer_name: string;
  /** 案件名 */
  name: string;
  /** 発生源 */
  source: number;
  /** 発生源(名称) */
  source_name: number;
  /** 案件ランク */
  project_rank: number;
  /** 案件ランク（名称） */
  project_rank_name: string;
  /** 案件担当店舗 */
  project_store: number;
  /** 案件担当店舗(名称) */
  project_store_name: number;
  /** 案件担当者 */
  project_representative: number;
  /** 案件担当者(名称) */
  project_representative_name: number;
  /** 現場名称 */
  field_name: string;
  /** 現場郵便番号 */
  field_post_no: string;
  /** 現場都道府県 */
  field_prefecture: number;
  /** 現場市区町村 */
  field_city: string;
  /** 現場地名・番地 */
  field_address: string;
  /** 現場建物名等 */
  field_building_name: string;
  /** 顧客_郵便番号 */
  post_no: string;
  /** 顧客_都道府県 */
  prefecture: number;
  /** 顧客_市区町村 */
  city: string;
  /** 顧客_地名、番地 */
  address: string;
  /** 顧客_建物名等 */
  building_name: string;
  /** 顧客住所 */
  customer_place: string;
  /** 現場住所 */
  field_place: string;
  /** 現場電話番号 */
  field_tel_no: string;
  /** 現場FAX */
  field_fax_no: string;
  /** 工事部位 */
  construction_parts: number[];
  /** 工事部位 */
  construction_part_names: string[];
  /** 見込み金額 */
  expected_amount: number;
  /** 契約番号 */
  contract_no: string;
  /** 契約日 */
  contract_date: string;
  /** 受注工期（開始） */
  construction_period_start: string;
  /** 受注工期（終了） */
  construction_period_end: string;
  /** 着工予定日 */
  construction_start_date: string;
  /** 完工予定日 */
  completion_end_date: string;
  /** 着工日 */
  construction_date: string;
  /** 完工日 */
  completion_date: string;
  /** 完了日 */
  complete_date: string;
  /** 失注日 */
  failure_date: string;
  /** 失注理由 */
  failure_cause: number;
  /** 失注理由 */
  failure_cause_name: number;
  /** 失注備考 */
  failure_remarks: string;
  /** キャンセル日 */
  cancel_date: string;
  /** キャンセル理由 */
  cancel_reason: string;
  /** 実行終了 */
  execution_end: boolean;
  /** 最終原価 */
  order_detail1: number;
  /** 最終原価 */
  order_detail2: number;
  /** 緯度 */
  lat: string;
  /** 経度 */
  lng: string;

  /** 営業担当（店舗） */
  sales_shop: number;
  /** 営業担当（担当者） */
  sales_contact: number;
  /** 受注フラグ */
  order_flag: boolean;
  /** 着工式 */
  construction_execution_date: string;
  /** 完工式 */
  completion_execution_date: string;
};

export type ProjectShowType = 0 | 1 | 2 | 3;

export type ProjectListType = {
  /** 工事フラグ (1:未契約 2:工事中 3:完工) */
  koji_flag: number;
  /** 顧客ID */
  customer_id: number;
  /** 案件ID */
  id: number;
  /** 顧客名 */
  customer_name: string;
  /** 顧客名フリガナ */
  furigana: string;
  /** 不備情報のみ */
  deficiency_flag: boolean;
  /** 案件名 */
  name: string;
  /** 案件名 */
  order_price: number;
  /** 現場郵便番号 */
  field_post_no: string;
  /** 現場都道府県 */
  field_prefecture_name: string;
  /** 現場市区町村 */
  field_city: string;
  /** 現場地名、番地 */
  field_address: string;
  /** 現場建物名等 */
  field_building_name: string;
  /** 顧客_郵便番号 */
  post_no: string;
  /** 顧客_都道府県 */
  prefecture_name: string;
  /** 顧客_市区町村 */
  city: string;
  /** 顧客_地名、番地 */
  address: string;
  /** 顧客_建物名等 */
  building_name: string;
  /** 案件ランク（見込みランク）名称 */
  project_rank_name: string;
  /** 案件ランク（見込みランク） */
  project_rank: number;
  /** 現場電話番号 */
  field_tel_no: string;
  /** 現場FAX */
  field_fax_no: string;
  /** 案件担当店舗 */
  project_store_name: string;
  /** 案件担当者 */
  project_representative_name: string;
  /** 案件に紐づいている画像 */
  image: Blob | string;
  /** 対応完了フラグ */
  complete_flag: boolean;
  /** アラートフラグ */
  alert_flag: boolean;
  /** 現場名称 */
  field_name: string;
  /** 顧客ランク名称 */
  customer_rank_name: string;
  /** 顧客住所 */
  customer_place: string;
  /** 現場住所 */
  field_place: string;
  /** 現場住所 */
  ins_date: string;
  /** 着工予定日 */
  construction_start_date: string;
  /** 完工予定日 */
  completion_end_date: string;
  /** 着工日 */
  construction_date: string;
  /** 完工日 */
  completion_date: string;
  /** 完工日 */
  complete_date: string;
  /** 契約番号 */
  contract_no: string;
  /** 発生源名称 */
  source_name: string;
  /** 備考 */
  remarks: string;
  /** 担当名 */
  responsible_name: string;
  /** 契約日 */
  contract_date: string;
  /** 失注日 */
  failure_date: string;
  /** キャンセル日 */
  cancel_date: string;
  /** 緯度 */
  lat: string;
  /** 経度 */
  lng: string;
  /** 画像URL */
  img_url: string;
  /** 営業担当（店舗） */
  sales_shop: number;
  /** 営業担当（担当者） */
  sales_contact: number;
  /** 受注フラグ */
  order_flag: boolean;
};

/** 検索条件のType */
export type ProjectSortState =Partial< ChangeType<
  ApiProjectGetListParam,
  {
    construction_parts: TagModel | null;
    construction_status: TagModel | null;
    ins_date: Date | null;
    construction_date: Date | null;
    completion_date: Date | null;
    complete_date: Date | null;
    contract_date: Date | null;
    failure_date: Date | null;
    cancel_date: Date | null;
  }
>>;

/** 編集State */
export type ProjectEditState = Omit<
  ApiProjectPostParam['data'],
  | 'construction_parts'
  | 'field_post_no'
  | 'construction_date'
  | 'completion_date'
  | 'complete_date'
  | 'failure_date'
  | 'cancel_date'
  | 'construction_execution_date'
  | 'completion_execution_date'
> & {
  /** 工事部位 */
  construction_parts: TagModel | null;
  /** 郵便番号(前3桁) */
  post_no1: string;
  /** 郵便番号(後ろ4桁) */
  post_no2: string;
  /** 着工日 */
  construction_date: Date | null;
  /** 完工日 */
  completion_date: Date | null;
  /** 完了日 */
  complete_date: Date | null;
  /** 失注日 */
  failure_date: Date | null;
  /** キャンセル日 */
  cancel_date: Date | null;
  /** 着工式 */
  construction_execution_date: Date | null;
  /** 完工式 */
  completion_execution_date: Date | null;
};
