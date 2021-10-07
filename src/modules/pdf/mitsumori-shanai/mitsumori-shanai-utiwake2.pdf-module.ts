import { PdfModule } from '../pdf-module';
import template from '../template/print_estimate_shanai_4.svg';

const replaceData = [
  // - template_1 -
  { from: '%%printKouji3_1_%{i}_%%', to: 'largeNumber' },
  { from: '%%printKouji3_2_%{i}_%%', to: 'largeName' },
  // - template_2 -
  { from: '%%printKouji3_3_%{i}_%{j}_%%', to: 'mediumName' },
  // - template_3 -
  { from: '%%printKouji3_4_%{i}_%{j}_%{k}_%%', to: 'smallName' },
  { from: '%%printKouji3_5_%{i}_%{j}_%{k}_%%', to: 'count' },
  { from: '%%printKouji3_6_%{i}_%{j}_%{k}_%%', to: 'unit' },
  { from: '%%printKouji3_7_%{i}_%{j}_%{k}_%%', to: 'uPrice' },
  { from: '%%printKouji3_8_%{i}_%{j}_%{k}_%%', to: 'price' },
  { from: '%%printKouji3_9_%{i}_%{j}_%{k}_%%', to: 'genka' },
  { from: '%%printKouji3_10_%{i}_%{j}_%{k}_%%', to: 'genkaPrice' },
  { from: '%%printKouji3_11_%{i}_%{j}_%{k}_%%', to: 'arari' },
  // - template_4 -
  { from: '%%printKouji3_12_%{i}_%{j}_%%', to: 'smallPrice' },
  { from: '%%printKouji3_13_%{i}_%{j}_%%', to: 'smallGenka' },
  // - template_5 -
  { from: '%%printKouji3_14_%{i}_%%', to: 'mediumPrice' },
  { from: '%%printKouji3_15_%{i}_%%', to: 'mediumGenka' },
  // - template_6 -
  { from: '%%printKouji3_16_%%', to: 'yobiGokeiGokei' },
  { from: '%%printKouji3_17_%%', to: 'yobiGokeiGenka' },
  // - template_7 -
  { from: '%%printKouji3_18_%%', to: 'yobiGenkaGokei' },
  { from: '%%printKouji3_19_%%', to: 'yobiGenkaGenka' },
  // - template_8 -
  { from: '%%printKouji3_20_%%', to: 'largePrice' },
  { from: '%%printKouji3_21_%%', to: 'largePriceGenka' },
  // - template_9 -
  { from: '%%printKouji3_22_%%', to: 'tyouseiPrice' },
  { from: '%%printKouji3_23_%%', to: 'tyouseiPriceGenka' },
  // - template_10 -
  { from: '%%printKouji3_24_%%', to: 'zeinukiPrice' },
  { from: '%%printKouji3_25_%%', to: 'zeinukiPriceGenka' },
  // - template_11 -
  { from: '%%printKouji3_26_%%', to: 'syouhizeiPrice' },
  { from: '%%printKouji3_27_%%', to: 'syouhizeiPriceGenka' },
  // - template_12 -
  { from: '%%printKouji3_28_%%', to: 'zeikomiPrice' },
  { from: '%%printKouji3_29_%%', to: 'zeikomiPriceGenka' },
  // - template_13 -
  { from: '%%printKouji3_30_%%', to: 'largeArari' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
type InnerParam = {
  currentPage: string,
  totalPage: string,
};

export type MitsumoriShanaiUtiwake2Param = {
  largeList: {
    // No.
    largeNumber: string,
    // 工事名称 大項目
    largeName: string,
    mediumList: {
      // 工事名称 中項目
      mediumName: string,
      smallList: {
      // 工事名称 小項目
        smallName: string,
        // 数量
        count: string,
        // 単位
        unit: string,
        // 単価
        uPrice: string,
        // 金額
        price: string,
        // 原価
        genka: string,
        // 原価金額
        genkaPrice: string,
        // 粗利率
        arari: string,
      }[],
      // 小計
      smallPrice: string,
      smallGenka: string,
    }[],
    // 中計
    mediumPrice: string,
    mediumGenka: string,
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
  // 税抜金額
  zeinukiPrice: string,
  // 税抜金額 原価金額
  zeinukiPriceGenka: string,
  // 消費税
  syouhizeiPrice: string,
  // 消費税 原価金額
  syouhizeiPriceGenka: string,
  // 税込金額
  zeikomiPrice: string,
  // 税込金額 原価金額
  zeikomiPriceGenka: string,
  // 粗利率
  largeArari: string,
};

/**
 * 見積書/内訳明細2
 */
export class MitsumoriShanaiUtiwake2PdfModule extends PdfModule<MitsumoriShanaiUtiwake2Param> {
  constructor() {
    super(
      [
        template,
      ],
      replaceData,
    );
  }

  createSvg(param: MitsumoriShanaiUtiwake2Param, templateSvgStrList: string[]): string[] {
    // - 定数 -
    const height = 22;
    const maxLength = 18;
    const templateClassName = {
      large: 'template_1',
      medium: 'template_2',
      small: 'template_3',
      syoukei: 'template_4',
      tyuukei: 'template_5',
      yobiGokei: 'template_6',
      yobiGenka: 'template_7',
      goukei: 'template_8',
      tyousei: 'template_9',
      zeinuki: 'template_10',
      syouhizei: 'template_11',
      zeikomi: 'template_12',
      arari: 'template_13',
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
      duplicate(templateClassName.large, i, null, null);
      for (let j = 0; j < large.mediumList.length; j += 1) {
        const medium = large.mediumList[j];
        duplicate(templateClassName.medium, i, j, null);
        for (let k = 0; k < medium.smallList.length; k += 1) {
          duplicate(templateClassName.small, i, j, k);
        }
        // -- 小計 --
        duplicate(templateClassName.syoukei, i, j, null);
      }
      // -- 中計 --
      duplicate(templateClassName.tyuukei, i, null, null);
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
    duplicate(templateClassName.zeinuki, null, null, null);
    // -- 見積金額 --
    duplicate(templateClassName.syouhizei, null, null, null);
    // -- 見積金額 --
    duplicate(templateClassName.zeikomi, null, null, null);
    // -- 粗利率 --
    duplicate(templateClassName.arari, null, null, null);
    return super.createSvg(param, replacedTemplateSvgStrList);
  }

  test(): MitsumoriShanaiUtiwake2Param {
    return ({
      largeList: [...Array(3)]
        .map((_, i) => ({
          largeNumber: String(i),
          largeName: `largeNumber_${i}`,
          mediumList: [...Array(4)]
            .map((__, j) => ({
              mediumName: `middleName_${j}`,
              smallList: [...Array(5)]
                .map((___, k) => ({
                  smallName: `smallName_${k}`,
                  count: 'count',
                  unit: 'unit',
                  uPrice: 'uPrice',
                  price: 'price',
                  genka: 'genka',
                  genkaPrice: 'genkaGenka',
                  arari: 'arari',
                })),
              smallPrice: 'smallSumPrice',
              smallGenka: 'smallGenka',
            })),
          mediumPrice: 'mediumPrice',
          mediumGenka: 'mediumGenka',
        })),
      yobiGokeiGokei: 'yobiGokeiGokei',
      yobiGokeiGenka: 'yobiGokeiGenka',
      yobiGenkaGokei: 'yobiGenkaGokei',
      yobiGenkaGenka: 'yobiGenkaGenka',
      largePrice: 'largePrice',
      largePriceGenka: 'largePriceGenka',
      tyouseiPrice: 'tyouseiPrice',
      tyouseiPriceGenka: 'tyouseiPriceGenka',
      zeinukiPrice: 'zeinukiPrice',
      zeinukiPriceGenka: 'zeinukiPriceGenka',
      syouhizeiPrice: 'syouhizeiPrice',
      syouhizeiPriceGenka: 'syouhizeiPriceGenka',
      zeikomiPrice: 'zeikomiPrice',
      zeikomiPriceGenka: 'zeikomiPriceGenka',
      largeArari: 'largeArari',
    });
  }
}
