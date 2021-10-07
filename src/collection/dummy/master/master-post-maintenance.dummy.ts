export const MasterAfterMaintenanceDummy = {
  header: {
    request: '/api/master/maintenance/aftermaintenance',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        maintenance_id: 1,
        id: '1',
        ins_expected_date: '登録予定日',
        valid_flag: true,
      },
    ],
  },
};
