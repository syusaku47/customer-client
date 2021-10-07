import * as lodash from 'lodash';
import { TagType } from '../../type/tag/tag.type';
import { ProjectEditState, ProjectSortState } from '../../type/project/project.type';

export class ProjectCollection {
  private static _rank = [
    { id: 1, label: 'A' },
  ]

  private static _constructionStatusList: TagType[] = [
    { id: 1, label: '案件化' },
    { id: 2, label: '見積中' },
    { id: 3, label: '工事中' },
    { id: 4, label: '完工' },
    { id: 5, label: '未入金' },
    { id: 6, label: '完了' },
    { id: 7, label: '失注' },
    { id: 8, label: 'キャンセル' },
  ]

  private static _estimateHeader = [
    '契約',
    '実行予算',
    '最終原価',
    '完工',
    '対比',
  ]

  private static _estimateSideHeader = [
    '受注金額',
    '追加１',
    '追加２',
    '原価',
    '粗利益',
    '粗利率',
  ]

  private static _estimateListHeader = [
    '',
    '見積番号',
    '作成日',
    '見積作成者',
    '見積金額',
    '消費税額',
    '税込合計見積',
    '原価合計',
    '消費税額',
    '税込合計原価',
    '調整額',
    '見積工期_開始',
    '見積工期_終了',
  ]

  private static _supportHistory = [
    '対応済',
    '日付日時',
    'カテゴリ',
    '件名',
    '対応者',
    '対応日',
    '',
  ]

  private static _file = [
    'No.',
    'ファイル名',
    '形式',
    'サイズ',
    'アップロード日時',
    '更新者',
    'コメント',
    '',
    '',
    '',
  ]

  private static _maintenance = [
    '',
    '対応済',
    'メンテナンス日',
    'タイトル',
    '対応日',
    '',
  ]

  private static _header = [
    '',
    '',
    '案件ID',
    '現場名称',
    '顧客ランク',
    '見込みランク',
    '案件名',
    '現場電話番号',
    '現場住所',
    '着工予定日',
    '完工予定日',
    '着工日',
    '完工日',
    '契約番号',
    '発生源',
    '備考',
    '担当名',
    '契約日',
  ]

  private static _editInitialState():ProjectEditState {
    return (lodash.cloneDeep({
      customer_id: NaN,
      name: '',
      source: NaN,
      project_rank: NaN,
      sales_shop: NaN,
      sales_contact: NaN,
      field_name: '',
      field_post_no: '',
      post_no1: '',
      post_no2: '',
      field_prefecture: NaN,
      field_city: '',
      field_address: '',
      field_building_name: '',
      field_tel_no: '',
      field_fax_no: '',
      construction_parts: null,
      expected_amount: NaN,
      contract_no: '',
      contract_date: '',
      construction_period_start: '',
      construction_period_end: '',
      construction_start_date: '',
      completion_end_date: '',
      construction_date: null,
      completion_date: null,
      complete_date: null,
      failure_date: null,
      failure_cause: NaN,
      failure_remarks: '',
      cancel_date: null,
      cancel_reason: '',
      execution_end: false,
      order_detail1: NaN,
      order_detail2: NaN,
      construction_execution_date: null,
      completion_execution_date: null,
      lat: '',
      lng: '',
    }));
  }

  private static _initialSortState(): ProjectSortState {
    return (lodash.cloneDeep({
      customer_id: NaN,
      sales_shop: NaN,
      sales_contact: NaN,
      name: '',
      title: '',
      field_name: '',
      field_tel_no: '',
      customer_name: '',
      customer_prefecture: NaN,
      field_place: '',
      project_rank: NaN,
      project_rank_filter: NaN,
      construction_parts: null,
      construction_status: null,
      offset: 0,
      limit: 100,
      sort_by: 2,
      highlow: 1,

      /* 絞り込み用 */
      order_price: NaN,
      project_representative_name: '',
      ins_date: null,
      source: NaN,
      construction_date: null,
      completion_date: null,
      complete_date: null,
      contract_date: null,
      failure_date: null,
      cancel_date: null,
      remarks: '',
      field_post_no: '',
      filter_by: 3,
    }));
  }

  static get initialEditState() {
    return ProjectCollection._editInitialState();
  }

  static get rank() {
    return ProjectCollection._rank;
  }

  static get constructionStatusList() {
    return ProjectCollection._constructionStatusList;
  }

  static get estimateHeader() {
    return ProjectCollection._estimateHeader;
  }

  static get estimateSideHeader() {
    return ProjectCollection._estimateSideHeader;
  }

  static get estimateListHeader() {
    return ProjectCollection._estimateListHeader;
  }

  static get supportHistory() {
    return ProjectCollection._supportHistory;
  }

  static get file() {
    return ProjectCollection._file;
  }

  static get maintenance() {
    return ProjectCollection._maintenance;
  }

  static get header() {
    return ProjectCollection._header;
  }

  static get editInitialState() {
    return ProjectCollection._editInitialState;
  }

  static get initialSortState() {
    return ProjectCollection._initialSortState;
  }
}
