const dummy = () => ({
  id: 1,
  daibunrui_id: 1,
  chubunrui_id: 1,
  construct_name: 'ハウスダストクリーニング',
  print_name: 'ハウスダストクリーニング',
  standard: 'JIS規格',
  suryo: '1',
  unit: 'ヶ所',
  estimate_tanka: '9,000',
  price: '9,000',
  genka: '6,300',
  genka_price: '6,300',
  arari_price: '2,700',
  arari_percent: '30%',
  remarks: 'テスト',
});

export const EstimateMeisaiListDummy = () => ({
  header: {
    request: '/api/estimate/1',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 1,
    data: [
      {
        ...dummy(),
      },
      {
        ...dummy(), id: 2, daibunrui_id: 2, construct_name: 'エアコンクリーニング', print_name: 'エアコンクリーニング',
      },
      {
        ...dummy(), id: 3, daibunrui_id: 3, construct_name: '最小明細', print_name: '最小明細',
      },
    ],
  },
});
