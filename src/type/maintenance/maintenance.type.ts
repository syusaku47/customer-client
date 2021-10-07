import {
  ApiMaintenanceGetListParam,
  ApiMaintenancePostParam,
} from '../../redux/maintenance/api/maintenance/api-maintenance.type';
import { ChangeType } from '../api.type';

export type Maintenance = {
  /** 顧客ID */
  customer_id: number;
  /** 案件ID */
  project_id: number;
  /** メンテナンスID */
  id: number;
  /** 顧客名 */
  customer_name: string;
  /** 顧客名フリガナ */
  furigana: string;
  /** メンテナンスタイトル */
  title: string;
  /** 顧客_郵便番号 */
  post_no: string;
  /** 顧客住所 */
  customer_place: string;
  /** 顧客_都道府県 */
  prefecture: number;
  /** 顧客_市区町村 */
  city: string;
  /** 顧客_地名、番地 */
  address: string;
  /** 顧客_建物名等 */
  building_name: string;
  /** 顧客ランク */
  customer_rank_name: number;
  /** メンテナンス過ぎているマーク */
  maintenance_past_flag: boolean;
  /** 対応済みマーク */
  fixed_flag: boolean;
  /** 無効フラグ */
  is_muko: boolean;
  /** 顧客TEL */
  tel_no: string;
  /** 案件担当者 */
  project_representative: number;
  project_representative_name: string;
  /** メンテナンス日 */
  maintenance_date: string;
  /** 対応日 */
  supported_date: string;
  /** 案件名 */
  project_name: string;
  /** 案件営業担当店舗 */
  sales_shop: number;
  /** 案件営業担当店舗 */
  sales_shop_name: number;
  /** 案件営業担当担当者 */
  sales_contact: number;
  /** 現場名称 */
  field_name: string;
  /** 着工予定日 */
  construction_start_date: string;
  /** 完工予定日 */
  completion_end_date: string;
  /** 着工日 */
  construction_date: string;
  /** 完工日 */
  completion_date: string;
};

export type MaintenanceList = {
  /** 顧客ID */
  customer_id: number;
  /** 案件ID */
  project_id: number;
  /** メンテナンスID */
  id: number;
  /** メンテナンス過ぎているマーク(true:過ぎている false:過ぎていない) */
  maintenance_past_flag: boolean;
  /** 対応済みマーク(true:対応済み false:対応済みでない) */
  fixed_flag: boolean;
  /** メンテナンス日 */
  maintenance_date: string;
  /** メンテナンスタイトル */
  title: string;
  /** 対応日 */
  supported_date: string;
  /** 着工日 */
  construction_date: string;
  /** 完工日 */
  completion_date: string;
  /** 顧客名 */
  customer_name: string;
  /** 案件名 */
  project_name: string;
  /** 案件担当者 */
  project_representative: string;
  /** 顧客名フリガナ */
  furigana: string;
  /** メンテナンス名 */
  maintenance_name: string;
  /** 顧客_郵便番号 */
  post_no: string;
  /** 顧客住所 */
  customer_place: string;
  /** 顧客TEL */
  tel_no: string;
  /** 顧客ランク名称 */
  customer_rank_name: string;
  /** 緯度 */
  lat: string;
  /** 経度 */
  lng: string;
  /** 見積作成者 */
  quote_creator: string;
};

/* TODO 型を決めてredux処理を作る */
export type MaintenanceSortState =Partial< ChangeType<
  ApiMaintenanceGetListParam,
  {
    /** メンテナンス日 */
    maintenance_date: Date | null;
    /** メンテナンス日_開始 */
    maintenance_date_start: Date | null;
    /** メンテナンス日_終了 */
    maintenance_date_end: Date | null;
    /** 完工日_開始 */
    completion_date_start: Date | null;
    /** 完工日_終了 */
    completion_date_end: Date | null;
    /** 着工日 */
    construction_date: Date | null;
    /** 完工日 */
    completion_date: Date | null;
    /** 対応日 */
    supported_date: Date | null;
  }
>>;

export type MaintenanceEditState = ChangeType<
  ApiMaintenancePostParam['data'],
  {
    maintenance_date: Date | null;
    supported_date: Date | null;
  }
>;
