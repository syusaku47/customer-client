import lodash, { cloneDeep } from 'lodash';
import { EditPriceAreaState, EstimateEditState, EstimateSortState } from '../../type/estimate/estimate.type';

export class EstimateCollection {
  private static _estimateHeader: string[] = [
    '',
    '見積番号',
    '見積日',
    '現場名称',
    '案件名',
    '案件担当者',
    '見積作成者',
    '見積金額',
    '消費税額',
    '税込合計見積',
    '原価合計',
    '消費税額',
    '税込合計原価',
    '調整額',
    '受注工期_開始',
    '受注工期_終了',
  ];

  private static _estimateMeisaiHeader: string[] = [
    '工事・部材名称',
    '印刷名称',
    '規格',
    '数量',
    '単位',
    '見積単価',
    '金額',
    '原価',
    '原価金額',
    '粗利金額',
    '粗利率',
    '備考',
  ];

  private static _estimateSearchHeader: string[] = [
    '大分類',
    '中分類',
    '工事・部材名称',
    '金額',
    '原価金額',
    '印刷名称',
    '規格',
    '数量',
    '単位',
    '見積単価',
    '原価',
  ];

  public static _sortInitialState:() => EstimateSortState = () => lodash.cloneDeep({
    project_id: NaN,
    project_name: '',
    quote_creator: NaN,
    field_name: '',
    is_order_project: 0,
    sales_shop: NaN,
    sales_contact: NaN,
    quote_creator_word: '',
    customer_name: '',
    detail: '',
    construction_parts: null,
    is_order: NaN,
    quote_no: '',
    quote_date: null,
    quote_price: NaN,
    tax_amount_quote: NaN,
    including_tax_total_quote: NaN,
    cost_sum: NaN,
    tax_amount_cost: NaN,
    including_tax_total_cost: NaN,
    adjustment_amount: NaN,
    order_construction_start: null,
    order_construction_end: null,
    offset: 0,
    limit: 99999,
    sort_by: 1,
    highlow: 1,
  });

  private static _editInitialState: () => EstimateEditState = () => {
    const today = new Date();
    const afterDate = cloneDeep(today);
    afterDate.setMonth(afterDate.getMonth() + 1);
    afterDate.setDate(afterDate.getDate() - 1);

    return lodash.cloneDeep({
      project_id: NaN,
      quote_date: today,
      order_construction_start: null,
      order_construction_end: null,
      quote_expiration_date: afterDate,
      order_expected_date: afterDate,
      remarks: '',
      adjustment_amount: 0,
      field_cost_quote: 5,
      field_cost: 0,
      call_cost_quote: 0,
      call_cost: 0,
    });
  }

  private static _priceAreaInitialState: () => EditPriceAreaState = () => lodash.cloneDeep({
    estimate_price: 0,
    estimate_total_price: 0,
    estimate_tax: 0,
    genka_price: 0,
    genka_total_price: 0,
    genka_tax: 0,
    arari_price: 0,
    arari_percent: 0,
    estimate_total_price_tax_in: 0,
    genka_total_price_tax_in: 0,
    adjustment_amount: 0,
    genba_estimate_price: 0,
    field_cost_quote: 5,
    genba_genka_price: 0,
    field_cost: 0,
    yobi_estimate_price: 0,
    call_cost_quote: 9,
    yobi_genka_price: 0,
    call_cost: 2.2,
  });

  static get estimateHeader() {
    return EstimateCollection._estimateHeader;
  }

  static get estimateSearchHeader() {
    return EstimateCollection._estimateSearchHeader;
  }

  static get estimateMeisaiHeader() {
    return EstimateCollection._estimateMeisaiHeader;
  }

  static get sortInitialState() {
    return EstimateCollection._sortInitialState();
  }

  static get editInitialState() {
    return EstimateCollection._editInitialState();
  }

  static get priceAreaInitialState():EditPriceAreaState {
    return this._priceAreaInitialState();
  }
}
