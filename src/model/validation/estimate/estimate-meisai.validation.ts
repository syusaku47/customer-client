import { EstimateMeisaiState } from '../../../type/estimate/estimate.type';
import {
  ValidationLengthUnder10,
  ValidationLengthUnder13,
  ValidationLengthUnder500,
} from '..';
import { ValidationLengthUnder255Byte } from '../validation-length-under-255-byte';
import { ValidationMax100Million } from '../validation-max-100-million';
import { ValidationMax10Billion } from '../validation-max-10-billion';

export const EstimateMeisaiValidation = (data: EstimateMeisaiState) => {
  window.console.log();
  return (
  // 必須
    !data.quote_id
    || !data.category
    || !data.sub_category
    // || !data.category_index
    // || !data.sub_category_index
    || !data.construction_materials_name
    || !data.unit

    // バリデーション
    || ValidationLengthUnder255Byte.filter((v) => !v.run(String(data.construction_materials_name || ''))).length
    || ValidationLengthUnder255Byte.filter((v) => !v.run(String(data.standard || ''))).length
    || ValidationMax100Million.filter((v) => !v.run(String(data.quantity || ''))).length
    || ValidationLengthUnder13.filter((v) => !v.run(String(data.quantity || ''))).length
    || ValidationMax10Billion.filter((v) => !v.run(String(data.quote_unit_price || ''))).length
    || ValidationLengthUnder10.filter((v) => !v.run(String(data.quote_unit_price || ''))).length
    || ValidationMax10Billion.filter((v) => !v.run(String(data.prime_cost || ''))).length
    || ValidationLengthUnder10.filter((v) => !v.run(String(data.prime_cost || ''))).length
    || ValidationLengthUnder500.filter((v) => !v.run(String(data.remark || ''))).length
  );
};
