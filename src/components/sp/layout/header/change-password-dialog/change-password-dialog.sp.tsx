import { useCallback, useMemo, useState } from 'react';
import './change-password-dialog.sp.scss';
import { useDispatch } from 'react-redux';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { Button } from '../../../../ui/button/button';
import { AuthActions } from '../../../../../redux/auth/auth.action';

export const ChangePasswordDialogSP = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const disabled = useMemo(() => !(
    password
    && rePassword
    && password === rePassword
  ), [password, rePassword]);

  const handleClickChange = useCallback(
    () => {
      dispatch(AuthActions.api.password.dialogChange({
        password,
        password_confirmation: rePassword,
      }));
    },
    [dispatch, password, rePassword],
  );

  return (
    <>
      <div className="base_dialog_content_inner_body change_password_dialog_sp">
        <TopLabelInputField
          label="新しいパスワード"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TopLabelInputField
          label="パスワード再入力"
          value={rePassword}
          type="password"
          onChange={(e) => setRePassword(e.target.value)}
        />
      </div>
      <div className="base_dialog_content_inner_footer">
        <Button
          disabled={disabled}
          onClick={handleClickChange}
          color="primary"
          size="md"
        >変更
        </Button>
      </div>
    </>
  );
};
