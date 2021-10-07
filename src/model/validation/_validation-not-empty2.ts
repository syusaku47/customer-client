import { Validation } from './validation';

export const ValidationNotEmpty2: Validation[] = [
  new Validation(
    (v, v2) => !(!v || !v2),
    '必須項目です',
  ),
];
