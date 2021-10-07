import * as AutoKanas from 'vanilla-autokana';

/**
 * 入力に合わせてふりがなを付与する
 * .getFurigana()を使用
 * @param target 検知するInput Name
 * @param furigana 自動挿入するInputName
 * @param katakana 自動挿入するInputName
 * @returns Autokana
 */
export const autoKana = (
  target: string, furigana: string, katakana?:boolean,
) => AutoKanas.bind(target, furigana, {
  katakana,
});
