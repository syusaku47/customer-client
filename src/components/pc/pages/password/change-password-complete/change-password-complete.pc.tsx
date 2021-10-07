/* eslint-disable no-irregular-whitespace */
import './change-password-complete.pc.scss';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import React from 'react';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { Button } from '../../../../ui/button/button';

export const ChangePasswordCompletePC = () => {
  const dispatch = useDispatch();
  return (
    <div className="loginPC">
      <div className="loginPC__body">
        <div className="loginPC__logo">顧客管理システム</div>
        <div className="loginPC__title">パスワード再設定完了</div>
        <div className="loginPC__body__inner">
          <div className="text_box">
            登録メールアドレスへ、<br />
            パスワード再設定完了のメールを送信しました。<br />
            設定したパスワードにて、ログインをお願いします。<br />
            <br />
            ※ご不明点等ございましたら、<br />
          　システム管理者へお問い合わせください。
          </div>
          <div style={{ margin: '0 0 30px' }}>
            <Button
              color="primary"
              onClick={() => {
                dispatch(push(RoutingPath.login));
              }}
            >ログイン画面に戻る
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
