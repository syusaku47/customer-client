import { Validation } from './validation';

export const ValidationDatePicker: Validation[] = [
  new Validation(
    (v) => String(v) !== 'Invalid Date',
    '形式に基づき日付を入力してください。YYYY/MM/DD',
  ),
];
