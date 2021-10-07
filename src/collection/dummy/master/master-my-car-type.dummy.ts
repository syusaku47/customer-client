export const MasterMyCarTypeDummy = {
  header: {
    request: '/api/master/relatedtag/mycartype',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        mycartype_id: 1,
        id: '1',
        name: '軽自動車',
        input_flag: true,
        valid_flag: true,
      },
      {
        mycartype_id: 2,
        id: '2',
        name: 'ミニバン',
        input_flag: true,
        valid_flag: true,
      },
      {
        mycartype_id: 3,
        id: '3',
        name: 'セダン',
        input_flag: true,
        valid_flag: true,
      },
    ],
  },
};
