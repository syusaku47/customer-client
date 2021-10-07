export const MasterOrderFailureDummy = {
  header: {
    request: '/api/master/kubun/lostorder',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        lostorder_id: 1,
        id: '1',
        name: '',
        valid_flag: true,
      },
    ],
  },
};
