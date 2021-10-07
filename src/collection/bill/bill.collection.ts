import { cloneDeep } from 'lodash';
import { BillEditState, BillSortState } from '../../type/bill/bill.type';

export class BillCollection {
  public static header = [
    '',
    '請求項目',
    '請求日',
    '入金予定日',
    '請求金額',
    '入金方法',
    '',
  ]

  public static getInitialState():BillEditState {
    return (cloneDeep({
    }));
  }

  public static editInitialState():BillEditState {
    return (cloneDeep({
    }));
  }

  public static sortInitialState(): BillSortState {
    return (cloneDeep({
    }));
  }
}
