const dummy = () => ({
  quote_id: 1,
  id: 1,
  item_kubun: NaN,
  category: NaN,
  sub_category: NaN,
  construction_materials_name: 'ハウスダストクリーニング',
  standard: 'JIS規格',
  quantity: 1,
  unit: 1,
  quote_unit_price: 9000,
  prime_cost: 6300,
  item_kubun_name: '資材',
  category_name: '▲▲▲▲',
  sub_category_name: '■■■■',
  unit_name: '個',
});

export const EstimateMeisaiDummy = () => ({
  header: {
    request: '/api/estimate/1/meisai',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        ...dummy(),
      },
    ],
  },
});
