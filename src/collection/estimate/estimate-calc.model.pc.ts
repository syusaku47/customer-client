import cloneDeep from 'lodash/cloneDeep';
import { EstimateMeisaiListType } from '../../type/estimate/estimate-meisai.type';
import { EditPriceAreaState } from '../../type/estimate/estimate.type';
import { MathHelper as MH } from '../../utilities/math-helper';

/* 参考
  【見積追加／見積編集】登録情報取得
  EstimateManger.as
  └ getSaveData()

  明細金額再計算
  AddEstimate.mxml
  └ recalc()
*/
export class EstimateCalcModelPC {
  /**
   * 金額計算
   * @param priceList 金額List
   * @returns 金額
   */
  static price(priceList: (number | string)[]) {
    let price = 0;
    priceList.forEach((v) => {
      price = MH.plus(Number(MH.localStrToNum(v)), price);
    });
    return price;
  }

  /**
   * 合計金額計算
   * @param price 金額
   * @param yobiPercent1 現場協力費
   * @param yobiPrice 予備金額
   * @returns 合計金額
   */
  static totalPrice(price: number, genbaPrice: number, yobiPrice: number) {
    return MH.plus(price, genbaPrice, yobiPrice);
  }

  /**
   * 予備・現場金額
   * @param {number} price 金額
   * @param {number} Percent ％
   * @returns 予備現場金額
   */
  static yobiNGenbaPrice(price: number, Percent: number) {
    return MH.rounding(MH.div(MH.times(price, Percent), 100));
  }

  /**
   * 消費税額
   * @param totalPrice 合計金額
   * @param tax 消費税率
   * @returns 消費税額
   */
  static taxPrice(totalPrice: number, tax: number) {
    return MH.rounding(MH.times(totalPrice, tax), 0, 'floor');
  }

  /**
   * 税込合計額
   * @param totalPrice 合計金額
   * @param tax 消費税
   * @returns 税込合計額
   */
  static taxInPrice(totalPrice:number, tax:number) {
    return MH.rounding(MH.plus(totalPrice, tax), 0, 'floor');
  }

  /**
   * 粗利金額
   * @param {number} totalEstimate 見積合計金額
   * @param {number} totalGenka 原価合計金額
   * @returns 粗利金額
   */
  static arariPrice(totalEstimate: number, totalGenka: number) {
    return MH.minus(totalEstimate, totalGenka);
  }

  /**
   * 粗利率の算出 (マイナス入力および各部表示対応)
   * @param estimate 見積額
   * @param genka 原価額
   * @param marumeFlag 丸め込むかどうか
   * @return arariRitsu 粗利率
   **/
  static arariRitsu(
    estimate: number,
    genka: number,
    marumeFlag: boolean = false,
  ) {
    const tempArari = MH.minus(estimate, genka);
    let tempRitsu = 0;
    if (marumeFlag) {
      const price1 = MH.div(tempArari, estimate);
      const price2 = MH.times(price1, 100);
      tempRitsu = MH.rounding(price2, 1);
    } else {
      tempRitsu = Math.round((tempArari / estimate) * 100);
    }

    let arariRitsu: number = 0;

    if (!Number.isFinite(tempRitsu)) {
      arariRitsu = NaN;
    } else if (
      !Number.isNaN(tempRitsu)
      && Number.isFinite(tempRitsu)
      && tempArari < 0
    ) {
      arariRitsu = MH.times(tempRitsu, -1);
    } else if (
      !Number.isNaN(tempRitsu)
      && Number.isFinite(tempRitsu)
      && tempArari > 0
    ) {
      arariRitsu = tempRitsu;
    }

    return arariRitsu;
  }

  static discountProcess(state: EditPriceAreaState, tax: number) {
    // 税抜き金額 - 調整金額
    const discountTotalAmount = MH.minus(state.estimate_price || 0, state.adjustment_amount || 0);

    // 値引き後 税抜き見積合計(税抜き見積り + 予備費1 + 予備費2
    const gokei_zeinuki_kin = MH.plus(
      discountTotalAmount, state.genba_estimate_price || 0, state.yobi_estimate_price || 0,
    );

    // 値引き後表示税額
    const estimated_tax = MH.rounding(MH.times(gokei_zeinuki_kin || 0, tax), 2, 'floor');

    // 税込合計見積金額
    const estimates_the_total_tax = MH.plus(gokei_zeinuki_kin || 0, estimated_tax || 0);

    console.log('discount');

    return ({
      ...state,
      estimate_price: discountTotalAmount,
      estimate_total_price: gokei_zeinuki_kin,
      estimate_tax: estimated_tax,
      estimate_total_price_tax_in: estimates_the_total_tax,
    });
  }

