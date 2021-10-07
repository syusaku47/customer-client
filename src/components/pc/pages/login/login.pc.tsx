import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RoutingPath } from '../../../../routes/routing-pass';
import { AuthActions } from '../../../../redux/auth/auth.action';
import { LineFeedConversion } from '../../../../utilities/line-feed-conversion';
import { Button } from '../../../ui/button/button';
import { RightLabelCheckbox } from '../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { TopLabelInputField } from '../../../ui/input-field/top-label-input-field/top-label-input-field';
import './login.pc.scss';
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

export const LoginPC = () => {
  const dispatch = useDispatch();

  /* state */
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);

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
    <div className="loginPC /*base_page_body*/">
      <div className="loginPC__body">
        <div className="loginPC__logo">顧客管理システム</div>
        <div className="loginPC__body__inner">
          <TopLabelInputField
            className="loginPC__body__inner__input-field"
            placeholder="メールアドレス"
            type="email"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <TopLabelInputField
            className="loginPC__body__inner__input-field"
            placeholder="パスワード"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <RightLabelCheckbox
            label="ログイン状態を保存する"
            name="remember"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <div className="link_box">
            <Link to={RoutingPath.sendPassword}>パスワードを忘れた方</Link>
          </div>
          <ErrorMessageElement message={errorMessage} />
          <Button
            type="button"
            color="primary"
            onClick={handleClickLogin}
            disabled={!(id && pass)}
          >
            ログイン
          </Button>
        </div>
      </div>
    </div>
  );
};
