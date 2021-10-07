const dummy:()=> {id:number} = () => ({
  id: 9999,
});

export const EstimateIdDummy = () => ({
  header: {
    request: '/api/estimate/id',
    status: 'SUCCESS',
    status_code: 200,
    messages: [],
  },
  body: {
    hit_count: 1,
    data: [
      {
        ...dummy(),
      },
    ],
  },
});
