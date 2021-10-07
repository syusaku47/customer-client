import { PartialRequired, SortParam } from '../../../../type/api.type';
import {
  ProjectListType,
  Project,
} from '../../../../type/project/project.type';

/* Param */
export type ApiProjectGetParam = {
  id: number;
};

// export type ApiProjectPostParam = {
//   data: RequiredPartial<{
//     customer_id: number;
//     name: string;
//     source: number;
//     rank: number;
//     sales_shop: number;
//     sales_contact: number;
//     field_name: string;
//     post_no: string;
//     prefecture: number;
//     city: string;
//     address: string;
//     building_name: string;
//     field_tel_no: string;
//     field_fax_no: string;
//     construction_parts: number[];
//   }, 'source' | 'rank' | 'sales_shop' | 'field_tel_no' | 'field_fax_no' | 'construction_parts'>;
//   id?: number;
// };

export type ApiProjectPostParam = {
  data: PartialRequired<
    {
      /* 顧客ID */
      customer_id:number,
      /* 案件名 */
      name:string,
      /* 発生源 */
      source:number,
      /* 案件ランク（見込みランク） */
      project_rank:number,
      /* 案件担当店舗 */
      sales_shop:number,
      /* 案件担当担当者 */
      sales_contact:number,
      /* 現場名称 */
      field_name:string,
      /* 現場郵便番号 */
      field_post_no:string,
      /* 現場都道府県 */
      field_prefecture:number,
      /* 現場市区町村 */
      field_city:string,
      /* 現場地名、番地 */
      field_address:string,
      /* 現場建物名等 */
      field_building_name:string,
      /* 現場電話番号 */
      field_tel_no:string,
      /* 現場FAX */
      field_fax_no:string,
      /* 工事部位 */
      construction_parts:number[],
      /* 見込み金額 */
      expected_amount:number,
      /* 契約番号 */
      contract_no:string,
      /* 契約日 */
      contract_date:string,
      /* 受注工期（開始） */
      construction_period_start:string,
      /* 受注工期（終了） */
      construction_period_end:string,
      /* 着工予定日 */
      construction_start_date:string,
      /* 完工予定日 */
      completion_end_date:string,
      /* 着工日 */
      construction_date:string,
      /* 完工日 */
      completion_date:string,
      /* 完了日 */
      complete_date:string,
      /* 失注日 */
      failure_date:string,
      /* 失注理由 */
      failure_cause:number,
      /* 失注備考 */
      failure_remarks:string,
      /* キャンセル日 */
      cancel_date:string,
      /* キャンセル理由 */
      cancel_reason:string,
      /* 実行終了 */
      execution_end:boolean,
      /* 受注詳細（追加1 – 最終原価） */
      order_detail1:number,
      /* 受注詳細（追加2 – 最終原価） */
      order_detail2:number,
      /* 緯度 */
      lat:string,
      /* 経度 */
      lng: string,
      /* 完工式 */
      completion_execution_date: string;
      /* 着工式 */
      construction_execution_date: string;
    },
    | 'customer_id'
    | 'name'
    | 'sales_contact'
    | 'field_name'
    | 'field_post_no'
    | 'field_prefecture'
    | 'field_city'
    | 'field_address'
  >;
  id?: number;
};

export type ApiProjectGetListParam = Partial<
  {
    customer_id: number;
    sales_shop: number;
    sales_contact: number;
    name: string;
    field_name: string;
    field_tel_no: string;
    customer_name: string;
    construction_status: number[];
    customer_prefecture: number;
    field_place: string;
    project_rank: number;
    project_rank_filter: number;
    construction_parts: number[];
    filter_by: number;
    order_price: number;
    project_representative_name: string;
    ins_date: string;
    construction_date: string;
    completion_date: string;
    complete_date: string;
    source: number;
    contract_date: string;
    failure_date: string;
    cancel_date: string;
    remarks: string;
    field_post_no: string;
  } & SortParam
>;

/* Response */
export type ApiProjectGetResponse = Project;

export type ApiProjectListGetResponse = ProjectListType;
