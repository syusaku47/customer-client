import { PdfModule } from '../pdf-module';
import template from '../template/print_bill_1.svg';
import { HAGIWARA_LOGO_PNG } from '../template/hagiwara_logo';

const replaceData = [
  { from: '%%printBill1_1_%%', to: 'name' },
  { from: '%%printBill1_2_%%', to: 'no' },
  { from: '%%printBill1_3_%%', to: 'date' },
  { from: '%%printBill1_4_%%', to: 'price' },
  { from: '%%printBill1_5_%%', to: 'excludingTax' },
  { from: '%%printBill1_6_%%', to: 'consumptionTax' },
  { from: '%%printBill1_7_%%', to: 'projectName' },
  { from: '%%printBill1_8_%%', to: 'field1' },
  { from: '%%printBill1_9_%%', to: 'field2' },
  { from: '%%printBill1_10_%{i}_%%', to: 'banks0' },
  { from: '%%printBill1_11_%{i}_%%', to: 'banks1' },
  { from: '%%printBill1_12_%{i}_%%', to: 'banks2' },
  { from: '%%printBill1_13_%{i}_%%', to: 'banks3' },
  { from: '%%printBill1_30_%%', to: 'icon' },
  { from: '%%printBill1_31_%%', to: 'company' },
  { from: '%%printBill1_32_%%', to: 'company2' },
  { from: '%%printBill1_33_%%', to: 'post' },
  { from: '%%printBill1_34_%%', to: 'address' },
  { from: '%%printBill1_35_%%', to: 'tel' },
  { from: '%%printBill1_36_%%', to: 'fax' },
  { from: '%%printBill1_37_%%', to: 'freeDial' },
  { from: '%%printBill1_38_%%', to: 'nameCeo' },
  { from: '%%printBill1_39_%%', to: 'nameCharge' },
];

export type BillParam = {
  // 顧客名
  name: string,
  // No.
  no: string,
  // 日付
  date: string,
  // 金額
  price: string,
  // 税抜き請求金額
  excludingTax: string,
  // 消費税額
  consumptionTax: string,
  // 工事名称
  projectName: string,
  // 工事場所1
  field1: string,
  // 工事場所2
  field2: string,
  // 備考
  remarks: string,
  // 振込先 (max : 5)
  banks: {
    banks0: string,
    banks1: string,
    banks2: string,
    banks3: string,
  }[],
  // アイコン
  icon: string,
  // 会社名
  company: string,
  // 会社名2
  company2: string,
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
  // 代表取締役名
  nameCeo: string,
  // 担当者名
  nameCharge: string,
};

const defaultStr = '---';

const defaultProps = {
  // 顧客名
  name: defaultStr,
  // No.
  no: defaultStr,
  // 日付
  date: defaultStr,
  // 金額
  price: defaultStr,
  // 税抜き請求金額
  excludingTax: defaultStr,
  // 消費税額
  consumptionTax: defaultStr,
  // 工事名称
  projectName: defaultStr,
  // 工事場所1
  field1: defaultStr,
  // 工事場所2
  field2: defaultStr,
  // 備考
  remarks: defaultStr,
  // 振込先 (max : 5)
  banks: [
    {
      banks0: defaultStr,
      banks1: defaultStr,
      banks2: defaultStr,
      banks3: defaultStr,
    },
    {
      banks0: defaultStr,
      banks1: defaultStr,
      banks2: defaultStr,
      banks3: defaultStr,
    },
    {
      banks0: defaultStr,
      banks1: defaultStr,
      banks2: defaultStr,
      banks3: defaultStr,
    },
  ],
  // アイコン
  icon: HAGIWARA_LOGO_PNG,
  // 会社名
  company: defaultStr,
  // 会社名2
  company2: defaultStr,
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
  // 代表取締役名
  nameCeo: defaultStr,
  // 担当者名
  nameCharge: defaultStr,
};

/**
 * 請求書
 */
export class BillPdfModule extends PdfModule<BillParam> {
  constructor() {
    super(
      [
        template,
      ],
      replaceData,
    );
  }

  createSvg(
    param: BillParam,
    templateSvgStrList: string[] = this.templateSvgStrCollection,
  ): string[] {
    const height = 24;
    const maxLength = 5;
    // const maxPage = Math.ceil(param.buildingItems.length / maxLength);
    // 1ページ分しか出力しない
    const maxPage = 1;
    const templateSvgStr = templateSvgStrList[0] || '';
    const replacedTemplateSvgStrList = [...new Array(maxPage)].fill(templateSvgStr)
      .map((page: string, pageIndex: number) => {
        let replacedPage = page;
        for (let i = 0; i < maxLength; i += 1) {
          console.group(i);
          console.log(pageIndex * maxLength + i < param.banks.length);
          if (pageIndex * maxLength + i < param.banks.length) {
            replacedPage = this.duplicateElement(
              replacedPage,
              'repeat_i',
              { x: 0, y: height * i },
              pageIndex * maxLength + i,
              'i',
            );
          }
          console.groupEnd();
        }
        return replacedPage;
      });
    return super.createSvg(param, replacedTemplateSvgStrList);
  }

  async createSvgList(param: BillParam = defaultProps): Promise<string[]> {
    return super.createSvgList(param);
  }
}
