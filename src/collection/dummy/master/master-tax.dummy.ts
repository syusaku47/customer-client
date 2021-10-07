export const MasterTaxDummy = {
  header: {
    request: '/api/master/company/tax',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        tax_id: 1,
        id: '1',
        start_date: '2021/05/20',
        tax_rate: 1.23,
        valid_flag: true,
      },
    ],
  },
};
