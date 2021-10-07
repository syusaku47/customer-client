export const MasterPartTagDummy = {
  header: {
    request: '/api/master/relatedtag/part',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        relationtag_id: 1,
        id: '1',
        name: 'キッチン',
        input_flag: true,
        valid_flag: true,
      },
      {
        relationtag_id: 2,
        id: '2',
        name: '浴室',
        input_flag: true,
        valid_flag: true,
      },
      {
        relationtag_id: 3,
        id: '3',
        name: 'トイレ',
        input_flag: true,
        valid_flag: true,
      },
      {
        relationtag_id: 4,
        id: '4',
        name: '洗面所',
        input_flag: true,
        valid_flag: true,
      },
      {
        relationtag_id: 5,
        id: '5',
        name: '塗装',
        input_flag: true,
        valid_flag: true,
      },
    ],
  },
};
