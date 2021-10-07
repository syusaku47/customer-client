export const FileDummy = {
  header: {
    request: '/api/file/1',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 1,
    data: [
      {
        customer_id: 1,
        project_id: 1,
        customer_name: '山田太郎',
        project_name: '山田太郎様宅新築',
        file_name: 'TEST',
        file: {},
        comment: 'ここに対応内容が入ります。 ここに対応内容が入ります。ここに対応内容が入ります。',
      },
    ],
  },
};
