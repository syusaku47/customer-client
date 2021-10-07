export const MasterAreaDummy = {
  header: {
    request: '/api/master/kubun/area',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        area_id: 1,
        id: '1',
        store_name: '店舗A',
        name: 'エリア1',
        valid_flag: true,
      },
      {
        area_id: 2,
        id: '1',
        store_name: '店舗A',
        name: 'エリア2',
        valid_flag: true,
      },
      {
        area_id: 3,
        id: '1',
        store_name: '店舗A',
        name: 'エリア3',
        valid_flag: true,
      },
      {
        area_id: 4,
        id: '1',
        store_name: '店舗4',
        name: 'エリア4',
        valid_flag: true,
      },
    ],
  },
};
