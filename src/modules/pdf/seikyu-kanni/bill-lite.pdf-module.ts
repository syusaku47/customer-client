import { PdfModule } from '../pdf-module';
import template from '../template/print_bill_lite.svg';
import { HAGIWARA_LOGO_PNG } from '../template/hagiwara_logo';

const replaceData = [
  { from: '%%printBillLite1_1_%%', to: 'name' },
  { from: '%%printBillLite1_2_%%', to: 'date' },
  { from: '%%printBillLite1_3_%%', to: 'projectName' },
  { from: '%%printBillLite1_4_%%', to: 'zeikomiPrice' },
  { from: '%%printBillLite1_5_%%', to: 'price' },
  { from: '%%printBillLite1_6_%%', to: 'totalSyouhizeiPrice' },
  { from: '%%printBillLite1_7_%%', to: 'company' },
  { from: '%%printBillLite1_8_%%', to: 'companyShiten' },
  { from: '%%printBillLite1_9_%%', to: 'post' },
  { from: '%%printBillLite1_10_%%', to: 'address' },
  { from: '%%printBillLite1_11_%%', to: 'tel' },
  { from: '%%printBillLite1_12_%%', to: 'fax' },
  { from: '%%printBillLite1_13_%%', to: 'freeDial' },
  { from: '%%printBillLite1_14_%%', to: 'icon' },
  { from: '%%printBillLite1_15_%{i}_%%', to: 'bankName' },
  { from: '%%printBillLite1_16_%{i}_%%', to: 'shiten' },
  { from: '%%printBillLite1_17_%{i}_%%', to: 'type' },
  { from: '%%printBillLite1_18_%{i}_%%', to: 'number' },
  { from: '%%printBillLite1_35_%%', to: 'page' },
  { from: '%%printBillLite1_36_%{i}_%%', to: 'contract' },
  { from: '%%printBillLite1_37_%{i}_%%', to: 'construction' },
  { from: '%%printBillLite1_38_%{i}_%%', to: 'count' },
  { from: '%%printBillLite1_39_%{i}_%%', to: 'unit' },
  { from: '%%printBillLite1_40_%{i}_%%', to: 'constructionPrice' },
  { from: '%%printBillLite1_41_%{i}_%%', to: 'syouhizeiPrice' },
];

export type BillLiteParam = {
  // 顧客名
  name: string,
  // 日付
  date: string,
  // 税込み合計金額
  zeikomiPrice: string,
  // 工事名称
  projectName: string,
  // 工事金額合計
  price: string,
  // 消費税額合計
  totalSyouhizeiPrice: string,
  // 振込先 (max : 5)
  banks: {
    bankName: string,
    shiten: string,
    type: string,
    number: string,
  }[],
  // アイコン
  icon: string,
  // 会社名
  company: string,
  // 会社名2
  companyShiten: string,
  // 郵便番号
  post: string,
  // 住所
  address: string,
  // 電話番号
  tel: string,
  // FAX
  fax: string,
  // フリーダイヤル
  freeDial: string,
  // 内訳一覧
  breakdownList: {
    // 契約日
    contract: string,
    // 工事内訳
    construction: string,
    // 数量
    count: string,
    // 単位
    unit: string,
    // 工事金額
    constructionPrice: string,
    // 消費税
    syouhizeiPrice: string,
  }[],
};

const defaultStr = '---';

const logoImageData = HAGIWARA_LOGO_PNG;

const defaultProps: BillLiteParam = {
  // 顧客名
  name: defaultStr,
  // 日付
  date: defaultStr,
  // 税込み合計金額
  zeikomiPrice: defaultStr,
  // 工事名称
  projectName: defaultStr,
  // 工事金額合計
  price: defaultStr,
  // 消費税額合計
  totalSyouhizeiPrice: defaultStr,
  // 振込先 (max : 5)
  banks: [
    {
      bankName: defaultStr,
      shiten: defaultStr,
      type: defaultStr,
      number: defaultStr,
    },
  ],
  // アイコン
  icon: logoImageData,
  // 会社名
  company: defaultStr,
  // 会社名2
  companyShiten: defaultStr,
  // 郵便番号
  post: defaultStr,
  // 住所
  address: defaultStr,
  // 電話番号
  tel: defaultStr,
  // FAX
  fax: defaultStr,
  // フリーダイヤル
  freeDial: defaultStr,
  // 内訳一覧
  breakdownList: [
    {
      // 契約日
      contract: defaultStr,
      // 工事内訳
      construction: defaultStr,
      // 数量
      count: defaultStr,
      // 単位
      unit: defaultStr,
      // 工事金額
      constructionPrice: defaultStr,
      // 消費税
      syouhizeiPrice: defaultStr,
    },
    {
      // 契約日
      contract: defaultStr,
      // 工事内訳
      construction: defaultStr,
      // 数量
      count: defaultStr,
      // 単位
      unit: defaultStr,
      // 工事金額
      constructionPrice: defaultStr,
      // 消費税
      syouhizeiPrice: defaultStr,
    },
  ],
};

