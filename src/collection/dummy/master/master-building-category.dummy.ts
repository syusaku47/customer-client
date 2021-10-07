export const MasterBuildingCategoryDummy = {
  header: {
    request: '/api/master/kubun/building',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        building_id: 1,
        id: '1',
        name: '平屋',
        valid_flag: true,
      },
      {
        building_id: 2,
        id: '1',
        name: 'マンション',
        valid_flag: true,
      },
      {
        building_id: 3,
        id: '1',
        name: '2階建て',
        valid_flag: true,
      },
    ],
  },
};
