export type InitialState = {
  order_price: number;
  project_representative_name: number;
  ins_date: Date | null;
  construction_date: Date | null;
  completion_date: Date | null;
  complete_date: Date | null;
  source: number;
  contract_date: Date | null;
  failure_date: Date | null;
  cancel_date: Date | null;
  remarks: string;
  field_post_no: string;
  filter_by: number;
};

export const initialState = () => ({
  order_price: NaN,
  project_representative_name: NaN,
  ins_date: null,
  construction_date: null,
  completion_date: null,
  complete_date: null,
  source: NaN,
  contract_date: null,
  failure_date: null,
  cancel_date: null,
  remarks: '',
  field_post_no: '',
  filter_by: NaN,
});
