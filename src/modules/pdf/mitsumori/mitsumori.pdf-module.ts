import { PdfModule } from '../pdf-module';
import template from '../template/print_estimate_1.svg';
import { HAGIWARA_LOGO_PNG } from '../template/hagiwara_logo';

const replaceData = [
  { from: '%%printEstimate1_1_%%', to: 'name' },
  { from: '%%printEstimate1_2_%%', to: 'no' },
  { from: '%%printEstimate1_3_%%', to: 'date' },
  { from: '%%printEstimate1_4_%%', to: 'price' },
  { from: '%%printEstimate1_5_%%', to: 'excludingTax' },
  { from: '%%printEstimate1_6_%%', to: 'consumptionTax' },
  { from: '%%printEstimate1_7_%%', to: 'projectName' },
  { from: '%%printEstimate1_8_%%', to: 'field1' },
  { from: '%%printEstimate1_9_%%', to: 'field2' },
  { from: '%%printEstimate1_10_%%', to: 'customerTel' },
  { from: '%%printEstimate1_11_%%', to: 'expirationDate' },
  { from: '%%printEstimate1_12_%%', to: 'remarks' },
  { from: '%%printEstimate1_30_%%', to: 'icon' },
  { from: '%%printEstimate1_31_%%', to: 'company' },
  { from: '%%printEstimate1_32_%%', to: 'company2' },
  { from: '%%printEstimate1_33_%%', to: 'post' },
  { from: '%%printEstimate1_34_%%', to: 'address' },
  { from: '%%printEstimate1_35_%%', to: 'tel' },
  { from: '%%printEstimate1_36_%%', to: 'fax' },
  { from: '%%printEstimate1_37_%%', to: 'freeDial' },
  { from: '%%printEstimate1_38_%%', to: 'nameCeo' },
  { from: '%%printEstimate1_39_%%', to: 'nameCharge' },
];

export type EstimateParam = {
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
  // 顧客電話番号
  customerTel: string,
  // 見積有効期限
  expirationDate: string,
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
  // 顧客電話番号
  customerTel: defaultStr,
  // 見積有効期限
  expirationDate: defaultStr,
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
 * 見積書
 */
export class EstimatePdfModule extends PdfModule<EstimateParam> {
  constructor() {
    super(
      [
        template,
      ],
      replaceData,
    );
  }

  createSvg(
    param: EstimateParam,
    templateSvgStrList: string[] = this.templateSvgStrCollection,
  ): string[] {
    // const maxPage = Math.ceil(param.buildingItems.length / maxLength);
    // 1ページ分しか出力しない
    const maxPage = 1;
    const templateSvgStr = templateSvgStrList[0] || '';
    const replacedTemplateSvgStrList = [...new Array(maxPage)].fill(templateSvgStr)
      .map((page: string) => page);
    return super.createSvg(param, replacedTemplateSvgStrList);
  }

  async createSvgList(param: EstimateParam = defaultProps): Promise<string[]> {
    return super.createSvgList(param);
  }
}
