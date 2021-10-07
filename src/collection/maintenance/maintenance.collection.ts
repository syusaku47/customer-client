import * as lodash from 'lodash';
import { MaintenanceEditState, MaintenanceSortState } from '../../type/maintenance/maintenance.type';

export class MaintenanceCollection {
  private static _header = [
    '',
    '対応済',
    'メンテナンス日',
    'タイトル',
    '対応日',
    '完工日',
    '顧客名',
    '案件名',
    '案件担当者',
  ]

  /* TODO 初期化時に当てはめる値を対応履歴用に変更 */
  private static _editInitialState(): MaintenanceEditState {
    return (lodash.cloneDeep({
      customer_id: NaN,
      project_id: NaN,
      maintenance_date: null,
      supported_date: null,
      title: '',
      detail: '',
      supported_content: '',
      is_fixed: 0,
      is_muko: 0,
      lat: '',
      lng: '',
    }));
  }

  private static _initialSortState(): MaintenanceSortState {
    return (lodash.cloneDeep({
      customer_id: NaN,
      project_id: NaN,
      sales_shop: NaN,
      sales_contact: NaN,
      project_name: '',
      is_muko: 0,
      word: '',
      sp_word: '',
      maintenance_date: null,
      is_fixed: false,
      construction_date: null,
      completion_date: null,
      quote_creator: NaN,
      title: '',
      supported_date: null,
      filter_by: NaN,
      offset: 0,
      limit: 99999,
      sort_by: 9,
      highlow: 1,
      maintenance_date_start: null,
      maintenance_date_end: null,
      completion_date_start: null,
      completion_date_end: null,
      supported_kubun: 0,
    }));
  }

  static get header() {
    return MaintenanceCollection._header;
  }

  static get editInitialState() {
    return MaintenanceCollection._editInitialState();
  }

  static get initialSortState() {
    return MaintenanceCollection._initialSortState();
  }
}
