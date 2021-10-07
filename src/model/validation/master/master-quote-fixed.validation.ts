import { EditState } from '../../../type/customer/customer.type';

export const MasterQuoteFixedValidation = (data: EditState) => {
  window.console.log(data);
  return (
  // 必須
    data
  //   !data.sales_contact
  // || !data.name

  // バリデーション
  // || ValidationLengthUnder100.filter((v) => !v.run(String(data.building_name || ''))).length
  );
};
