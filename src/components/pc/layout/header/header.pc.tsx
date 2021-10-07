// import { useState } from 'react';
// import { Header as SHeader, Segment } from 'semantic-ui-react';
import './header.pc.scss';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import { RoutingPath } from '../../../../routes/routing-pass';
import { IconButton } from '../../../ui/button/icon-button/icon-button';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { OrderPC } from '../../pages/order/order.pc';
import { AuthActions } from '../../../../redux/auth/auth.action';
import { State } from '../../../../redux/root.reducer';

export const HeaderPC = () => {
  const location = useLocation();
  const path = location.pathname;
  const activeMenu = path; // path が複雑になる場合は要調整
  const user = useSelector((state: State) => state.auth.user, isEqual);

  // useCallback
  const dispatch = useDispatch();
  const handleClick = useCallback(
    (routingPath: string) => {
      dispatch(push(routingPath));
    },
    [],
  );

  const handleClickLogout = useCallback(() => {
    dispatch(DialogActions.pushMessage({
      title: 'ログアウト',
      message: ['ログアウトしますか'],
      isCancel: true,
      callback: () => {
        dispatch(AuthActions.api.logout());
      },
    }));
  },
  []);

  return (
    <header className="headerPC">
      <div className="headerPC__top">
        <h1>
          <Link to={RoutingPath.customer}>
            顧客管理システム
          </Link>
        </h1>
        <div className="account_box">
          {/* FIXME 店舗名 */}
          ようこそ！{user?.store_name || 'テスト'}店&nbsp;{user?.name}&nbsp;さん
          <IconButton
            title="ログアウト"
            fontAwesomeClass="fas fa-sign-out-alt"
            className="default logout"
            onClick={handleClickLogout}
          />
        </div>
      </div>
      <div className="headerPC__bottom">
        <div
          className={`headerPC__bottom__menu ${activeMenu === RoutingPath.customer || activeMenu.match(`${RoutingPath.customer}/detail`) ? 'active' : ''}`}
          onClick={() => handleClick(RoutingPath.customer)}
        >
          顧客
        </div>
        <div
          className={`headerPC__bottom__menu ${activeMenu === RoutingPath.project || activeMenu.match(`${RoutingPath.project}/detail`) ? 'active' : ''}`}
          onClick={() => handleClick(RoutingPath.project)}
        >
          案件
        </div>
        <div
          className={`headerPC__bottom__menu ${activeMenu === RoutingPath.estimate || activeMenu.match(`${RoutingPath.estimate}/detail`) ? 'active' : ''}`}
          onClick={() => handleClick(RoutingPath.estimate)}
        >
          見積
        </div>
        <div
          className={`headerPC__bottom__menu ${activeMenu === RoutingPath.order ? 'active' : ''}`}
          onClick={() => dispatch(DialogActions.push({
            title: '受注登録',
            className: 'max_height_dialog max_width_dialog order_dialog',
            element: <OrderPC />,
          }))}
        >
          受注
        </div>
        <div
          className={`headerPC__bottom__menu ${activeMenu === RoutingPath.maintenance ? 'active' : ''}`}
          onClick={() => handleClick(RoutingPath.maintenance)}
        >
          メンテナンス
        </div>
        <div
          className={`headerPC__bottom__menu ${activeMenu === RoutingPath.file ? 'active' : ''}`}
          onClick={() => handleClick(RoutingPath.file)}
        >
          ファイル
        </div>
        <div
          className={`headerPC__bottom__menu ${activeMenu === RoutingPath.supportHistory ? 'active' : ''}`}
          onClick={() => handleClick(RoutingPath.supportHistory)}
        >
          対応履歴
        </div>
        <div
          className={`headerPC__bottom__menu ${activeMenu === RoutingPath.exportCsv ? 'active' : ''}`}
          onClick={() => handleClick(RoutingPath.exportCsv)}
        >
          CSV出力
        </div>
        <div
          className={`headerPC__bottom__menu ${activeMenu === RoutingPath.master ? 'active' : ''}`}
          onClick={() => handleClick(RoutingPath.master)}
        >
          マスタ管理
        </div>
      </div>
    </header>
  );
};
