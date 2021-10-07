const dummy = () => ({
  id: 1,
  quote_no: 'E000000248', // 見積番号
  quote_price: 10000, // 見積金額
  quote_genka: 7000, // 見積原価
  quote_construction_start: '2021/06/30', // 見積工期_開始
  quote_construction_end: '2021/08/30', // 見積工期_終了
  order_price: 30000, // 受注金額
  order_genka: 20000, // 受注原価
  order_construction_start: '2021/01/30', // 受注工期_開始
  order_construction_end: '2021/03/30', // 受注工期_終了
});

export const OrderDummy = () => ({
  header: {
    request: '/api/order/1',
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
        ...dummy(), id: 2, quote_no: 'AAAAAAAA', quote_price: 200000,
      },
      {
        ...dummy(), id: 3, quote_no: 'BBBBBBBB', quote_price: 300000,
      },
      {
        ...dummy(), id: 4, quote_no: 'CCCCCCCC', quote_price: 400000,
      },
      {
        ...dummy(), id: 5, quote_no: 'DDDDDDDD', quote_price: 500000,
      },
      {
        ...dummy(), id: 6, quote_no: 'EEEEEEEE', quote_price: 600000,
      },
      {
        ...dummy(), id: 7, quote_no: 'FFFFFFFF', quote_price: 700000,
      },
    ],
  },
});
