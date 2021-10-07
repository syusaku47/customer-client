export const MasterMeisaiDummy = {
  header: {
    request: '/api/master/sizaikoji/detail',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        detail_id: 1,
        id: '1',
        product_kubun: '1',
        category_name: '大分類',
        subcategory_name: '中分類',
        name: '明細',
        standard: '規格',
        quantity: 1,
        credit_name: 'kg',
        quote_unit_price: 10000,
        prime_cost: 20000,
        valid_flag: true,
      },
    ],
  },
};
