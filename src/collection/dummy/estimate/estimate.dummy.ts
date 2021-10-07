const dummy:()=> any = () => ({
  project_id: 1,
  id: 1,
  field_name: '山田太郎様宅',
  project_name: '山田太郎様宅新築',
  quote_creator: '長谷川太郎',
  quote_date: '2021/01/30',
  quote_no: 'E000000248',
  order_construction_start: '2021/06/30',
  order_construction_end: '2021/08/30',
  quote_expiration_date: '2021/02/28',
  order_expected_date: '2021/02/28',
  remarks: 'テスト　備考テストテスト',
});

export const EstimateDummy = () => ({
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
    ],
  },
});
