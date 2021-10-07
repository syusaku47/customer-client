export const MasterSupportHistoryDummy = {
  header: {
    request: '/api/master/kubun/supported',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        supported_id: 1,
        id: '1',
        supported: '',
        valid_flag: true,
      },
    ],
  },
};
