import { PdfModule } from '../pdf-module';
import template from '../template/print_estimate_shanai_3.svg';

const replaceData = [
  // - template_1 -
  { from: '%%printKouji2_1_%{i}_%%', to: 'largeNumber' },
  { from: '%%printKouji2_2_%{i}_%%', to: 'largeName' },
  // - template_1 / template_9 -
  { from: '%%printKouji2_3_%{i}_%{j}_%%', to: 'mediumName' },
  { from: '%%printKouji2_4_%{i}_%{j}_%%', to: 'count' },
  { from: '%%printKouji2_5_%{i}_%{j}_%%', to: 'unit' },
  { from: '%%printKouji2_6_%{i}_%{j}_%%', to: 'price' },
  { from: '%%printKouji2_7_%{i}_%{j}_%%', to: 'memo' },
  { from: '%%printKouji2_8_%{i}_%{j}_%%', to: 'genka' },
  { from: '%%printKouji2_9_%{i}_%{j}_%%', to: 'arari' },
  // - template_2 -
  { from: '%%printKouji2_10_%{i}_%%', to: 'smallPrice' },
  { from: '%%printKouji2_11_%{i}_%%', to: 'smallGenka' },
  // - template_3 -
  { from: '%%printKouji2_12_%%', to: 'yobiGokeiGokei' },
  { from: '%%printKouji2_13_%%', to: 'yobiGokeiGenka' },
  // - template_4 -
  { from: '%%printKouji2_14_%%', to: 'yobiGenkaGokei' },
  { from: '%%printKouji2_15_%%', to: 'yobiGenkaGenka' },
  // - template_5 -
  { from: '%%printKouji2_16_%%', to: 'largePrice' },
  { from: '%%printKouji2_17_%%', to: 'largePriceGenka' },
  // - template_6 -
  { from: '%%printKouji2_18_%%', to: 'tyouseiPrice' },
  { from: '%%printKouji2_19_%%', to: 'tyouseiPriceGenka' },
  // - template_7 -
  { from: '%%printKouji2_20_%%', to: 'mitsumoriPrice' },
  { from: '%%printKouji2_21_%%', to: 'mitsumoriPriceGenka' },
  // - template_8 -
  { from: '%%printKouji2_22_%%', to: 'largeArari' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
type InnerParam = {
  currentPage: string,
  totalPage: string,
};

export type MitsumoriShanaiUtiwake1Param = {
  largeList: {
    // No.
    largeNumber: string,
    // 工事名称 大項目
    largeName: string,
    mediumList: {
      // 工事名称 小項目
      mediumName: string,
      // 数量
      count: string,
      // 単位
      unit: string,
      // 金額
      price: string,
      // 原価
      genka: string,
      // 粗利率
      arari: string,
      // 備考
      memo: string,
    }[],
    // 小計
    smallPrice: string,
    // 小計
    smallGenka: string,
  }[],
  // 予備費関係末の合計 金額
  yobiGokeiGokei: string,
  // 予備費関係末の合計 原価金額
  yobiGokeiGenka: string,
  // 予備原価 金額
  yobiGenkaGokei: string,
  // 予備原価 原価金額
  yobiGenkaGenka: string,
  // 合計 金額
  largePrice: string,
  // 合計 原価金額
  largePriceGenka: string,
  // 調整金額 金額
  tyouseiPrice: string,
  // 調整金額 原価金額
  tyouseiPriceGenka: string,
  // 見積金額 金額
  mitsumoriPrice: string,
  // 見積金額 原価金額
  mitsumoriPriceGenka: string,
  // 粗利率
  largeArari: string,
};

/**
 * 見積書/内訳明細1
 */
export class MitsumoriShanaiUtiwake1PdfModule extends PdfModule<MitsumoriShanaiUtiwake1Param> {
  constructor() {
    super(
      [
        template,
      ],
      replaceData,
    );
  }

  createSvg(param: MitsumoriShanaiUtiwake1Param, templateSvgStrList: string[]): string[] {
    // - 定数 -
    const height = 22;
    const maxLength = 18;
    const templateClassName = {
      large: 'template_1',
      medium: 'template_9',
      syoukei: 'template_2',
      yobiGokei: 'template_3',
      yobiGenka: 'template_4',
      goukei: 'template_5',
      tyousei: 'template_6',
      mitsumori: 'template_7',
      arari: 'template_8',
    };
    const replacedTemplateSvgStrList = [templateSvgStrList[0] || ''];
    // - 変数 -
    let rowCount = 0;
    // - 関数 -
    // -- 改ページをチェック & 新しいページを作成 --
    const checkNextPage = () => {
      if (rowCount >= maxLength) {
        replacedTemplateSvgStrList.push(templateSvgStrList[0] || '');
        rowCount = 0;
      }
    };
    // -- 複製 & ページ処理 & カウントアップ --
    const duplicate = (
      className: string,
      i: number | null,
      j: number | null,
      k: number | null,
    ) => {
      checkNextPage();
      const newSvgStr = this.duplicateElement2(
        replacedTemplateSvgStrList[replacedTemplateSvgStrList.length - 1],
        className,
        { x: 0, y: rowCount * height },
        i, j, k,
      );
      replacedTemplateSvgStrList[replacedTemplateSvgStrList.length - 1] = newSvgStr;
      rowCount += 1;
    };
    // - テンプレート複製処理 -
    const { largeList } = param;
    for (let i = 0; i < largeList.length; i += 1) {
      const large = largeList[i];
      duplicate(templateClassName.large, i, 0, null);
      for (let j = 1; j < large.mediumList.length; j += 1) {
        duplicate(templateClassName.medium, i, j, null);
      }
      // -- 小計 --
      duplicate(templateClassName.syoukei, i, null, null);
    }
    // -- 予備費関係末の合計 --
    duplicate(templateClassName.yobiGokei, null, null, null);
    // -- 予備原価 --
    duplicate(templateClassName.yobiGenka, null, null, null);
    // -- 合計 --
    duplicate(templateClassName.goukei, null, null, null);
    // -- 調整金額 --
    duplicate(templateClassName.tyousei, null, null, null);
    // -- 見積金額 --
    duplicate(templateClassName.mitsumori, null, null, null);
    // -- 粗利率 --
    duplicate(templateClassName.arari, null, null, null);
    return super.createSvg(param, replacedTemplateSvgStrList);
  }

  test(): MitsumoriShanaiUtiwake1Param {
    return ({
      largeList: [...Array(2)]
        .map((_, i) => ({
          largeNumber: String(i),
          largeName: `largeNumber_${i}`,
          mediumList: [...Array(5)]
            .map((__, j) => ({
              mediumName: `smallName_${j}`,
              count: 'count',
              unit: 'unit',
              price: 'price',
              genka: 'genka',
              arari: 'arari',
              memo: 'memo',
            })),
          smallPrice: 'smallSumPrice',
          smallGenka: 'smallGenka',
        })),
      yobiGokeiGokei: 'yobiGokeiGokei',
      yobiGokeiGenka: 'yobiGokeiGenka',
      yobiGenkaGokei: 'yobiGenkaGokei',
      yobiGenkaGenka: 'yobiGenkaGenka',
      largePrice: 'largePrice',
      largePriceGenka: 'largePriceGenka',
      tyouseiPrice: 'tyouseiPrice',
      tyouseiPriceGenka: 'tyouseiPriceGenka',
      mitsumoriPrice: 'mitsumoriPrice',
      mitsumoriPriceGenka: 'mitsumoriPriceGenka',
      largeArari: 'largeArari',
    });
  }
}
