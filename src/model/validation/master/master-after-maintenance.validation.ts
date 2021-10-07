import { ValidationNumberLengthUnder4 } from '../validation-number-length-under';

export const MasterAfterMaintenanceValidation = (registrationScheduledDate: string) => {
  window.console.log();
  return (
  // 必須
    !registrationScheduledDate

  // バリデーション
  || ValidationNumberLengthUnder4.filter((v) => !v.run(String(registrationScheduledDate || ''))).length
  );
};
