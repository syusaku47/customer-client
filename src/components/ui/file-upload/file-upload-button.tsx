import React from 'react';
import { UserAgent } from '../../../utilities/user-agent';
import './file-upload-button.scss';

type Props = {
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const FileUploadButton = (props: Props) => {
  const {
    value, id, onChange, accept, className, multiple,
  } = props;
  return (
    <label className={`file_upload_button ${UserAgent} ${className || ''}`} htmlFor={id}>
      ファイル選択
      <input
        value={value}
        type="file"
        id={id}
        onChange={onChange}
        accept={accept}
        multiple={multiple}
      />
    </label>
  );
};
