import { EditState } from '../../../type/customer/customer.type';
import {
  ValidationFacebookId,
  ValidationInstagramId,
  ValidationLengthUnder100,
  ValidationLengthUnder20,
  ValidationLengthUnder254,
  ValidationLengthUnder255,
  ValidationLengthUnder4,
  ValidationLengthUnder50,
  ValidationLengthUnder60,
  ValidationLineId,
  ValidationPostNum1,
  ValidationPostNum2,
  ValidationTel,
  ValidationTwitterId,
} from '..';
import { ValidationDatePicker } from '../validation-date-picker';
import { ValidationNotEmpty } from '../validation-not-empty';
import { ValidationNumberLengthUnder3 } from '../validation-number-length-under';
import { ValidationMailAddressEmptyOk } from '../validation-mail-address-empty-ok';

export const CustomerValidation = (data: EditState) => {
  window.console.log(data);
  return (
  // 必須
    !data.sales_contact
  || !data.name
  || !data.post_no1
  || !data.post_no2
  || !data.prefecture
  || !data.city
  || !data.address

  // バリデーション
  || ValidationLengthUnder60.filter((v) => !v.run(String(data.name || ''))).length
  || ValidationLengthUnder4.filter((v) => !v.run(String(data.keisho || ''))).length
  || ValidationLengthUnder60.filter((v) => !v.run(String(data.furigana || ''))).length
  || ValidationNotEmpty.filter((v) => !v.run(String(data.post_no1 || ''))).length
  || ValidationPostNum1.filter((v) => !v.run(String(data.post_no1 || ''))).length
  || ValidationNotEmpty.filter((v) => !v.run(String(data.post_no2 || ''))).length
  || ValidationPostNum2.filter((v) => !v.run(String(data.post_no2 || ''))).length
  || ValidationMailAddressEmptyOk.filter((v) => !v.run(String(data.mail_address || ''))).length
  || ValidationMailAddressEmptyOk.filter((v) => !v.run(String(data.mail_address2 || ''))).length
  || ValidationMailAddressEmptyOk.filter((v) => !v.run(String(data.mail_address3 || ''))).length
  || ValidationPostNum2.filter((v) => !v.run(String(data.post_no2 || ''))).length
  || ValidationLengthUnder50.filter((v) => !v.run(String(data.city || ''))).length
  || ValidationLengthUnder50.filter((v) => !v.run(String(data.address || ''))).length
  || ValidationLengthUnder100.filter((v) => !v.run(String(data.building_name || ''))).length
  || ValidationLengthUnder254.filter((v) => !v.run(String(data.mail_address || ''))).length
  || ValidationTel.filter((v) => !v.run(String(data.tel_no || ''))).length
  || ValidationTel.filter((v) => !v.run(String(data.fax_no || ''))).length
  || ValidationTel.filter((v) => !v.run(String(data.tel_no2 || ''))).length
  || ValidationTel.filter((v) => !v.run(String(data.tel_no3 || ''))).length
  || ValidationLengthUnder254.filter((v) => !v.run(String(data.mail_address2 || ''))).length
  || ValidationLengthUnder254.filter((v) => !v.run(String(data.mail_address3 || ''))).length
  || ValidationLineId.filter((v) => !v.run(String(data.line_id || ''))).length
  || ValidationFacebookId.filter((v) => !v.run(String(data.facebook_id || ''))).length
  || ValidationTwitterId.filter((v) => !v.run(String(data.twitter_id || ''))).length
  || ValidationInstagramId.filter((v) => !v.run(String(data.instagram_id || ''))).length
  || ValidationNumberLengthUnder3.filter((v) => !v.run(String(data.building_age || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(data.remarks || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(data.memo1 || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(data.memo2 || ''))).length
  || ValidationLengthUnder20.filter((v) => !v.run(String(data.my_car_type_other || ''))).length
  || ValidationLengthUnder60.filter((v) => !v.run(String(data.introducer || ''))).length
  || ValidationDatePicker.filter((v) => !v.run(String(data.wedding_anniversary || ''))).length
  );
};
