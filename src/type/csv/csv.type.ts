export type CsvCustomerListType = {
  /** 顧客ID */
  customer_id: number;
  /** 顧客名称 */
  customer_name: string;
  /** 電話番号 */
  tel_no: string;
  /** 都道府県 */
  prefecture: string;
  /** 住所 */
  address: string;
  /** OB客（OBの場合「〇」、見込みは空欄） */
  ob: string;
  /** 顧客ランク */
  rank: string;
  /** 最終完工日 */
  last_completion_date: string;
  /** 総工事金額 */
  total_work_price: number;
  /** 工事回数 */
  work_times: number;
  /** 状況 */
  construction_status: string;
  /** 営業担当 */
  sales_contact: string;
};

export type CsvBirthdayListType = {
  /** 顧客ID */
  customer_id: number;
  /** 顧客名 */
  customer_name: string;
  /** 家族お名前 */
  family_name: string;
  /** 生年月日 */
  birth_date: string;
  /** 続柄 */
  relationship: string;
  /** 携帯番号 */
  mobile_phone: string;
  /** 郵便番号 */
  post_no: string;
  /** 都道府県 */
  prefecture: number;
  /** 住所 */
  address: string;
  /** 顧客電話番号 */
  tel_no: string;
  /** 営業担当 */
  sales_contact: number;
};

export type CsvWeddingAnniversaryListType = {
  /** 顧客ID */
  customer_id: number;
  /** 顧客名 */
  customer_name: string;
  /** 結婚記念日 */
  wedding_anniversary: string;
  /** 郵便番号 */
  post_no: string;
  /** 都道府県 */
  prefecture: string;
  /** 住所 */
  address: string;
  /** 顧客電話番号 */
  tel_no: string;
  /** 営業担当 */
  sales_contact: string;
};

export type CsvProjectListType = {
  /* 案件ID */
    project_id: number,
  /* 案件名 */
    project_name: string,
  /* 顧客名 */
    customer_name: string,
  /* 現場住所 */
    field_place: string,
  /* 現場電話番号 */
    field_tel_no: string,
  /* 顧客ランク */
    customer_rank: string,
  /* 担当者名 */
    project_representative: string,
  /* 着工予定日 */
    construction_start_date: string,
  /* 着工日 */
    construction_date: string,
  /* 完工予定日 */
    completion_end_date: string,
  /* 完工日 */
    completion_date: string,
  /* 契約日 */
    contract_date: string,
  /* 失注日 */
    failure_date: string,
  /* キャンセル日 */
    cancel_date: string,
  /* 見積金額 */
    quote_price: number,
};

export type CsvOrderListType = {
  /* 案件ID */
  project_id: number,
  /* 件名 */
  project_name: string,
  /* 顧客名 */
  customer_name: string,
  /* 現場住所 */
  field_place: string,
  /* 現場電話番号 */
  field_tel_no: string,
  /* 顧客ランク */
  customer_rank: string,
  /* 担当者名 */
  project_representative: string,
  /* 完工予定日 */
  completion_end_date: string,
  /* 完工日 */
  completion_date: string,
  /* 契約日 */
  contract_date: string,
  /* 受注金額 */
  order_price: number,
  /* 受注時粗利益 */
  gross_profit_amount: number,
};

export type CsvNotOrderType = {
  /* 案件ID */
  project_id: number,
  /* 案件名 */
  project_name: string,
  /* 顧客名 */
  customer_name: string,
  /* 現場住所 */
  field_place: string,
  /* 現場電話番号 */
  field_tel_no: string,
  /* 顧客ランク */
  customer_rank: string,
  /* 担当者名 */
  project_representative: string,
  /* 着工予定日 */
  construction_start_date: string,
  /* 完工予定日 */
  completion_end_date: string,
  /* 完工日 */
  completion_date: string,
  /* 見積金額 */
  quote_price: number,
};

export type CsvLostOrderType = {
  /* 案件ID */
    project_id: number,
  /* 案件名 */
    project_name: string,
  /* 顧客名 */
    customer_name: string,
  /* 現場住所 */
    field_place: string,
  /* 現場電話番号 */
    field_tel_no: string,
  /* 顧客ランク */
    customer_rank: string,
  /* 担当者名 */
    project_representative: string,
  /* 失注ID */
    failure_id: number,
  /* 失注カテゴリ */
    failure_cause: string,
  /* 見積金額 */
    quote_price: number,
};

export type CsvMaintenanceType = {
  /* メンテナンスID */
  maintenance_id: number,
  /* メンテナンス過ぎているマーク */
  maintenance_past_flag: boolean,
  /* 対応済みマーク */
  fixed_flag: boolean,
  /* メンテナンス日 */
  maintenance_date: string,
  /* タイトル */
  title: string,
  /* 対応日 */
  supported_date: string,
  /* 完工日 */
  completion_date: string,
  /* 顧客名 */
  customer_name: string,
  /* 案件名 */
  project_name: string,
  /* 案件担当者 */
  project_representative: string,
};

export type CsvCustomerRankType = {
  /* NO */
  no: number,
  /* 顧客ID */
  customer_id: number,
  /* 顧客名 */
  customer_name: string,
  /* 担当者名 */
  sales_contact: string,
  /* 変更前顧客ランク */
  customer_rank_before_change: string,
  /* 変更後顧客ランク */
  customer_rank_after_change: string,
  /* 工事金額 */
  work_price: number,
  /* 工事回数 */
  work_times: number,
  /* 最終完工日 */
  last_completion_date: string,
  /* 更新日 */
  updated_date: string,
};

export type CsvSupportHistoryType = {
  /* 対応履歴ID */
    supported_id: number,
  /* 日付 */
    supported_date: string,
  /* 顧客名 */
    customer_name: string,
  /* カテゴリ */
    category: string,
  /* 件名 */
    supported_history_name: string,
  /* 内容 */
    supported_content: string,
  /* 案件名 */
    project_name: string,
  /* 結果 */
    result: string,
  /* 結果詳細 */
    supported_detail: string,
};
