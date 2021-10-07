import { ValidationLengthUnder13, ValidationLengthUnder255 } from '..';
import { ValidationMax100Million } from '../validation-max-100-million';

export const MasterMeisaiCategoryValidation = (
  itemKubun: number,
  largeCategoryId: number,
  middleCategoryId: number,
  name: string,
  standard: string,
  quantity: number,
  creditId: number,
  quoteUnitPrice: string,
  primeCost: string,
) => (
  // 必須
  !itemKubun
  || !largeCategoryId
  || !middleCategoryId
  || !name
  || !quantity
  || !creditId
  || !quoteUnitPrice
  || !primeCost

  // バリデーション
  || ValidationLengthUnder255.filter((v) => !v.run(String(name || ''))).length
  || ValidationLengthUnder255.filter((v) => !v.run(String(standard || ''))).length
  || ValidationMax100Million.filter((v) => !v.run(String(quantity || ''))).length
  || ValidationLengthUnder13.filter((v) => !v.run(String(quantity || ''))).length
  || ValidationMax100Million.filter((v) => !v.run(String(quoteUnitPrice || ''))).length
  || ValidationLengthUnder13.filter((v) => !v.run(String(quoteUnitPrice || ''))).length
  || ValidationMax100Million.filter((v) => !v.run(String(primeCost || ''))).length
  || ValidationLengthUnder13.filter((v) => !v.run(String(primeCost || ''))).length
);
