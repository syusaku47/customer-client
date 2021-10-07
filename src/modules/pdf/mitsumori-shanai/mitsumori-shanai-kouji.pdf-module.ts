import { PdfModule } from '../pdf-module';
import template from '../template/print_estimate_shanai_2.svg';

const replaceData = [
  // - template_1 -
  { from: '%%printKouji1_1_%{i}_%%', to: 'largeNumber' },
  { from: '%%printKouji1_2_%{i}_%%', to: 'largeName' },
  { from: '%%printKouji1_3_%{i}_%%', to: 'count' },
  { from: '%%printKouji1_4_%{i}_%%', to: 'unit' },
  { from: '%%printKouji1_5_%{i}_%%', to: 'price' },
  { from: '%%printKouji1_6_%{i}_%%', to: 'genka' },
  { from: '%%printKouji1_7_%{i}_%%', to: 'arari' },
  { from: '%%printKouji1_8_%{i}_%%', to: 'memo' },
  // - template_2 -
  { from: '%%printKouji1_9_%%', to: 'yobiGokeiGokei' },
  { from: '%%printKouji1_10_%%', to: 'yobiGokeiGenka' },
  // - template_3 -
  { from: '%%printKouji1_11_%%', to: 'yobiGenkaGokei' },
  { from: '%%printKouji1_12_%%', to: 'yobiGenkaGenka' },
  // - template_4 -
  { from: '%%printKouji1_13_%%', to: 'largePrice' },
  { from: '%%printKouji1_14_%%', to: 'largePriceGenka' },
  // - template_5 -
  { from: '%%printKouji1_15_%%', to: 'tyouseiPrice' },
  { from: '%%printKouji1_16_%%', to: 'tyouseiPriceGenka' },
  // - template_6 -
  { from: '%%printKouji1_17_%%', to: 'mitsumoriPrice' },
  { from: '%%printKouji1_18_%%', to: 'mitsumoriPriceGenka' },
  // - template_7 -
  { from: '%%printKouji1_19_%%', to: 'largeArari' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
type InnerParam = {
  currentPage: string,
  totalPage: string,
};

export type MitsumoriShanaiUtiwakeParam = {
  largeList: {
    // No.
    largeNumber: string,
    // 工事名称 大項目
    largeName: string,
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
 * 見積書/工事明細1
 */
export class MitsumoriShanaiKoujiPdfModule extends PdfModule<MitsumoriShanaiUtiwakeParam> {
  constructor() {
    super(
      [
        template,
      ],
      replaceData,
    );
  }

  createSvg(param: MitsumoriShanaiUtiwakeParam, templateSvgStrList: string[]): string[] {
    // - 定数 -
    const height = 22;
    const maxLength = 18;
    const templateClassName = {
      large: 'template_1',
      yobiGokei: 'template_2',
      yobiGenka: 'template_3',
      goukei: 'template_4',
      tyousei: 'template_5',
      mitsumori: 'template_6',
      arari: 'template_7',
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
      duplicate(templateClassName.large, i, null, null);
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

  test(): MitsumoriShanaiUtiwakeParam {
    return ({
      largeList: [...Array(10)]
        .map((_, i) => ({
          largeNumber: String(i),
          largeName: `largeNumber_${i}`,
          count: 'count',
          unit: 'unit',
          price: 'price',
          genka: 'genka',
          arari: 'arari',
          memo: 'memo',
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
