import lodash from 'lodash';
import { CustomerSortState, EditState } from '../../type/customer/customer.type';
import { MapCollection } from '../map/map.collection';

export const DummyCustomerImg = `https://maps.googleapis.com/maps/api/streetview?size=${100}x${100}&location=${35.69968628738344},${139.78094970307592}&fov=80&heading=70&pitch=0&key=${MapCollection.apiKey}`;

export class CustomerCollection {
  private static _customerHeader = [
    '入力不備',
    'OBフラグ',
    '顧客担当営業',
    '顧客ID',
    '顧客名',
    'フリガナ',
    '郵便番号',
    '都道府県',
    '住所',
    'TEL',
    '見込みランク',
    '顧客ランク',
    'エリア',
    '建物分類',
    '間取り',
    '築年数',
    '備考',
  ];

  private static _familyHeader = [
    '氏名',
    '続柄',
    '携帯電話',
    '生年月日',
  ];

  private static _petHeader = [
    '名前',
    '種別',
    '性別',
    '才',
  ];

  private static _projectInfoHeader = [
    '案件名',
    '受注金額（契約金額）',
    '案件担当者',
    '登録日',
    '着工日',
    '完工日',
    '完了日',
    '発生源',
    '契約日',
    '失注日',
    'キャンセル日',
    '備考',
  ];

  private static _supportHistoryHeader = [
    '対応済',
    '案件名',
    '受付日時',
    'カテゴリ',
    '件名',
    '対応者',
    '対応日',
  ];

  private static _fileHeader = [
    'No.',
    'ファイル名',
    '形式',
    'サイズ',
    'アップロード日時',
    '更新者',
    'コメント',
    '',
    '',
  ];

  private static _maintenanceHeader = [
    '',
    '対応済',
    '案件名',
    '着工日',
    '完工日',
    '見積作成者',
    'メンテナンス日',
    'タイトル',
    '対応日',
  ];

  private static _customerSortInitialState: () =>
    Required<CustomerSortState> = () => lodash.cloneDeep({
      ob_flag: NaN,
      name: '',
      furigana: '',
      tel_no: '',
      tel_no2: '',
      post_no1: '',
      post_no2: '',
      prefecture: NaN,
      address: '',
      estimated_rank: NaN,
      estimated_rank_filter: 1,
      rank: NaN,
      rank_filter: 1,
      area: NaN,
      sales_shop: NaN,
      sales_contact: NaN,
      customer_category: NaN,
      building_category: NaN,
      madori: NaN,
      building_age: NaN,
      completion_start_year: NaN,
      completion_start_month: NaN,
      completion_end_year: NaN,
      completion_end_month: NaN,
      last_completion_start_year: NaN,
      last_completion_start_month: NaN,
      last_completion_end_year: NaN,
      last_completion_end_month: NaN,
      total_work_price_min: NaN,
      total_work_price_max: NaN,
      work_times_min: NaN,
      work_times_max: NaN,
      tags: null,
      parts: null,
      remarks: '',
      is_deficiency: false,
      offset: 0,
      limit: 100,
      sort_by: 3,
      highlow: 1,
    });

  private static _customerEditInitialState: EditState = lodash.cloneDeep({
    sales_shop: NaN,
    sales_contact: NaN,
    name: '',
    keisho: '様',
    furigana: '',
    tel_no: '',
    tel_no2: '',
    tel_no3: '',
    fax_no: '',
    mail_address: '',
    mail_address2: '',
    mail_address3: '',
    post_no: '',
    prefecture: NaN,
    city: '',
    address: '',
    building_name: '',
    line_id: '',
    facebook_id: '',
    twitter_id: '',
    instagram_id: '',
    rank: NaN,
    source: NaN,
    area: NaN,
    expected_part_list: null,
    part_list: null,
    building_category: NaN,
    madori: NaN,
    building_age: 0,
    remarks: '',
    memo1: '',
    memo2: '',
    my_car_type: null,
    my_car_type_other1: '',
    my_car_type_other2: '',
    tag_list: null,
    introducer: '',
    wedding_anniversary: null,
    lat: '',
    lng: '',
    post_no1: '',
    post_no2: '',
  });

  private static _petSexualOption = [
    { text: '指定なし', value: 1 },
    { text: 'オス', value: 2 },
    { text: 'メス', value: 3 },
  ];

  static get customerHeader() {
    return CustomerCollection._customerHeader;
  }

  static get familyHeader() {
    return CustomerCollection._familyHeader;
  }

  static get petHeader() {
    return CustomerCollection._petHeader;
  }

  static get projectInfoHeader() {
    return CustomerCollection._projectInfoHeader;
  }

  static get supportHistoryHeader() {
    return CustomerCollection._supportHistoryHeader;
  }

  static get fileHeader() {
    return CustomerCollection._fileHeader;
  }

  static get maintenanceHeader() {
    return CustomerCollection._maintenanceHeader;
  }

  static get customerEditInitialState() {
    return CustomerCollection._customerEditInitialState;
  }

  static get customerSortInitialState() {
    return CustomerCollection._customerSortInitialState();
  }

  static get petSexualOption() {
    return CustomerCollection._petSexualOption;
  }
}
