import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { Button } from '../../../../ui/button/button';
import { DummyLogo } from '../../../../ui/dummy-logo/dummy-logo';
import './send-password-complete.sp.scss';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';

export const SendPasswordCompleteSP = () => {
  const dispatch = useDispatch();

  const handleClickLogin = useCallback(
    () => {
      dispatch(DialogActions.pop());
      dispatch(push(RoutingPath.login));
    }, [],
  );
  return (
    <div className="sendPasswordCompleteSP">
      <div>
        <DummyLogo />
        <div className="sendPasswordCompleteSP__title">パスワード再発行しました</div>
        <div className="sendPasswordCompleteSP__body">
          <div className="sendPasswordCompleteSP__body__inner">
            <div className="sendPasswordCompleteSP__body__inner__text">
              ご登録いただいたメールアドレスに<br />
              パスワードリセットメールを送信しました。<br />
              メールボックスをご確認ください
            </div>
            <Button
              type="submit"
              size="md"
              color="secondary"
              onClick={handleClickLogin}
            >ログイン画面へ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
