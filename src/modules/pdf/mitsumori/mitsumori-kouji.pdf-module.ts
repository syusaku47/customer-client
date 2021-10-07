import { PdfModule } from '../pdf-module';
import template from '../template/print_kouji_1.svg';

const replaceData = [
  // - template_1 -
  { from: '%%printKouji1_1_%{i}_%%', to: 'largeNumber' },
  { from: '%%printKouji1_2_%{i}_%%', to: 'largeName' },
  { from: '%%printKouji1_3_%{i}_%%', to: 'count' },
  { from: '%%printKouji1_4_%{i}_%%', to: 'unit' },
  { from: '%%printKouji1_5_%{i}_%%', to: 'price' },
  { from: '%%printKouji1_6_%{i}_%%', to: 'memo' },
  // - template_2 -
  { from: '%%printKouji1_7_%%', to: 'largePrice' },
  // - template_3 -
  { from: '%%printKouji1_8_%%', to: 'tyouseiPrice' },
  // - template_5 -
  { from: '%%printKouji1_10_%%', to: 'mitsumoriPrice' },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
type InnerParam = {
  currentPage: string,
  totalPage: string,
};

export type MitsumoriUtiwakeParam = {
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
    // 備考
    memo: string,
  }[],
  // 合計
  largePrice: string,
  // 調整金額
  tyouseiPrice: string,
  // 見積金額
  mitsumoriPrice: string,
};

/**
 * 見積書/工事明細1
 */
export class MitsumoriKoujiPdfModule extends PdfModule<MitsumoriUtiwakeParam> {
  constructor() {
    super(
      [
        template,
      ],
      replaceData,
    );
  }

  createSvg(param: MitsumoriUtiwakeParam, templateSvgStrList: string[]): string[] {
    // - 定数 -
    const height = 22;
    const maxLength = 18;
    const templateClassName = {
      large: 'template_1',
      tyousei: 'template_3',
      goukei: 'template_2',
      mitsumori: 'template_5',
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
    // -- 合計 --
    duplicate(templateClassName.goukei, null, null, null);
    // -- 調整金額 --
    duplicate(templateClassName.tyousei, null, null, null);
    // -- 見積金額 --
    duplicate(templateClassName.mitsumori, null, null, null);
    return super.createSvg(param, replacedTemplateSvgStrList);
  }

  test(): MitsumoriUtiwakeParam {
    return ({
      largeList: [...Array(10)]
        .map((_, i) => ({
          largeNumber: String(i),
          largeName: `largeNumber_${i}`,
          count: 'count',
          unit: 'unit',
          price: 'price',
          memo: 'memo',
        })),
      largePrice: 'largePrice',
      tyouseiPrice: 'tyouseiPrice',
      mitsumoriPrice: 'mitsumoriPrice',
    });
  }
}
