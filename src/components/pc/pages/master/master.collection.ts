import { StoreMaster, SideMenuLabel } from './master.type';

export class MasterCollection {
  public static readonly sideMenu: SideMenuLabel[] = [
    {
      type: 0,
      label: '会社情報管理',
      child: [
        { type: 0, label: '店舗' },
        { type: 1, label: '社員' },
        { type: 2, label: '消費税' },
      ],
    },
    {
      type: 1,
      label: '資材・工事マスタ',
      child: [
        { type: 3, label: '大分類' },
        { type: 4, label: '中分類' },
        { type: 5, label: '明細' },
      ],
    },
    {
      type: 2,
      label: '区分マスタ',
      child: [
        { type: 6, label: '単位' },
        { type: 7, label: '対応履歴 媒体' },
        { type: 8, label: '建物分類' },
        { type: 9, label: 'エリア' },
        { type: 10, label: '間取り' },
        { type: 11, label: '問合せ' },
        { type: 12, label: '失注理由' },
        { type: 13, label: '対応履歴 カテゴリ' },
      ],
    },
    {
      type: 3,
      label: 'メンテナンス管理',
      child: [
        { type: 14, label: 'アフターメンテ' },
      ],
    },
    {
      type: 4,
      label: '定型マスタ',
      child: [
        { type: 15, label: '署名' },
        { type: 16, label: '見積定型' },
      ],
    },
    {
      type: 5,
      label: 'ランクマスタ',
      child: [
        { type: 17, label: '顧客見込みランク' },
        { type: 18, label: '顧客ランク（工事金額）' },
        { type: 27, label: '顧客ランク（最終完工日）' },
        { type: 19, label: '案件見込みランク' },
        { type: 20, label: '顧客ランク更新' },
      ],
    },
    {
      type: 6,
      label: '顧客情報インポート',
      child: [
        { type: 21, label: '顧客情報インポート' },
        { type: 22, label: 'テンプレートダウンロード' },
      ],
    },
    {
      type: 7,
      label: '関連タグ',
      child: [
        { type: 23, label: '関連タグ' },
        { type: 24, label: '部位' },
        { type: 25, label: 'マイカー種別' },
      ],
    },
    {
      type: 8,
      label: '契約会社管理',
      child: [
        { type: 26, label: '契約会社' },
      ],
    },
  ];

