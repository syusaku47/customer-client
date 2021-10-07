import './send-password-complete.pc.scss';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { push } from 'connected-react-router';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { Button } from '../../../../ui/button/button';
import { RoutingPath } from '../../../../../routes/routing-pass';

export const SendPasswordCompletePC = () => {
  const dispatch = useDispatch();

  const handleClickLogin = useCallback(
    () => {
      // dispatch(push(`${RoutingPath.changePassword}?q=fkjaklfjasldfjls`));
      dispatch(DialogActions.pop());
      dispatch(push(RoutingPath.login));
    }, [],
  );
  return (
    <div className="loginPC__dialog">
      <div className="loginPC__title">パスワード再発行完了</div>
      <div className="loginPC__body__inner">
        <div className="SendPasswordCompletePC__body" style={{ height: '100px' }}>
          ご登録いただいたメールアドレスに<br />
          パスワードリセットメールを送信しました。<br />
          メールボックスをご確認ください。
        </div>
      </div>
      <Button
        type="submit"
        color="primary"
        onClick={handleClickLogin}
      >ログイン画面へ
      </Button>
    </div>
  );
};
