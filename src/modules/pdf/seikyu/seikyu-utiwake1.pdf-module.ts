import { PdfModule } from '../pdf-module';
import template from '../template/print_kouji_2.svg';

const replaceData = [
  // - template_1 -
  { from: '%%printKouji2_1_%{i}_%%', to: 'largeNumber' },
  { from: '%%printKouji2_2_%{i}_%%', to: 'largeName' },
  // - template_1 / template_6 -
  { from: '%%printKouji2_3_%{i}_%{j}_%%', to: 'mediumName' },
  { from: '%%printKouji2_4_%{i}_%{j}_%%', to: 'count' },
  { from: '%%printKouji2_5_%{i}_%{j}_%%', to: 'unit' },
  { from: '%%printKouji2_6_%{i}_%{j}_%%', to: 'price' },
  { from: '%%printKouji2_7_%{i}_%{j}_%%', to: 'memo' },
  // - template_2 -
  { from: '%%printKouji2_8_%{i}_%%', to: 'smallPrice' },
  // - template_3 -
  { from: '%%printKouji2_9_%%', to: 'largePrice' },
  // - template_4 -
  { from: '%%printKouji2_10_%%', to: 'tyouseiPrice' },
  // - template_5 -
  { from: '%%printKouji2_11_%%', to: 'mitsumoriPrice' },
  // - template_6 - 合計金額使う場合、コメントアウトを解除
  // { from: '%%printKouji2_12_%%', to: 'mitsumoriPrice' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
type InnerParam = {
  currentPage: string,
  totalPage: string,
};

export type SeikyuUtiwake1Param = {
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
      // 備考
      memo: string,
    }[],
    // 小計
    smallPrice: string,
  }[],
  // 合計
  largePrice: string,
  // 調整金額
  tyouseiPrice: string,
  // 見積金額
  mitsumoriPrice: string,
};

/**
 * 請求書/内訳明細1
 */
export class SeikyuUtiwake1PdfModule extends PdfModule<SeikyuUtiwake1Param> {
  constructor() {
    super(
      [
        template,
      ],
      replaceData,
    );
  }

  createSvg(param: SeikyuUtiwake1Param, templateSvgStrList: string[]): string[] {
    // - 定数 -
    const height = 22;
    const maxLength = 18;
    const templateClassName = {
      large: 'template_1',
      small: 'template_6',
      syoukei: 'template_2',
      tyousei: 'template_4',
      goukei: 'template_3',
      // 見積金額
      mitsumori: 'template_5',
      // 合計金額
      // mitsumori: 'template_6',
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
        duplicate(templateClassName.small, i, j, null);
      }
      // -- 小計 --
      duplicate(templateClassName.syoukei, i, null, null);
    }
    // -- 合計 --
    duplicate(templateClassName.goukei, null, null, null);
    // -- 調整金額 --
    duplicate(templateClassName.tyousei, null, null, null);
    // -- 見積金額 --
    duplicate(templateClassName.mitsumori, null, null, null);
    return super.createSvg(param, replacedTemplateSvgStrList);
  }

  test(): SeikyuUtiwake1Param {
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
              memo: 'memo',
            })),
          smallPrice: 'smallSumPrice',
        })),
      largePrice: 'largePrice',
      tyouseiPrice: 'tyouseiPrice',
      mitsumoriPrice: 'mitsumoriPrice',
    });
  }
}
