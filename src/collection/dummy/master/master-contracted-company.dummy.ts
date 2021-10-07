export const MasterContractedCompanyDummy = {
  header: {
    request: '/api/master/contract/contractcompany',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        id: 1,
        name: '鈴木一郎',
        mail_address: 'xxx@aaa.com',
        password: '123456',
        tel_no: '080-1111-2222',
        post_no: '1110053',
        prefecture: '東京都',
        city: '台東区',
        address: '浅草橋5-5-5',
        building_name: 'キムラビル4F',
        status: 2,
        accounts: 10,
        valid_flag: true,
      },
    ],
  },
};
