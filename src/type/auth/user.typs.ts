export type User = {
  id: number;
  store_id: number;
  employee_id: number;
  name: string;
  short_name: string;
  furigana: string;
  job_title: string;
  store_name: string;
  /* FIXME 仮 権限 */
  authority_type: number;
};