/**
 * 請求書
 */
export class BillLitePdfModule extends PdfModule<BillLiteParam> {
  constructor() {
    super(
      [
        template,
      ],
      replaceData,
    );
  }

  createSvg(
    param: BillLiteParam,
    templateSvgStrList: string[] = this.templateSvgStrCollection,
  ): string[] {
    const height = 24;
    // 振込先の表示限界数
    const bankMaxLength = 5;
    const onePageRecord = 15;
    const recordHeight = 20.8;
    const pageNum = Math.ceil(param.breakdownList.length / onePageRecord);
    const templateSvgStr = templateSvgStrList[0] || '';
    if (param.banks.length > bankMaxLength) {
      window.console.warn('テンプレートに入らないサイズの銀行情報が入力されています。');
    }
    const replacedTemplateSvgStrList = [...new Array(pageNum)].fill(templateSvgStr)
      .map((page: string, pageIndex: number) => {
        let replacedPage = page;
        /** 振込先の処理 */
        for (let i = 0; i < param.banks.length; i += 1) {
          replacedPage = this.duplicateElement(
            replacedPage,
            'repeat_i',
            { x: 0, y: height * i },
            i,
            'i',
          );
        }
        /** 工事の処理 */
        // 残りの個数
        const restOfRowValue = param.breakdownList.length - pageIndex * onePageRecord;
        // 残りの個数から割り出した、繰り返しの終わり
        const endIndex = (restOfRowValue < onePageRecord) ? restOfRowValue : onePageRecord;
        for (let i = 0; i < endIndex; i += 1) {
          replacedPage = this.duplicateElement(
            replacedPage,
            'repeat_j',
            { x: 0, y: recordHeight * i },
            pageIndex * onePageRecord + i,
            'i',
          );
        }
        replacedPage = replacedPage.replace(/%%printBillLite1_35_%%/g, `${pageIndex + 1}/${pageNum}`);
        return replacedPage;
      });
    return super.createSvg(param, replacedTemplateSvgStrList);
  }

  async createSvgList(param: BillLiteParam = defaultProps): Promise<string[]> {
    return super.createSvgList(param);
  }

  test(): BillLiteParam {
    return {
      // 顧客名
      name: 'name',
      // 日付
      date: 'date',
      // 税込み合計金額
      zeikomiPrice: 'totalPrice',
      // 工事名称
      projectName: 'projectName',
      // 工事金額合計
      price: 'price',
      // 消費税額合計
      totalSyouhizeiPrice: 'taxPrice',
      // 振込先 (max : 5)
      banks: [...Array(5)].map((_, i) => ({
        bankName: `name${i}`,
        shiten: `shiten${i}`,
        type: `type${i}`,
        number: `number${i}`,
      })),
      // アイコン
      icon: logoImageData,
      // 会社名
      company: 'company',
      // 会社名2
      companyShiten: 'company2',
      // 郵便番号
      post: 'post',
      // 住所
      address: 'address',
      // 電話番号
      tel: 'tel',
      // FAX
      fax: 'fax',
      // フリーダイヤル
      freeDial: 'freeDial',
      // 内訳一覧
      breakdownList: [...Array(43)].map((_, i) => ({
        // 契約日
        contract: `contract_${i}`,
        // 工事内訳
        construction: `construction_${i}`,
        // 数量
        count: `suryo_${i}`,
        // 単位
        unit: `unit_${i}`,
        // 工事金額
        constructionPrice: `price_${i}`,
        // 消費税
        syouhizeiPrice: `tax_${i}`,
      })),
    };
  }
}
