import { FileEditState } from '../../../type/file/file.type';
import {
  ValidationLengthUnder40,
  ValidationLengthUnder50,
  ValidationLengthUnder500,
  ValidationLengthUnder60,
} from '..';

export const FileValidation = (data: FileEditState, customerName: string, projectName: string) => {
  window.console.log(data);
  return (
  // 必須
    !data.customer_id
    || !data.file_name
    || !data.format
    || !data.file

  // バリデーション
  || ValidationLengthUnder60.filter((v) => !v.run(String(customerName || ''))).length
  || ValidationLengthUnder40.filter((v) => !v.run(String(projectName || ''))).length
  || ValidationLengthUnder50.filter((v) => !v.run(String(data.file_name || ''))).length
  || ValidationLengthUnder500.filter((v) => !v.run(String(data.comment || ''))).length
  );
};
