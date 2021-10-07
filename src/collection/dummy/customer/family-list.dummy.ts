import { FamilyList } from '../../../type/customer/family.type';

const dummy: () => FamilyList = () => ({
  id: 1,
  family_id: 1,
  name: '佐藤 タロウ',
  relationship: '父',
  mobile_phone: '000-0000-0000',
  birth_date: '2000/12/12',
});

export const FamilyListDummy = {
  header: {
    request: '/api/customer/1/family',
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
        ...dummy(), id: 2, family_id: 2, name: '佐藤 佳代子', relationship: '母',
      },
    ],
  },
};