  /**
   * 見積もりの全体計算
   * @param {EditPriceAreaState} state 編集State
   * @param {EstimateMeisaiListType[]} data 明細リスト
   * @param tax 10% の時は 0.1
   * @returns {EditPriceAreaState} 編集State
   */
  static calc(
    state: EditPriceAreaState,
    data: EstimateMeisaiListType[],
    tax: number,
  ): EditPriceAreaState {
    window.console.groupCollapsed('[Debug] calc()');
    window.console.log('state : ', state);
    window.console.log('data  : ', data);
    window.console.log('tax   : ', tax);
    window.console.groupEnd();
    // - model -
    const model = EstimateCalcModelPC;

    // - 各種値 -
    // -- 見積金額＝リスト内の金額の合計値 --
    const estimate_price = model.price(data.map((v) => v.price)) || 0;
    // -- 原価金額＝リスト内の原価金額の合計値 --
    const genka_price = model.price(data.map((v) => v.prime_cost)) || 0;
    // -- 現場協力費(見積)＝見積金額 × 現場協力費 % --
    const genba_estimate_price = model.yobiNGenbaPrice(
      estimate_price, state.field_cost_quote,
    ) || 0;
    // -- 現場協力費(原価)＝原価金額 × 現場協力費 % --
    const genba_genka_price = model.yobiNGenbaPrice(genka_price, state.field_cost) || 0;
    // -- 予備原価(見積)＝見積金額 × 予備原価 % --
    const yobi_estimate_price = model.yobiNGenbaPrice(
      estimate_price, state.yobi_estimate_price,
    ) || 0;
    // -- 予備原価(原価)＝原価金額 × 予備原価 % --
    const yobi_genka_price = model.yobiNGenbaPrice(genka_price, state.call_cost) || 0;
    // -- 見積合計＝見積金額＋現場協力費（見積）＋予備原価（見積）--
    const estimate_total_price = model.totalPrice(
      estimate_price, genba_estimate_price, yobi_estimate_price,
    ) || 0;
    // -- 原価合計＝原価金額＋現場協力費（原価）＋予備原価（原価） --
    const genka_total_price = model.totalPrice(
      genka_price, genba_genka_price, yobi_genka_price,
    ) || 0;
    // -- 消費税額＝見積合計×消費税％（見積日付によって消費税変更※消費税マスタ参照 --
    const estimate_tax = model.taxPrice(estimate_total_price, tax) || 0;
    // -- 消費税額＝原価合計×消費税％（見積日付によって消費税変更※消費税マスタ参照 --
    const genka_tax = model.taxPrice(genka_total_price, tax) || 0;
    // -- 税込合計見積金額＝見積金額＋現場協力費（見積）＋予備原価（見積）＋消費税額 --
    const estimate_total_price_tax_in = model.taxInPrice(estimate_total_price, estimate_tax) || 0;
    // -- 税込合計原価金額＝原価金額＋現場協力費（原価）＋予備原価（原価）＋消費税額 --
    const genka_total_price_tax_in = model.taxInPrice(genka_total_price, genka_tax) || 0;
    // -- 粗利金額＝見積合計金額 - 原価合計金額 --
    const arari_price = model.arariPrice(estimate_total_price, genka_total_price) || 0;
    // -- 粗利率＝((見積金額 - 原価金額) ÷ 見積金額 ) × 100 --
    const arari_percent = model.arariRitsu(estimate_price, genka_price) || 0;

    const _state = model.discountProcess(cloneDeep({
      ...state,
      estimate_price,
      estimate_total_price,
      estimate_tax,
      estimate_total_price_tax_in,
      genka_price,
      genka_total_price,
      genka_tax,
      genka_total_price_tax_in,
      genba_estimate_price,
      genba_genka_price,
      yobi_estimate_price,
      yobi_genka_price,
      arari_price,
      arari_percent,
    }), tax);

    return cloneDeep({
      ..._state,
      arari_price: model.arariPrice(_state.estimate_total_price, _state.genka_total_price) || 0,
      arari_percent: model.arariRitsu(_state.estimate_price, _state.genka_price, true) || 0,
    });
  }
}
