export const MasterMiddleCategoryDummy = {
  header: {
    request: '/api/master/sizaikoji/subcategory',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        subcategory_id: 1,
        id: '1',
        category_name: '大分類',
        name: '中分類',
        valid_flag: true,
      },
    ],
  },
};
