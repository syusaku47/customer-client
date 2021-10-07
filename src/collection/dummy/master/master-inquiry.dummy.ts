export const MasterInquiryDummy = {
  header: {
    request: '/api/master/kubun/inquiry',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        inquiry_id: 1,
        id: '1',
        name: '',
        valid_flag: true,
      },
    ],
  },
};
