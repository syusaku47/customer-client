import { EstimateListType } from '../../../type/estimate/estimate.type';
import { OrderEditState } from '../../../type/order/order.type';
import { ValidationDatePicker } from '../validation-date-picker';
import { ValidationLengthUnder40, ValidationLengthUnder500 } from '../validation-length-under';
import { ValidationLengthUnder60 } from '../_validation-length-under-60';

/* 参考
  ProjectManager.as
  function saveProjectOrder
*/
export const OrderValidation = (
  data: OrderEditState,
  list: EstimateListType[],
  selectEstimate?: EstimateListType | null,
  filedName?: string,
  projectName?: string,
  // seikyu?: any,
) => {
  const errorList: string[] = [];

  window.console.group();
  window.console.log(!data.project_id);
  window.console.log(!data.contract_date);
  window.console.log(!data.construction_start_date);
  window.console.log(!data.completion_end_date);
  window.console.log(!list.length);
  window.console.log(!selectEstimate);
  window.console.log(ValidationLengthUnder60.filter((v) => !v.run(String(filedName || ''))).length);
  window.console.log(ValidationLengthUnder40.filter((v) => !v.run(String(projectName || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.contract_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.construction_start_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.completion_end_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.groundbreaking_ceremony || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.completion_based || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.contract_billing_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.contract_expected_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.start_construction_billing_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.start_construction_expected_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.intermediate1_billing_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.intermediate1_expected_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.intermediate2_billing_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.intermediate2_expected_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.completion_billing_date || ''))).length);
  window.console.log(ValidationDatePicker.filter((v) => !v.run(String(data.completion_expected_date || ''))).length);
  window.console.log(ValidationLengthUnder500.filter((v) => !v.run(String(data.remarks || ''))).length);
  window.console.groupEnd();

  if (
    // 必須
    (!data.project_id
      || !data.contract_date
      || !data.construction_start_date
      || !data.completion_end_date
      || !list.length // 最終見積の有無を確認
      || !selectEstimate // 請求項目の有無を確認

      // バリデーション
      || ValidationLengthUnder60.filter((v) => !v.run(String(filedName || ''))).length
      || ValidationLengthUnder40.filter((v) => !v.run(String(projectName || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.contract_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.construction_start_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.completion_end_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.groundbreaking_ceremony || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.completion_based || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.contract_billing_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.contract_expected_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.start_construction_billing_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.start_construction_expected_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.intermediate1_billing_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.intermediate1_expected_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.intermediate2_billing_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.intermediate2_expected_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.completion_billing_date || ''))).length
      || ValidationDatePicker.filter((v) => !v.run(String(data.completion_expected_date || ''))).length
      || ValidationLengthUnder500.filter((v) => !v.run(String(data.remarks || ''))).length)
  ) {
    errorList.push('未入力／入力不備項目があります');
  }

  /* 請求情報 */
  // if (!seikyu) {
  //   errorList.push('請求項目が取得できていません');
  // }

  if (!list.length || !selectEstimate) {
    errorList.push('最終見積が存在しません');
    return errorList;
  }

  /**
   * 請求金額と受注金額が一致するかを確認
   */
  const kin1: number = data.contract_money || 0;
  const kin2: number = data.start_construction_money || 0;
  const kin3: number = data.intermediate_gold1 || 0;
  const kin4: number = data.intermediate_gold2 || 0;
  const kin5: number = data.completion_money || 0;
  const kin0: number = selectEstimate?.order_price || 0;
  if (kin0 !== kin1 + kin2 + kin3 + kin4 + kin5) {
    errorList.push('請求金額と受注金額が一致していません');
    return errorList;
  }

  /**
   * 各請求金に対して請求日・入金予定日の両方の有無を確認
   */
  let error = false;
  if (kin1) {
    if (!data.contract_billing_date || !data.contract_expected_date) {
      error = true;
    }
  }
  if (kin2) {
    if (!data.start_construction_billing_date || !data.start_construction_expected_date) {
      error = true;
    }
  }
  if (kin3) {
    if (!data.intermediate1_billing_date || !data.intermediate1_expected_date) {
      error = true;
    }
  }
  if (kin4) {
    if (!data.intermediate2_billing_date || !data.intermediate2_expected_date) {
      error = true;
    }
  }
  if (kin5) {
    if (!data.completion_billing_date || !data.completion_expected_date) {
      error = true;
    }
  }
  if (error) {
    errorList.push('請求金に対しての請求日、又は入金予定日が未入力です。');
    return errorList;
  }

  return errorList;
};
