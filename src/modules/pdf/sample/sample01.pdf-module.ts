import { PdfModule } from '../pdf-module';
import template from '../template/sample01.svg';

const replaceData = [
  { from: '%%webnet_rpl_contract1_1_%%', to: 'contractNumber' },
  { from: '%%webnet_rpl_contract1_2_%%', to: 'contractYear' },
  { from: '%%webnet_rpl_contract1_3_%%', to: 'contractMonth' },
  { from: '%%webnet_rpl_contract1_4_%%', to: 'contractDay' },
  { from: '%%webnet_rpl_contract1_5_%%', to: 'customerName' },
  { from: '%%webnet_rpl_contract1_6_%%', to: 'customer1Postal1' },
  { from: '%%webnet_rpl_contract1_7_%%', to: 'customer1Postal2' },
  { from: '%%webnet_rpl_contract1_8_%%', to: 'customer1Address1' },
  { from: '%%webnet_rpl_contract1_26_%%', to: 'customer1Address2' },
  { from: '%%webnet_rpl_contract1_9_%%', to: 'customer1NameKana' },
  { from: '%%webnet_rpl_contract1_10_%%', to: 'customer1Name' },
  { from: '%%webnet_rpl_contract1_11_%%', to: 'customer1Tel' },
  { from: '%%webnet_rpl_contract1_12_%%', to: 'customer2Postal1' },
  { from: '%%webnet_rpl_contract1_13_%%', to: 'customer2Postal2' },
  { from: '%%webnet_rpl_contract1_14_%%', to: 'customer2Address1' },
  { from: '%%webnet_rpl_contract1_27_%%', to: 'customer2Address2' },
  { from: '%%webnet_rpl_contract1_15_%%', to: 'customer2NameKana' },
  { from: '%%webnet_rpl_contract1_16_%%', to: 'customer2Name' },
  { from: '%%webnet_rpl_contract1_17_%%', to: 'coSignerAddress1' },
  { from: '%%webnet_rpl_contract1_28_%%', to: 'coSignerAddress2' },
  { from: '%%webnet_rpl_contract1_18_%%', to: 'coSignerName' },
  { from: '%%webnet_rpl_contract1_19_%%', to: 'bettorLocation1' },
  { from: '%%webnet_rpl_contract1_29_%%', to: 'bettorLocation2' },
  { from: '%%webnet_rpl_contract1_20_%%', to: 'bettorCorporateName' },
  { from: '%%webnet_rpl_contract1_21_%%', to: 'bettorRepresentativeDirector' },
  { from: '%%webnet_rpl_contract1_22_%%', to: 'franchiseStoreName' },
  { from: '%%webnet_rpl_contract1_23_%%', to: 'franchiseStoreTel' },
  { from: '%%webnet_rpl_contract1_24_%%', to: 'salesRepresentative' },
  { from: '%%webnet_rpl_contract1_25_%%', to: 'responsiblePersons' },
];

export type EstimateParam1 = {
  /** 契約番号 */
  contractNumber: string,
  /** 契約年 */
  contractYear: string,
  /** 契約月 */
  contractMonth: string,
  /** 契約日 */
  contractDay: string,
  /** 契約者 */
  customerName: string,
  /** 発注者1 郵便番号1 */
  customer1Postal1: string,
  /** 発注者1 郵便番号2 */
  customer1Postal2: string,
  /** 発注者1 住所 */
  customer1Address1: string,
  customer1Address2: string,
  /** 発注者1 名前 かな */
  customer1NameKana: string,
  /** 発注者1 名前 */
  customer1Name: string,
  /** 発注者1 電話番号 */
  customer1Tel: string,
  /** 発注者2 郵便番号1 */
  customer2Postal1: string,
  /** 発注者2 郵便番号2 */
  customer2Postal2: string,
  /** 発注者2 住所 */
  customer2Address1: string,
  customer2Address2: string,
  /** 発注者2 名前 かな */
  customer2NameKana: string,
  /** 発注者2 名前 */
  customer2Name: string,
  /** 連帯保証人 住所 */
  coSignerAddress1: string,
  coSignerAddress2: string,
  /** 連帯保証人 名前 */
  coSignerName: string,
  /** 受注者 所在地 */
  bettorLocation1: string,
  bettorLocation2: string,
  /** 受注者 法人名 */
  bettorCorporateName: string,
  /** 受注者 代表取締役 */
  bettorRepresentativeDirector: string,
  /** フランチャイズチェーン店 店舗名 */
  franchiseStoreName: string,
  /** フランチャイズチェーン店 電話番号 */
  franchiseStoreTel: string,
  /** 営業担当者氏名 */
  salesRepresentative: string,
  /** 工事責任者氏名 */
  responsiblePersons: string,
};

const defaultProps = {
  /** 契約番号 */
  contractNumber: '---',
  /** 契約年 */
  contractYear: '---',
  /** 契約月 */
  contractMonth: '---',
  /** 契約日 */
  contractDay: '---',
  /** 契約者 */
  customerName: '---',
  /** 発注者1 郵便番号1 */
  customer1Postal1: '---',
  /** 発注者1 郵便番号2 */
  customer1Postal2: '---',
  /** 発注者1 住所 */
  customer1Address1: '---',
  customer1Address2: '---',
  /** 発注者1 名前 かな */
  customer1NameKana: '---',
  /** 発注者1 名前 */
  customer1Name: '---',
  /** 発注者1 電話番号 */
  customer1Tel: '---',
  /** 発注者2 郵便番号1 */
  customer2Postal1: '---',
  /** 発注者2 郵便番号2 */
  customer2Postal2: '---',
  /** 発注者2 住所 */
  customer2Address1: '---',
  customer2Address2: '---',
  /** 発注者2 名前 かな */
  customer2NameKana: '---',
  /** 発注者2 名前 */
  customer2Name: '---',
  /** 連帯保証人 住所 */
  coSignerAddress1: '---',
  coSignerAddress2: '---',
  /** 連帯保証人 名前 */
  coSignerName: '---',
  /** 受注者 所在地 */
  bettorLocation1: '---',
  bettorLocation2: '---',
  /** 受注者 法人名 */
  bettorCorporateName: '---',
  /** 受注者 代表取締役 */
  bettorRepresentativeDirector: '---',
  /** フランチャイズチェーン店 店舗名 */
  franchiseStoreName: '---',
  /** フランチャイズチェーン店 電話番号 */
  franchiseStoreTel: '---',
  /** 営業担当者氏名 */
  salesRepresentative: '---',
  /** 工事責任者氏名 */
  responsiblePersons: '---',
};

/**
 * 工事請負契約書
 */
export class Sample01PdfModule extends PdfModule<EstimateParam1> {
  constructor() {
    super(
      [
        template,
      ],
      replaceData,
    );
  }

  createSvg(
    param: EstimateParam1,
    templateSvgStrList: string[] = this.templateSvgStrCollection,
  ): string[] {
    console.log('param : ', param);
    console.log('templateSvgStrList : ', templateSvgStrList);
    return super.createSvg(param, templateSvgStrList);
  }

  async createSvgList(param: EstimateParam1 = defaultProps): Promise<string[]> {
    return super.createSvgList(param);
  }
}
