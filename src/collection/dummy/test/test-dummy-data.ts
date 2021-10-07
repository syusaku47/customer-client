export type TestDummyData = {
  name: string,
  furigana: string,
  position: { lat: number, lng: number },
  postal: string,
  address: { first: string, second: string },
  tel: string,
  email: string,
  lineId: string,
  facebookId: string,
  salesOffice: string,
  salesStaff: string,
  rank: string,
  img: string,
  type: number,
  project: string
};

export const TestDummyDataList: TestDummyData[] = [
  {
    name: '山田太郎',
    furigana: 'ヤマダタロウ',
    position: { lat: 35.69968628738344, lng: 139.78094970307592 },
    postal: '120-0043',
    address: { first: '東京都中央区', second: 'トキワビル111' },
    tel: '03-1111-1222',
    email: 'test@test.com',
    lineId: 'afadfaf',
    facebookId: 'fafasdfasdfasdfa',
    salesOffice: '中央支店',
    salesStaff: '佐藤太郎',
    rank: 'A',
    img: '',
    type: 1,
    project: '山田太郎様宅設備改修',
  },
  {
    name: '佐藤健二',
    furigana: 'サトウケンジ',
    postal: '120-0043',
    position: { lat: 35.69968628738347, lng: 139.77094970307592 },
    address: { first: '東京都中央区', second: 'トキワビル111' },
    tel: '03-1111-1222',
    email: 'test@test.com',
    lineId: 'afadfaf',
    facebookId: 'fafasdfasdfasdfa',
    salesOffice: '中央支店',
    salesStaff: '佐藤太郎',
    rank: 'A',
    img: '',
    type: 2,
    project: '佐藤健二宅新築',
  },
  {
    name: '長谷川太郎',
    furigana: 'ハセガワタロウ',
    postal: '120-0043',
    position: { lat: 35.700145, lng: 139.774327 },
    address: { first: '東京都中央区', second: 'トキワビル111' },
    tel: '03-1111-1222',
    email: 'test@test.com',
    lineId: 'afadfaf',
    facebookId: 'fafasdfasdfasdfa',
    salesOffice: '中央支店',
    salesStaff: '佐藤太郎',
    rank: 'B',
    img: '',
    type: 1,
    project: '長谷川太郎宅建て替え',
  },
  {
    name: '桃太郎',
    furigana: 'モモタロウ',
    postal: '120-0043',
    position: { lat: 35.691911, lng: 139.771656 },
    address: { first: '東京都中央区', second: 'トキワビル111' },
    tel: '03-1111-1222',
    email: 'test@test.com',
    lineId: 'afadfaf',
    facebookId: 'fafasdfasdfasdfa',
    salesOffice: '中央支店',
    salesStaff: '佐藤太郎',
    rank: 'C',
    img: '',
    type: 1,
    project: '桃太郎様宅新築',
  },
  {
    name: '太郎',
    furigana: 'タロウ',
    postal: '120-0043',
    position: { lat: 35.692373, lng: 139.776522 },
    address: { first: '東京都中央区', second: 'トキワビル111' },
    tel: '03-1111-1222',
    email: 'test@test.com',
    lineId: 'afadfaf',
    facebookId: 'fafasdfasdfasdfa',
    salesOffice: '中央支店',
    salesStaff: '佐藤太郎',
    rank: 'C',
    img: '',
    type: 2,
    project: '太郎様宅改修',
  },
];