import { Pet } from '../../../type/customer/pet.type';

const dummy: () => Pet = () => ({
  id: 1,
  pet_id: 1,
  name: 'さだはる',
  type: 'チワワ',
  sex: 2, // 1: 指定なし 2: オス 3: メス
  age: 2,
});

export const PetDummy = {
  header: {
    request: '/api/customer/1/pet/1',
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
