const dummy = () => ({
  project_id: 1,
  id: 1,
  order_flag: true,
  quote_no: 'E000000285',
  quote_date: '2021/01/23',
  field_name: '鈴木次郎様宅',
  project_name: '鈴木次郎様宅改修',
  project_representative_name: '木下次郎',
  quote_creator: '木下次郎',
  quote_price: 100000,
  tax_amount_quote: 10000,
  including_tax_total_quote: 11000,
  cost_sum: 80000,
  tax_amount_cost: 8000,
  including_tax_total_cost: 88000,
  adjustment_amount: 60000,
  order_construction_start: '2021/05/23',
  order_construction_end: '2021/08/10',
  customer_name: '鈴木次郎',
  furigana: 'スズキジロウ',
});

export const EstimateListDummy = () => ({
  header: {
    request: '/api/estimate',
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
