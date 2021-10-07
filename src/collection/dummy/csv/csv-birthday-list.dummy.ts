import { CsvBirthdayListType } from '../../../type/csv/csv.type';

const dummy: () => CsvBirthdayListType = () => ({
  customer_id: 1,
  customer_name: '山田太郎',
  family_name: '山田次郎',
  birth_date: '2000/01/01',
  relationship: '父',
  mobile_phone: '080-1111-2222',
  post_no: '111-2222',
  prefecture: 1,
  address: '体得浅草橋5-5-5',
  tel_no: '03-3865-5122',
  sales_contact: 1,
});

export const CsvBirthdayListDummy = {
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
