import { SupportHistory } from '../../../type/support-history/support-history.type';

const dummy: () => Partial<SupportHistory> = () => ({
  customer_id: 1,
  project_id: 1,
  id: 1,
  reception_date: '2021/01/10',
  reception_hour: 12,
  reception_minutes: 59,
  customer_responsible_store: 1,
  customer_representative: 1,
  category: 1,
  media: 1,
  customer_name: '山田太郎',
  project_name: '山田太郎様宅メンテナンス',
  // image: null,
  supported_content: '対応内容',
  supported_responsible_store: 1,
  supported_representative: 1,
  supported_date: '2021/01/10',
  fixed_flag: true,
  reception_time: '2021/01/03 10:41:28',
  supported_history_name: '現場打ち合わせ',
  supported_person: NaN,
  supported_complete_date: '2021/03/12',
  supported_detail: 'コメント',
});

export const SupportHistoryDummy = {
  header: {
    request: '/api/support-history/1',
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
      {
        ...dummy(), id: 2, category: 1, customer_name: '鈴木次郎', supported_complete_date: '2021/01/23',
      },
      {
        ...dummy(), id: 3, category: 1, customer_name: '山田太郎', supported_complete_date: '2021/01/10',
      },
      {
        ...dummy(), id: 4, category: 1, customer_name: '鈴木次郎', supported_complete_date: '2021/01/23',
      },
    ],
  },
};
