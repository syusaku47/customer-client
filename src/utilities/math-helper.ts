import BigNumber from 'bignumber.js';

/**
 * $ npm i -D bignumber.js
 */
export class MathHelper {
  /**
   * 足し算 (丸め誤差対応)
   * @param a
   */
  static plus(...a: number[]) {
    return a.length > 1 ? (
      a.reduce((p, c, i) => (i ? new BigNumber(p).plus(c).toNumber() : a[0]), a[0])
    ) : a[0] || 0;
  }

  /**
   * 引き算 (丸め誤差対応)
   * @param a
   */
  static minus(...a: number[]) {
    return a.length > 1 ? (
      a.reduce((p, c, i) => (i ? new BigNumber(p).minus(c).toNumber() : a[0]), a[0])
    ) : a[0];
  }

  /**
   * 掛け算 (丸め誤差対応)
   * @param a
   */
  static times(...a: number[]) {
    return a.length > 1 ? (
      a.reduce((p, c, i) => (i ? new BigNumber(p).times(c).toNumber() : a[0]), a[0])
    ) : a[0];
  }

  /**
   * 割り算 (丸め誤差対応)
   * @param a
   */
  static div(...a: number[]) {
    return a.length > 1 ? (
      a.reduce((p, c, i) => (i ? new BigNumber(p).div(c).toNumber() : a[0]), a[0])
    ) : a[0];
  }

  /**
   * 剰余 (丸め誤差対応)
   * @param a
   */
  static mod(...a: number[]) {
    return a.length > 1 ? (
      a.reduce((p, c, i) => (i ? new BigNumber(p).mod(c).toNumber() : a[0]), a[0])
    ) : a[0];
  }

  /**
   * べき乗 (丸め誤差対応)
   * @param a
   */
  static pow(...a: number[]) {
    return a.length > 1 ? (
      a.reduce((p, c, i) => (i ? new BigNumber(p).pow(c).toNumber() : a[0]), a[0])
    ) : a[0];
  }

  /**
   * 端数の処理
   * @param a
   * @param decimalPlace 小数点の有効桁数
   * @param mode
   */
  static rounding(a: number, decimalPlace: number = 0, mode: 'round' | 'floor' | 'ceil' = 'round') {
    const BigNumberRound = BigNumber.clone({
      ROUNDING_MODE: (
        // eslint-disable-next-line no-nested-ternary
        (mode === 'round') ? BigNumber.ROUND_HALF_UP
          : (mode === 'floor') ? BigNumber.ROUND_FLOOR
            : BigNumber.ROUND_CEIL
      ),
    });
    return new BigNumberRound(a).dp(decimalPlace).toNumber();
  }

  /**
   * 端数の処理
   * 有効桁数を絶対に表示するバージョン (string をリターンするよ)
   * @param a
   * @param decimalPlace 小数点の有効桁数
   * @param mode 丸め込みの方法
   * @param localization カンマ区切りするかどうか
   */
  static rounding2Str(
    a: number,
    decimalPlace: number,
    mode: 'round' | 'floor' | 'ceil' = 'round',
    localization: boolean = false,
  ) {
    const BigNumberRound = BigNumber.clone({
      ROUNDING_MODE: (
        // eslint-disable-next-line no-nested-ternary
        (mode === 'round') ? BigNumber.ROUND_HALF_UP
          : (mode === 'floor') ? BigNumber.ROUND_FLOOR
            : BigNumber.ROUND_CEIL
      ),
    });
    const rounding = new BigNumberRound(a).dp(decimalPlace).toFixed(decimalPlace);
    const left = rounding.split('.')[0];
    const right = rounding.split('.')[1] || '';
    return `${localization ? Number(left).toLocaleString() : Number(left)}${right ? '.' : ''}${right}`;
  }

  /**
   * 平米 → 坪 変換 (丸め誤差対応)
   * @param mm
   */
  static convertMmToTubo(mm: number) {
    return MathHelper.times(mm, 0.3025);
  }

  /**
   * 文字列 → 数値 変換
   * @param str
   */
  static localStrToNum = (str: any) => Number(String(str).replace(/[^0-9.-]+/g, '')) || 0;

  /**
   * toLocaleSting()のWrapper
   * @param str
   */
  static localStr = (str: string | number) => (Number(String(str).replace(/[^0-9.-]+/g, '')) || 0).toLocaleString();
}
