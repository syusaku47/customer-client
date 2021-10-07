import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthActions } from '../../../../redux/auth/auth.action';
import { RoutingPath } from '../../../../routes/routing-pass';
import { LineFeedConversion } from '../../../../utilities/line-feed-conversion';
import { Button } from '../../../ui/button/button';
import { RightLabelCheckbox } from '../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { TopLabelInputField } from '../../../ui/input-field/top-label-input-field/top-label-input-field';
import { DummyLogo } from '../../../ui/dummy-logo/dummy-logo';
import './login.sp.scss';
import { useDidMount } from '../../../../hooks/life-cycle';
import { SystemActions } from '../../../../redux/system/system.action';

type Props = {
  message: string[] | null;
}

const ErrorMessageElement = (props:Props) => {
  const { message } = props;
  return message
    ? (
      <div className="error_wrap">
        {LineFeedConversion(message)}
      </div>
    )
    : <></>;
};

export const LoginSP = () => {
  const dispatch = useDispatch();

  /* state */
  // TODO Debug用
  const [id, setId] = useState('admin@marietta.co.jp');
  // const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);

  /* callback */
  const handleClickLogin = useCallback(() => {
    dispatch(AuthActions.api.login({
      param: {
        mail_address: id,
        password: pass,
        remember: remember ? 1 : 0,
      },
      onError: (str) => setErrorMessage(str),
    }));
  }, [id, pass, remember]);

  useDidMount(() => {
    dispatch(SystemActions.allReset());
  });

  return (
    <div className="loginSP">
      <DummyLogo />
      {/* TODO 正式のロゴが決まった後差し替え、スタイル調整 */}
      <div className="loginSP__body">
        <div className="loginSP__body__inner">
          <ErrorMessageElement message={errorMessage} />
          <TopLabelInputField
            className="loginSP__body__inner__input-field"
            label="メールアドレス"
            type="email"
            isSP
            value={id}
            onChange={(e) => setId(e.target.value)}
            onEnterKeyPress={() => id && pass && handleClickLogin()}
          />
          <TopLabelInputField
            className="loginSP__body__inner__input-field"
            label="パスワード"
            type="password"
            isSP
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onEnterKeyPress={() => id && pass && handleClickLogin()}
          />
          {/* TODO パスワード入力前後でこの要素間に謎の隙間が出たり消えたりする。 */}
          <RightLabelCheckbox
            label="ログイン状態を保存する"
            name="remember"
            checked={remember}
            onChange={() => setRemember(!remember)}
            className="loginSP__body__inner__checkbox"
          />
          <div className="loginSP__body__inner__pass-forget">
            <Link to={RoutingPath.sendPassword}>パスワードを忘れた方</Link>
          </div>
          <div className="loginSP__body__inner__login-btn">
            <Button
              type="button"
              onClick={handleClickLogin}
              disabled={!(id && pass)}
            >
              ログイン
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
