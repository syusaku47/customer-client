export const MasterEstimateDummy = {
  header: {
    request: '/api/master/fixed/quotefixed',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        id: 1,
        item: '',
        name: '',
        estimate: 12.3,
        cost: 45.6,
      },
    ],
  },
};
