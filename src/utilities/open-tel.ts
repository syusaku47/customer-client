import { ValidationTel } from '../model/validation/validation-tel';

export type TellParm = {
  tel: string;
};

/**
 * 電話起動
 * @param param
 */
export const openTel = (param: TellParm) => {
  if (!param || ValidationTel.filter((v) => !v.run(String(param || ''))).length) return;
  const a = document.createElement('a');
  a.href = `tel:${param.tel}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
};
