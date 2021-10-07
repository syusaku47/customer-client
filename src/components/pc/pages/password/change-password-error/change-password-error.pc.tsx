/* eslint-disable no-irregular-whitespace */
import './change-password-error.pc.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { Button } from '../../../../ui/button/button';

export const ChangePasswordErrorPC = () => {
  const dispatch = useDispatch();
  return (
    <div className="loginPC">
      <div className="loginPC__body">
        <div className="loginPC__logo">顧客管理システム</div>
        <div className="loginPC__title">再設定の有効期限切れ</div>
        <div className="text_box">
          パスワード再設定用のURLの有効期限が切れています<br />
          URLの有効期限は、発行から24時間です。<br />
          再度、パスワード再設定の手続きをお願いします。<br />
          <br />
          ※ご不明点等ございましたら、<br />
          　システム管理者へお問い合わせください。
        </div>
        <div style={{ margin: '0 0 30px' }}>
          <Button
            type="submit"
            onClick={() => dispatch(push(RoutingPath.sendPassword))}
          >パスワード再設定へ
          </Button>
        </div>
      </div>
      <div className="link_box">
        <Link to={RoutingPath.login}><i className="fas fa-arrow-left" />&nbsp;ログイン画面に戻る</Link>
      </div>
    </div>
  );
};
