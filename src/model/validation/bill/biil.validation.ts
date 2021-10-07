import { ValidationLengthUnder500 } from '../validation-length-under';

type Param = {
  filedName: string,
  projectName: string,
  price: number,
  payment: string,
  priceTaxIn: number,
  remarks: string,
}

/* TODO 請求バリデーション */
export const BillValidation = (data: Param) => {
  const {
    filedName,
    projectName,
    price,
    payment,
    priceTaxIn,
    remarks,
  } = data;

  console.log(
    filedName,
    projectName,
    price,
    payment,
    priceTaxIn,
    remarks,
  );

  return (
  // 必須
    !data
  || !data

    // バリデーション
  || ValidationLengthUnder500.filter((v) => !v.run(String(data.remarks || ''))).length
  );
};
