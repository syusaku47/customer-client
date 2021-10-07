import './send-password.pc.scss';
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { AuthActions } from '../../../../../redux/auth/auth.action';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { SendPasswordCompletePC } from '../send-password-complete/send-password-complete';
import { Button } from '../../../../ui/button/button';
import { ValidationLengthUnder254 } from '../../../../../model/validation';
import { ValidationMailAddress } from '../../../../../model/validation/validation-mail-address';

export const SendPasswordPC = () => {
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
            element: <SendPasswordCompletePC />,
          }));
        },
      }));
    },
    [email],
  );

  const disabled = Boolean(email);

  return (
    <div className="loginPC">
      <div className="loginPC__body">
        <div className="loginPC__logo">顧客管理システム</div>
        <div className="loginPC__title">パスワード再発行</div>
        <div className="loginPC__body__inner">
          <div className="text_box">
            ご登録いただいたメールアドレスを入力してください。<br />パスワードリセットメールを送信します。
          </div>
          <TopLabelInputField
            value={email}
            className="loginPC__body__inner__input-field"
            placeholder="メールアドレス"
            type="email"
            validationList={[
              ...ValidationLengthUnder254,
              ...ValidationMailAddress,
            ]}
            onChange={(e) => setEmail(e.target.value)}
            onEnterKeyPress={handleClickSend}
          />
          <div style={{ margin: '0 0 30px' }}>
            <Button
              type="submit"
              color="primary"
              onClick={handleClickSend}
              disabled={!disabled}
            >送信
            </Button>
          </div>
        </div>
        <div className="link_box">
          <Link to={RoutingPath.login}><i className="fas fa-arrow-left" />&nbsp;ログイン画面に戻る</Link>
        </div>
      </div>
    </div>
  );
};
