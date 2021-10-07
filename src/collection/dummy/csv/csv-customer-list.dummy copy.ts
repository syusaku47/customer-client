import { CsvCustomerListType } from '../../../type/csv/csv.type';

const dummy: () => CsvCustomerListType = () => ({
  customer_id: 1,
  customer_name: '山田太郎',
  tel_no: '03-3865-5122',
  prefecture: '東京都',
  address: '体得浅草橋5-5-5',
  ob: '',
  rank: '',
  last_completion_date: '2022/02/13',
  total_work_price: 1678260,
  work_times: 0,
  construction_status: '案件化',
  sales_contact: '長谷川太郎',
});

export const CsvCustomerListDummy = {
  header: {
    request: '/api/',
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
};
