import cloneDeep from 'lodash/cloneDeep';
import { EditPriceAreaState } from '../../../../../../type/estimate/estimate.type';

export class EstimatePriceAreaCollectionPC {
  private static _initialEditState() {
    return ({
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
  }

  static get initialEditState():EditPriceAreaState {
    return cloneDeep(EstimatePriceAreaCollectionPC._initialEditState());
  }
}
