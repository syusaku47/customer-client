export const MasterEmployeeDummy = {
  header: {
    request: '/api/master/company/employee',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        id: 1,
        employee_cd: 'A1234',
        store_name: '店舗A',
        name: '長谷川太郎',
        short_name: '長谷川',
        furigana: 'ハセガワ',
        job_title: '係長',
        sales_target: '2倍',
        valid_flag: true,
        authority1: 1,
        authority2: 1,
        authority3: 1,
        authority4: 1,
      },
    ],
  },
};
