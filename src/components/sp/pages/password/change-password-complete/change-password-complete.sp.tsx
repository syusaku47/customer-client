/* eslint-disable no-irregular-whitespace */
import { DummyLogo } from '../../../../ui/dummy-logo/dummy-logo';
import { Button } from '../../../../ui/button/button';
import { LoginSP } from '../../login/login.sp';
import './change-password-complete.sp.scss';

export const ChangePasswordCompleteSP = () => {
  window.console.log('');

  return (
    <div className="changePasswordCompleteSP">
      <div>
        <DummyLogo />
        <div className="changePasswordCompleteSP__title">パスワード再設定完了</div>
        <div className="changePasswordCompleteSP__body">
          <div className="changePasswordCompleteSP__body__inner">
            <div className="changePasswordCompleteSP__body__inner__text">
              登録メールアドレスへ、<br />
              パスワード再設定完了のメールを送信しました。<br />
              設定したパスワードにて、ログインをお願いします。<br />
            </div>
            <div className="changePasswordCompleteSP__body__inner__text">
              ※ご不明点等ございましたら、<br />
              システム管理者へお問い合わせください。
            </div>
            <div className="changePasswordCompleteSP__body__inner__btn">
              <Button
                type="submit"
                size="md"
                color="secondary"
                onClick={LoginSP}
              >
                ログイン画面へ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
