const dummy = () => ({
  title: '全て',
  percent: 39,
  data: [
    {
      id: 1,
      index: 1,
      title: 'クリー',
      percent: 39,
      data: [
        {
          id: 1,
          index: 1,
          title: '塗装工事',
          percent: 50,
        },
        {
          id: 2,
          index: 2,
          title: '外装工事',
          percent: 39,
        },
      ],
    },
    {
      id: 2,
      index: 2,
      title: '銀紙',
      percent: 39,
      data: [
        {
          id: 1,
          index: 1,
          title: 'グリンー',
          percent: 50,
        },
        {
          id: 2,
          index: 2,
          title: 'レッだ',
          percent: 39,
        },
      ],
    },
  ],
});

export const EstimateMeisaiSideMenuDummy = () => ({
  header: {
    request: '/api/estimate/1/meisai',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 2,
    data: [
      {
        ...dummy(),
      },
    ],
  },
});
