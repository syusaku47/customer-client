import './change-password.sp.scss';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { AuthActions } from '../../../../../redux/auth/auth.action';
import { useQuery } from '../../../../../hooks/use-query';
import { Button } from '../../../../ui/button/button';
import { DummyLogo } from '../../../../ui/dummy-logo/dummy-logo';
import { RoutingPath } from '../../../../../routes/routing-pass';

export const ChangePasswordSP = () => {
  /* Hooks */
  const dispatch = useDispatch();
  const token = useQuery('token');
  const email = useQuery('email');

  /* State */
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');

  /* Callback */
  const handleClickSubmit = useCallback(
    () => {
      dispatch(AuthActions.api.password.change({
        password: pass,
        password_confirmation: rePass,
        mail_address: email || '',
        token: token || '',
      }));
    },
    [pass, rePass, token, email],
  );

  /* Effect */
  useEffect(() => {
    dispatch(AuthActions.api.password.checkDate({
      param: { token: token || '', mail_address: email || '' },
      onSuccess: () => {
        setAuth(true);
      },
      onError: () => {
        setAuth(false);
        dispatch(push(RoutingPath.changePasswordError));
      },
    }));
  }, []);

  const disabled = !(pass && pass === rePass);

  return (
    <div className="changePasswordSP" style={{ textAlign: 'center' }}>
      {auth ? (
        <div>
          <DummyLogo />
          <div className="changePasswordSP__title">パスワード再発行</div>
          <div className="changePasswordSP__titleDetail">
            新しいパスワードを入力してください。<br />
            パスワードは8文字以上で設定してください。<br />
          </div>
          <div className="changePasswordSP__body">
            <div className="changePasswordSP__body__inner">
              <TopLabelInputField
                className="changePasswordSP__body__inner__input-field"
                label="パスワード"
                type="password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                isSP
              />
              <TopLabelInputField
                className="changePasswordSP__body__inner__input-field"
                label="パスワード再入力"
                onEnterKeyPress={handleClickSubmit}
                type="password"
                value={rePass}
                onChange={(e) => {
                  setRePass(e.target.value);
                }}
                isSP
              />
              <Button
                type="submit"
                size="md"
                color="secondary"
                onClick={handleClickSubmit}
                disabled={disabled}
              >
                送信
              </Button>
            </div>
          </div>
        </div>
      )
        : (
          <>
            <Dimmer active inverted>
              <Loader size="massive">
                認証中
              </Loader>
            </Dimmer>
          </>
        )}
    </div>
  );
};