  public static readonly storeMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'store_name', label: '店舗_名称' },
    { key: 'store_abbreviation_name', label: '店舗_略称' },
    { key: 'store_furigana', label: '店舗_フリガナ' },
    { key: 'phone_num', label: '電話番号' },
    { key: 'fax_num', label: 'FAX番号' },
    { key: 'postal_code', label: '郵便番号' },
    { key: 'address_prefecture', label: '住所_都道府県' },
    { key: 'address_city', label: '住所_市町村' },
    { key: 'address_place', label: '住所_地名・番地' },
    { key: 'address_building_name', label: '住所_建物名等' },
    { key: 'valid_flag', label: '有効フラグ' },
    { key: 'toll_free_num', label: 'フリーダイヤル' },
    { key: 'account_name', label: '口座名義' },
    // { key: 'bank_name', label: '銀行名' },
    // { key: '', label: '店舗名' },
    // { key: 'bank_type', label: '口座' },
    // { key: 'account_number', label: '口座番号' },
  ]

  public static readonly dammyData: StoreMaster = {
    store_name: '店舗A',
    store_abbreviation_name: '店舗A',
    store_furigana: 'テンポエー',
    phone_num: '03-3865-5122',
    fax_num: '03-3865-5123',
    postal_code: '123-4567',
    address_prefecture: '東京都',
    address_city: '台東区',
    address_place: '浅草橋',
    address_building_name: '浅草ビル',
    valid_flag: true,
    toll_free_num: '0120-00-0000',
    bank_name: '三井',
    account_number: 123456,
    account_name: '三井太郎',
    bank_type: '普通口座',
  }

  public static readonly employeeMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'employee_code', label: '社員CD' },
    { key: 'store_name', label: '店舗名' },
    { key: 'employee_name', label: '社員_名称' },
    { key: 'employee_abbreviation_name', label: '社員_略称' },
    { key: 'employee_furigana_name', label: '社員_フリガナ' },
    { key: 'job_title', label: '役職名' },
    { key: 'sale_goal', label: '売上目標' },
    { key: 'valid_flag', label: '有効フラグ' },
    { key: 'authority_1', label: '権限1' },
    { key: 'authority_2', label: '権限2' },
    // { key: 'authority_3', label: '権限3' },
    // { key: 'authority_4', label: '権限4' },
  ]

  public static readonly taxMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'applied_start_day', label: '適用開始日' },
    { key: 'consumption_tax_rate', label: '消費税率' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly largeCategoryMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'large_category_name', label: '大分類名称' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly middleCategoryMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'large_category_name', label: '大分類名称' },
    { key: 'middle_category_name', label: '中分類名称' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly meisaiMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'goods_category', label: '商品区分' },
    { key: 'large_category_name', label: '大分類区分' },
    { key: 'middle_category_name', label: '中分類区分' },
    { key: 'name', label: '名称' },
    { key: 'standard', label: '規格' },
    { key: 'quantity', label: '数量' },
    { key: 'unit_name', label: '単位名称' },
    { key: 'estimated_price', label: '見積単価' },
    { key: 'purchase_cost', label: '原価' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly unitMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'unit_name', label: '単位名称' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly originMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'origin_name', label: '発生源名称' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly buildingCategoryMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'building_category_name', label: '建物分類名称' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly areaMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'store_name', label: '店舗名' },
    { key: 'area_name', label: 'エリア名称' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly madoriMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'madori_name', label: '間取名称' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly inquiryMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'inquiry_name', label: '問合せ名称' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly lostOrderMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'lost_reason', label: '失注理由' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly supportHistoryMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'approach_information', label: '対応履歴' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly afterMaintenanceMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'registration_scheduled_date', label: '登録予定日' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly signatureMasterHeader = [
    { key: 'item', label: '項目' },
    { key: 'name', label: '名称' },
  ]

  public static readonly quoteFixedMasterHeader = [
    { key: 'item', label: '項目' },
    { key: 'name', label: '名称' },
    { key: 'estimation_rate', label: '見積(%)' },
    { key: 'purchase_cost_rate', label: '原価(%)' },
  ]

  public static readonly customerEstimatedRankMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: '', label: '操作' },
    { key: '', label: '順位' },
    { key: 'id', label: 'ID' },
    { key: '', label: '顧客見込みランク名' },
    { key: '', label: '略称表示' },
    { key: '', label: '背景色' },
    { key: '', label: '文字色' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly customerRankMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: '', label: '操作' },
    { key: '', label: '順位' },
    { key: 'id', label: 'ID' },
    { key: '', label: '顧客ランク（工事金額）名' },
    { key: '', label: '略称表示' },
    { key: '', label: '工事金額' },
    { key: '', label: '背景色' },
    { key: '', label: '文字色' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly projectRankMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: '', label: '操作' },
    { key: '', label: '順位' },
    { key: 'id', label: 'ID' },
    { key: '', label: '案件見込みランク名' },
    { key: '', label: '略称表示' },
    { key: '', label: '背景色' },
    { key: '', label: '文字色' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly customerRankUpdateMasterHeader = [
  ]

  /* TODO 顧客ランク（最終完工日） */
  public static readonly customerRankFinalCompleteDateHeader = [
    { key: 'edit', label: '編集' },
    { key: '1', label: '操作' },
    { key: '2', label: '順位' },
    { key: 'id', label: 'ID' },
    { key: '4', label: '顧客ランク（最終完工日）名' },
    { key: '5', label: '略称表示' },
    { key: '6', label: '最終完工日数' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly relevantTagMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: '', label: '操作' },
    { key: 'id', label: 'ID' },
    { key: 'relevant_tag_name', label: '関連タグ名称' },
    { key: 'text_input_flag', label: 'テキスト入力有無' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly partMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: '', label: '操作' },
    { key: 'id', label: 'ID' },
    { key: 'relevant_tag_name', label: '部位名称' },
    { key: 'text_input_flag', label: 'テキスト入力有無' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly myCarTypeMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: '', label: '操作' },
    { key: 'id', label: 'ID' },
    { key: 'my_car_type_name', label: 'マイカー種別' },
    { key: 'text_input_flag', label: 'テキスト入力有無' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]

  public static readonly contractedCompanyMasterHeader = [
    { key: 'edit', label: '編集' },
    { key: 'id', label: 'ID' },
    { key: 'company_name', label: '会社_名称' },
    { key: 'company_email_admin', label: '会社_メールアドレス（アドミン用）' },
    { key: 'company_password_admin', label: '会社_パスワード（アドミン用）' },
    { key: 'phone_num', label: '電話番号' },
    { key: 'address_postal_code', label: '住所_郵便番号' },
    { key: 'address_prefecture', label: '住所_都道府県' },
    { key: 'address_city', label: '住所_市区町村' },
    { key: 'address_place', label: '住所_地名・番地' },
    { key: 'address_building_name', label: '住所_建築名等' },
    { key: 'status', label: 'ステータス（有償・無償）' },
    { key: 'account-num', label: 'アカウント数' },
    { key: 'valid_flag', label: '有効フラグ' },
  ]
}
