import * as lodash from 'lodash';
import {
  SupportHistoryEditState,
  SupportHistorySortState,
} from '../../type/support-history/support-history.type';

export class SupportHistoryCollection {
  private static _header = [
    '対応済',
    '受付日時',
    'カテゴリ',
    '顧客名',
    '案件担当者',
    '対応者',
    '対応日',
  ];

  private static _editInitialState(): SupportHistoryEditState {
    return lodash.cloneDeep({
      customer_id: NaN,
      project_id: NaN,
      reception_time: null,
      reception_hour: NaN,
      reception_minutes: NaN,
      customer_responsible_store: NaN,
      customer_representative: NaN,
      category: NaN,
      media: NaN,
      customer_name: '',
      project_name: '',
      image: null,
      supported_content: '',
      supported_responsible_store: NaN,
      supported_representative: NaN,
      is_fixed: NaN,
      supported_history_name: '',
      supported_person: NaN,
      supported_complete_date: null,
      supported_detail: '',
    });
  }

  private static _initialSortState(): SupportHistorySortState {
    return lodash.cloneDeep({
      /* 【簡易検索用】 */
      reception_date: null,
      category: NaN,
      supported_kubun: 0, // 0:未対応 1:全て 2:対応済
      word: '',
      sp_word: '',
      /* 【詳細検索用】 */
      customer_name: '',
      customer_responsible_store: NaN,
      customer_representative: NaN,
      supported_responsible_store: NaN,
      supported_representative: NaN,
      project_name: '',
      date_time_start_year: NaN,
      date_time_start_month: NaN,
      date_time_start_date: NaN,
      date_time_end_year: NaN,
      date_time_end_month: NaN,
      date_time_end_date: NaN,
      subject: '',
      supported_person: NaN,
      supported_complete_start_year: NaN,
      supported_complete_start_month: NaN, // 1～12
      supported_complete_start_date: NaN, // 1～31
      supported_complete_end_year: NaN,
      supported_complete_end_month: NaN, // 1～12
      supported_complete_end_date: NaN, // 1～31
      supported_complete_date: null,
      reception_time: null,
      is_fixed: 0, // 0:未対応 1:対応済
      offset: 0,
      limit: 99999,
      sort_by: 7,
      highlow: 1,
    });
  }

  static get header() {
    return SupportHistoryCollection._header;
  }

  static get editInitialState() {
    return SupportHistoryCollection._editInitialState();
  }

  static get initialSortState() {
    return SupportHistoryCollection._initialSortState;
  }
}
