import './send-password.sp.scss';
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { AuthActions } from '../../../../../redux/auth/auth.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { Button } from '../../../../ui/button/button';
import { DummyLogo } from '../../../../ui/dummy-logo/dummy-logo';
import { SendPasswordCompleteSP } from '../send-password-complete/send-password-complete.sp';

export const SendPasswordSP = () => {
  /* Hooks */
  const dispatch = useDispatch();

  /* State */
  const [email, setEmail] = useState('');

  /* Callback */
  const handleClickSend = useCallback(
    () => {
      dispatch(AuthActions.api.password.send({
        param: { mail_address: email },
        onSuccess: () => {
          dispatch(DialogActions.push({
            title: '',
            element: <SendPasswordCompleteSP />,
          }));
        },
      }));
    },
    [email],
  );

  const disabled = Boolean(email);

  return (
    <div className="sendPasswordSP" style={{ textAlign: 'center' }}>
      <div>
        <DummyLogo />
        <div className="sendPasswordSP__title">パスワード再発行</div>
        <div className="sendPasswordSP__body">
          <div className="sendPasswordSP__body__inner">
            <TopLabelInputField
              value={email}
              className="sendPasswordSP__body__inner__input-field"
              label="メールアドレス"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              onEnterKeyPress={handleClickSend}
              isSP
            />
            <div className="sendPasswordSP__body__inner__message">ご登録いただいたメールアドレスを入力してください。<br />パスワードリセットメールを送信します。</div>
            <Button
              type="submit"
              size="md"
              onClick={handleClickSend}
              color="secondary"
              disabled={!disabled}
              className="sendPasswordSP__body__inner__sendBtn"
            >
              送信
            </Button>
            <div className="sendPasswordSP__body__inner__backLink">
              <Link to={RoutingPath.login}>ログイン画面に戻る</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
