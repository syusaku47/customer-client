export const MasterLargeCategoryDummy = {
  header: {
    request: '/api/master/sizaikoji/category',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        category_id: 1,
        id: '1',
        name: '大分類',
        valid_flag: true,
      },
    ],
  },
};
