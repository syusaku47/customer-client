import { PdfModule } from '../pdf-module';
import template from '../template/print_kouji_3.svg';

const replaceData = [
  // - template_1 -
  { from: '%%printKouji3_1_%{i}_%%', to: 'largeNumber' },
  { from: '%%printKouji3_2_%{i}_%%', to: 'largeName' },
  // - template_3 -
  { from: '%%printKouji3_9_%{i}_%{j}_%%', to: 'mediumName' },
  // - template_5 -
  { from: '%%printKouji3_16_%{i}_%{j}_%{k}_%%', to: 'smallName' },
  { from: '%%printKouji3_17_%{i}_%{j}_%{k}_%%', to: 'count' },
  { from: '%%printKouji3_18_%{i}_%{j}_%{k}_%%', to: 'unit' },
  { from: '%%printKouji3_19_%{i}_%{j}_%{k}_%%', to: 'uPrice' },
  { from: '%%printKouji3_20_%{i}_%{j}_%{k}_%%', to: 'price' },
  { from: '%%printKouji3_21_%{i}_%{j}_%{k}_%%', to: 'memo' },
  // - template_4 -
  { from: '%%printKouji3_22_%{i}_%{j}_%%', to: 'smallPrice' },
  { from: '%%printKouji3_23_%{i}_%{j}_%%', to: 'smallPrice' },
  // - template_2 -
  { from: '%%printKouji3_24_%{i}_%%', to: 'mediumPrice' },
  { from: '%%printKouji3_25_%{i}_%%', to: 'mediumPrice' },
  // - template_6 -
  { from: '%%printKouji3_26_%%', to: 'largePrice' },
  // { from: '%%printKouji3_27_%%', to: 'floorName' },
  // - template_11 -
  { from: '%%printKouji3_36_%%', to: 'zeinukiPrice' },
  // { from: '%%printKouji3_29_%%', to: 'largePrice' },
  // - template_8 -
  { from: '%%printKouji3_30_%%', to: 'syouhizeiPrice' },
  // { from: '%%printKouji3_31_%%', to: 'zeinukiPrice' },
  // - template_12 -
  { from: '%%printKouji3_37_%%', to: 'zeikomiPrice' },
  // { from: '%%printKouji3_33_%%', to: 'zeikomiPrice' },
  // - template_10 -
  { from: '%%printKouji3_34_%%', to: 'tyouseiPrice' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
type InnerParam = {
  currentPage: string,
  totalPage: string,
};

export type MitsumoriUtiwake2Param = {
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
        // 備考
        memo: string,
      }[],
      // 小計
      smallPrice: string,
    }[],
    // 中計
    mediumPrice: string,
  }[],
  // 合計
  largePrice: string,
  // 調整金額
  tyouseiPrice: string,
  // 税抜金額
  zeinukiPrice: string,
  // 消費税
  syouhizeiPrice: string,
  // 税込金額
  zeikomiPrice: string,
};

/**
 * 見積書/内訳明細2
 */
export class MitsumoriUtiwake2PdfModule extends PdfModule<MitsumoriUtiwake2Param> {
  constructor() {
    super(
      [
        template,
      ],
      replaceData,
    );
  }

  createSvg(param: MitsumoriUtiwake2Param, templateSvgStrList: string[]): string[] {
    // - 定数 -
    const height = 22;
    const maxLength = 18;
    const templateClassName = {
      large: 'template_1',
      medium: 'template_3',
      small: 'template_5',
      syoukei: 'template_4',
      tyuukei: 'template_2',
      goukei: 'template_6',
      tyousei: 'template_10',
      zeinuki: 'template_11',
      syouhizei: 'template_8',
      zeikomi: 'template_12',
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
    // -- 調整金額 --
    duplicate(templateClassName.goukei, null, null, null);
    // -- 調整金額 --
    duplicate(templateClassName.tyousei, null, null, null);
    // -- 税抜合計金額 --
    duplicate(templateClassName.zeinuki, null, null, null);
    // -- 消費税 --
    duplicate(templateClassName.syouhizei, null, null, null);
    // -- 税込合計金額 --
    duplicate(templateClassName.zeikomi, null, null, null);
    return super.createSvg(param, replacedTemplateSvgStrList);
  }

  test(): MitsumoriUtiwake2Param {
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
                  memo: 'memo',
                })),
              smallPrice: 'smallSumPrice',
            })),
          mediumPrice: 'mediumPrice',
        })),
      largePrice: 'largePrice',
      tyouseiPrice: 'tyouseiPrice',
      zeinukiPrice: 'zeinukiPrice',
      syouhizeiPrice: 'syouhizeiPrice',
      zeikomiPrice: 'zeikomiPrice',
    });
  }
}
