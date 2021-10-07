import { MasterLabel } from '../../components/pc/pages/master/master.type';

export class ExportCsvCollection {
  private static _sideMenu: MasterLabel[] = [
    {
      label: '顧客',
    },
    {
      type: 0,
      label: '顧客情報',
    },
    {
      type: 1,
      label: '誕生日リスト',
    },
    {
      type: 2,
      label: '結婚記念日リスト',
    },
    {
      label: '案件',
    },
    {
      type: 3,
      label: '案件情報',
    },
    {
      type: 4,
      label: '受注案件',
    },
    {
      type: 5,
      label: '未受注案件',
    },
    {
      type: 6,
      label: '失注案件',
    },
    {
      label: 'メンテナンス',
    },
    {
      type: 7,
      label: 'メンテナンス情報',
    },
    {
      label: 'その他',
    },
    {
      type: 8,
      label: '顧客ランク更新ログ',
    },
    {
      type: 9,
      label: '対応履歴',
    },
  ];

  /* TODO 各ヘッダーの文字列の再確認・修正 */
  private static _customerInformationHeader = [
    '顧客ID',
    '顧客名称',
    '電話番号',
    '都道府県',
    '住所',
    'OB客',
    '顧客ランク',
    '最終完工日',
    '総工事金額',
    '工事回数',
    '状況',
    '営業担当',
  ];

  private static _birthdayHeader = [
    '顧客ID',
    '顧客名',
    '家族お名前',
    '生年月日',
    '続柄',
    '携帯番号',
    '郵便番号',
    '都道府県',
    '住所',
    '顧客電話番号',
    '営業担当',
  ];

  private static _weddingHeader = [
    '顧客ID',
    '顧客名',
    '結婚記念日',
    '郵便番号',
    '都道府県',
    '住所',
    '顧客電話番号',
    '営業担当',
  ];

  private static _projectHeader = [
    '案件ID',
    '案件名',
    '顧客名',
    '現場住所',
    '現場電話番号',
    '顧客ランク',
    '担当者名',
    '着工予定日',
    '着工日',
    '完工予定日',
    '完工日',
    '契約日',
    '失注日',
    'キャンセル日',
    '見積金額',
  ];

  private static _orderHeader = [
    '案件ID',
    '件名',
    '顧客名',
    '現場住所',
    '現場電話番号',
    '顧客ランク',
    '担当者名',
    '完工予定日',
    '完工日',
    '契約日',
    '受注金額',
    '受注時粗利益',
  ];

  private static _nonOrderHeader = [
    '案件ID',
    '案件名',
    '顧客名',
    '現場住所',
    '現場電話番号',
    '顧客ランク',
    '担当者名',
    '着工予定日',
    '完工予定日',
    '完工日',
    '見積金額',
  ];

  private static _lostOrderHeader = [
    '案件ID',
    '案件名',
    '顧客名',
    '現場住所',
    '電話番号',
    '顧客ランク',
    '担当者名',
    '失注ID',
    '失注カテゴリ',
    '見積金額',
  ];

  private static _maintenanceHeader = [
    'メンテナンス過ぎているマーク',
    '対応済みマーク',
    'メンテナンス日',
    'タイトル',
    '対応日',
    '完工日',
    '顧客名',
    '案件名',
    '案件担当者',
  ];

  private static _customerRankHeader = [
    'NO',
    '顧客ID',
    '顧客名',
    '担当者名',
    '変更前顧客ランク',
    '変更後顧客ランク',
    '工事金額',
    '工事回数',
    '最終完工日',
    '更新日',
  ];

  private static _supportHistoryHeader = [
    '日付',
    '顧客名',
    'カテゴリ',
    '件名',
    '内容',
    '案件名',
    '結果',
    '結果詳細',
  ];

  static get sideMenu() {
    return ExportCsvCollection._sideMenu;
  }

  static get customerInformationHeader() {
    return ExportCsvCollection._customerInformationHeader;
  }

  static get birthdayHeader() {
    return ExportCsvCollection._birthdayHeader;
  }

  static get weddingHeader() {
    return ExportCsvCollection._weddingHeader;
  }

  static get projectHeader() {
    return ExportCsvCollection._projectHeader;
  }

  static get orderHeader() {
    return ExportCsvCollection._orderHeader;
  }

  static get nonOrderHeader() {
    return ExportCsvCollection._nonOrderHeader;
  }

  static get lostOrderHeader() {
    return ExportCsvCollection._lostOrderHeader;
  }

  static get maintenanceHeader() {
    return ExportCsvCollection._maintenanceHeader;
  }

  static get customerRankHeader() {
    return ExportCsvCollection._customerRankHeader;
  }

  static get supportHistoryHeader() {
    return ExportCsvCollection._supportHistoryHeader;
  }
}
