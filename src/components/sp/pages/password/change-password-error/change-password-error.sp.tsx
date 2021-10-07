/* eslint-disable no-irregular-whitespace */
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { Button } from '../../../../ui/button/button';
import { DummyLogo } from '../../../../ui/dummy-logo/dummy-logo';
import './change-password-error.sp.scss';

export const ChangePasswordErrorSP = () => {
  const dispatch = useDispatch();
  return (

    <div className="changePasswordErrorSP">
      <div>
        <DummyLogo />
        <div className="changePasswordErrorSP__title">再設定の有効期限切れ</div>
        <div className="changePasswordErrorSP__body">
          <div className="changePasswordErrorSP__body__inner">
            <div className="changePasswordErrorSP__body__inner__text">
              パスワード再設定用のURLの有効期限が切れています<br />
              URLの有効期限は、発行から24時間です。<br />
              再度、パスワード再設定の手続きをお願いします。<br />
            </div>
            <div className="changePasswordErrorSP__body__inner__text">
              ※ご不明点等ございましたら、<br />
            　システム管理者へお問い合わせください。
            </div>
            <div className="changePasswordErrorSP__body__inner__btn">
              <Button
                type="submit"
                color="secondary"
                size="md"
                onClick={() => { dispatch(push(RoutingPath.sendPassword)); }}
              >
                パスワード再設定へ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
