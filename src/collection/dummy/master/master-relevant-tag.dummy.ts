export const MasterRelevantTagDummy = {
  header: {
    request: '/api/master/relatedtag/relationtag',
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
        name: '友の会',
        input_flag: true,
        valid_flag: true,
      },
      {
        relationtag_id: 2,
        id: '2',
        name: 'リフォームアルバム',
        input_flag: true,
        valid_flag: true,
      },
      {
        relationtag_id: 3,
        id: '3',
        name: '事例許可',
        input_flag: true,
        valid_flag: true,
      },
      {
        relationtag_id: 4,
        id: '4',
        name: '現場見学',
        input_flag: true,
        valid_flag: true,
      },
    ],
  },
};
