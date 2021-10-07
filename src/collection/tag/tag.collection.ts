import { Tag } from '../../type/tag.type';

export class TagCollection {
  private static _relevantTag:Tag[] = [
    { id: 0, label: '友の会', flag: 0 },
    { id: 1, label: 'リフォームアルバム', flag: 0 },
    { id: 2, label: '事例許可', flag: 0 },
    { id: 3, label: '現場見学会', flag: 0 },
    { id: 4, label: 'タグ', flag: 0 },
    { id: 5, label: 'タグ', flag: 0 },
    { id: 6, label: 'タグ', flag: 0 },
    { id: 7, label: 'タグ', flag: 0 },
    { id: 8, label: 'タグ', flag: 0 },
    { id: 9, label: 'タグ', flag: 0 },
  ];

  private static _expectedPartTag:Tag[] = [
    { id: 0, label: 'キッチン', flag: 0 },
    { id: 1, label: '洋室', flag: 0 },
    { id: 2, label: 'トイレ', flag: 0 },
    { id: 3, label: '洗面所', flag: 0 },
    { id: 4, label: '塗装', flag: 0 },
    { id: 5, label: '屋根', flag: 0 },
    { id: 6, label: '外壁', flag: 0 },
    { id: 7, label: '設備', flag: 0 },
    { id: 8, label: '増改築', flag: 0 },
    { id: 9, label: '改装', flag: 0 },
    { id: 10, label: '耐震', flag: 0 },
    { id: 11, label: 'エクステリア', flag: 0 },
    { id: 12, label: '内装', flag: 0 },
    { id: 13, label: 'バリアフリー', flag: 0 },
    { id: 14, label: 'メンテナンス', flag: 0 },
    { id: 15, label: '太陽光', flag: 0 },
    // { id: 16, label: 'その他', flag: 0 },
  ];

  private static _partTag :Tag[]= [
    { id: 0, label: 'キッチン', flag: 0 },
    { id: 1, label: '洋室', flag: 0 },
    { id: 2, label: 'トイレ', flag: 0 },
    { id: 3, label: '洗面所', flag: 0 },
    { id: 4, label: '塗装', flag: 0 },
    { id: 5, label: '屋根', flag: 0 },
    { id: 6, label: '外壁', flag: 0 },
    { id: 7, label: '設備', flag: 0 },
    { id: 8, label: '増改築', flag: 0 },
    { id: 9, label: '改装', flag: 0 },
    { id: 10, label: '耐震', flag: 0 },
    { id: 11, label: 'エクステリア', flag: 0 },
    { id: 12, label: '内装', flag: 0 },
    { id: 13, label: 'バリアフリー', flag: 0 },
    { id: 14, label: 'メンテナンス', flag: 0 },
    { id: 15, label: '太陽光', flag: 0 },
    { id: 16, label: 'その他', flag: 0 },
  ];

  private static _myCarTypeTag:Tag[] = [
    { id: 0, label: '軽自動車', flag: 0 },
    { id: 1, label: 'ミニバン', flag: 0 },
    { id: 2, label: 'セダン', flag: 0 },
    { id: 3, label: 'ステーションワゴン', flag: 0 },
    { id: 4, label: 'オープン', flag: 0 },
    { id: 5, label: 'ハイブリッド', flag: 0 },
    { id: 6, label: '福祉車両', flag: 0 },
    { id: 7, label: 'クーペ', flag: 0 },
    { id: 8, label: 'RV', flag: 0 },
    { id: 9, label: '輸入車', flag: 0 },
    { id: 10, label: 'バイク', flag: 0 },
    { id: 11, label: '無し', flag: 0 },
    { id: 12, label: 'その他', flag: 0 },
  ];

  private static _constructionStateTag:Tag[] = [
    { id: 0, label: '案件化', flag: 0 },
    { id: 1, label: '見積中', flag: 0 },
    { id: 2, label: '工事中', flag: 0 },
    { id: 3, label: '完工', flag: 0 },
    { id: 4, label: '未入金', flag: 0 },
    { id: 5, label: '完了', flag: 0 },
    { id: 6, label: '失注', flag: 0 },
    { id: 7, label: 'キャンセル', flag: 0 },
  ];

  private static _maintenanceKensakuTag :Tag[]= [
    { id: 0, label: '無効情報も含む', flag: 0 },
  ];

  private static _maintenanceResistrationTag:Tag[] = [
    { id: 0, label: '対応済みフラグ', flag: 0 },
    { id: 1, label: '無効フラグ', flag: 0 },
  ];

  private static _supportHistoryRegistrationTag:Tag[] = [
    { id: 0, label: '対応済みフラグ', flag: 0 },
  ];

  private static _maintenanceValidFlagTag:Tag[] = [
    { id: 0, label: '有効フラグ', flag: 0 },
  ];

  private static _sameTag :Tag[]= [
    { id: 0, label: 'タグ', flag: 0 },
    { id: 1, label: 'タグ', flag: 0 },
    { id: 2, label: 'タグ', flag: 0 },
    { id: 3, label: 'タグ', flag: 0 },
    { id: 4, label: 'タグ', flag: 0 },
    { id: 5, label: 'タグ', flag: 0 },
    { id: 6, label: 'タグ', flag: 0 },
    { id: 7, label: 'タグ', flag: 0 },
    { id: 8, label: 'タグ', flag: 0 },
    { id: 9, label: 'タグ', flag: 0 },
    { id: 10, label: 'タグ', flag: 0 },
    { id: 11, label: 'タグ', flag: 0 },
  ];

  private static _shortInformationTag = [
    { id: 1, label: '不備情報のみ' },
  ];

  static get relevantTag() {
    return TagCollection._relevantTag;
  }

  static get expectedPartTag() {
    return TagCollection._expectedPartTag;
  }

  static get partTag() {
    return TagCollection._partTag;
  }

  static get myCarTypeTag() {
    return TagCollection._myCarTypeTag;
  }

  static get constructionStateTag() {
    return TagCollection._constructionStateTag;
  }

  static get maintenanceKensakuTag() {
    return TagCollection._maintenanceKensakuTag;
  }

  static get maintenanceResistrationTag() {
    return TagCollection._maintenanceResistrationTag;
  }

  static get supportHistoryRegistrationTag() {
    return TagCollection._supportHistoryRegistrationTag;
  }

  static get maintenanceValidFlagTag() {
    return TagCollection._maintenanceValidFlagTag;
  }

  static get sameTag() {
    return TagCollection._sameTag;
  }

  static get shortInformationTag() {
    return TagCollection._shortInformationTag;
  }
}
