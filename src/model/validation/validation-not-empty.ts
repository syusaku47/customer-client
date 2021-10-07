import { Validation } from './validation';

export const ValidationNotEmpty: Validation[] = [
  new Validation(
    (v) => !!v,
    '必須項目です',
  ),
];
