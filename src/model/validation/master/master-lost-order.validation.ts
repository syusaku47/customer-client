import { ValidationLengthUnder255Byte } from '../validation-length-under-255-byte';

export const MasterLostOrderValidation = (lostReason: string) => {
  window.console.log();
  return (
  // 必須
    !lostReason

  // バリデーション
  || ValidationLengthUnder255Byte.filter((v) => !v.run(String(lostReason || ''))).length
  );
};
