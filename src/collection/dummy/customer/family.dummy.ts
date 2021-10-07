import { Family } from '../../../type/customer/family.type';

const dummy: () => Family = () => ({
  name: '佐藤 タロウ',
  relationship: '父',
  mobile_phone: '000-0000-0000',
  birth_date: '2000/12/12',
});

export const FamilyDummy = {
  header: {
    request: '/api/customer/1/family/1',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 1,
    data: [
      dummy(),
    ],
  },
};
