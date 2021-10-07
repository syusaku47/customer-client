export const CustomerPetListDummy = {
  header: {
    request: '/api/customer/1/pet',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        id: 1,
        pet_id: 1,
        name: 'さだはる',
        type: 'チワワ',
        sex: 2,
        age: 2,
      },
      {
        id: 1,
        pet_id: 2,
        name: 'チョコ',
        type: 'ゴールデンレトリバー',
        sex: 3,
        age: 11,
      },
    ],
  },
};
