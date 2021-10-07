import lodash from 'lodash';
import { OrderEditState } from '../../type/order/order.type';

export class OrderCollection {
  private static _orderHeader: string[] = [
    '見積選択',
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
  ];

  private static _editInitialState: () => OrderEditState = () => lodash.cloneDeep({
    project_id: NaN,
    quote_id: NaN,
    contract_date: null,
    construction_start_date: null,
    completion_end_date: null,
    groundbreaking_ceremony: null,
    completion_based: null,
    contract_money: NaN,
    contract_billing_date: null,
    contract_expected_date: null,
    start_construction_money: NaN,
    start_construction_billing_date: null,
    start_construction_expected_date: null,
    intermediate_gold1: NaN,
    intermediate1_billing_date: null,
    intermediate1_expected_date: null,
    intermediate_gold2: NaN,
    intermediate2_billing_date: null,
    intermediate2_expected_date: null,
    completion_money: NaN,
    completion_billing_date: null,
    completion_expected_date: null,
    unallocated_money: NaN,
    remarks: '',
    quote_no: '',

    /* TODO 下はサンプル */
    quote_price: 8000, // 見積金額
    quote_genka: 5000, // 見積原価
    quote_construction_start: '2021/07/06', // 見積工期_開始
    quote_construction_end: '2021/07/06', // 見積工期_終了
    order_price: 15000, // 受注金額
    order_genka: 10000, // 受注原価

  })

  /** @deprecated 使わない */
  private static _getInitialState: () => any = () => lodash.cloneDeep({
    id: NaN,
    quote_no: '',
    quote_price: NaN,
    quote_genka: NaN,
    quote_construction_start: '',
    quote_construction_end: '',
    order_price: NaN,
    order_genka: NaN,
    order_construction_start: '',
    order_construction_end: '',
  })

  static get orderHeader() {
    return OrderCollection._orderHeader;
  }

  static get editInitialState() {
    return OrderCollection._editInitialState();
  }

  static get getInitialState() {
    return OrderCollection._getInitialState();
  }
}
