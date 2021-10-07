import { push } from 'connected-react-router';
import { isEqual } from 'lodash';
import React, {
  RefObject, useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import IconEditSupport from '../../../../asset/images/clipboard-list.svg';
import IconFileUpload from '../../../../asset/images/file-upload-solid.svg';
import IconSearchDetail from '../../../../asset/images/icon/search-detail.svg';
import IconCustomerSearch from '../../../../asset/images/icon_custom-search.svg';
import IconUserEdit from '../../../../asset/images/icon_user-edit.svg';
import IconUsers from '../../../../asset/images/icon_users.svg';
import { AuthActions } from '../../../../redux/auth/auth.action';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { State } from '../../../../redux/root.reducer';
import { RoutingPath } from '../../../../routes/routing-pass';
import { Button } from '../../../ui/button/button';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { Input } from '../../../ui/input/input';
import { CustomerEditSP } from '../../pages/customer/edit/customer-edit.sp';
import { CustomerEditDialogTitle } from '../../pages/customer/edit/customer-edit.type';
import { SearchBoxCustomerSP } from '../../pages/customer/serch-box/customer-search-box.sp';
import { EstimateEditSP } from '../../pages/estimate/edit/estimate-edit.sp';
import { EstimateEditDialogTitle } from '../../pages/estimate/edit/estimate-edit.type.sp';
import { FileEditSP } from '../../pages/file/edit/file-edit.sp';
import { FileEditDialogTitle } from '../../pages/file/edit/file-edit.type';
import { MaintenanceEditSP } from '../../pages/maintenance/edit/maintenance-edit.sp';
import { MaintenanceEditDialogTitle } from '../../pages/maintenance/edit/maintenance-edit.type';
import { ProjectEditSP } from '../../pages/project/edit/project-edit.sp';
import { ProjectEditDialogTitle } from '../../pages/project/edit/project-edit.type.sp';
import { SupportHistoryEditSP } from '../../pages/support-history/edit/support-history-edit.sp';
import { SupportHistoryEditDialogTitle } from '../../pages/support-history/edit/support-history-edit.type';
import { SearchBoxDialogTitle } from '../search-box/search-box.type.sp';
import { ChangePasswordDialogSP } from './change-password-dialog/change-password-dialog.sp';
import { HeaderMenuListItem } from './header-menu-list-item';
import './header.sp.scss';
import { UserInfoData } from './header.sp.type';

export type SearchBoxDialogProps = {
  title: string,
  element: HTMLElement | globalThis.JSX.Element
}

type Props = {
  userInfo: UserInfoData;
  searchBoxDialog?: SearchBoxDialogProps;
  headerRef?: RefObject<HTMLElement>,
  menuOpen?:boolean,
  // searchCallback?: ()=>{}
  searchCallback?: (val:string)=>void,
}

export const HeaderSP = (props: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const {
    userInfo, searchBoxDialog, headerRef, menuOpen, searchCallback,
  } = props;

  const user = useSelector((state: State) => state.auth.user, isEqual);

  /* ref */
  const menuHeaderEle = useRef<HTMLDivElement>(null);

  /* state */
  const [searchStr, setSearchStr] = useState('');
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(menuOpen || false);
  const [menuHeaderHeight, setMenuHeaderHeight] = useState<number>(0);
  const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);
  const [placeholderText, setPlaceholderText] = useState<string>('検索 (住所/顧客名/TEL)');

  /* callback */
  const handleClickMenu = useCallback(
    (routingPath: string) => {
      setIsMenuOpened(false);
      dispatch(push(routingPath));
    },
    [],
  );

  const handleClickLogout = useCallback(
    () => {
      dispatch(DialogActions.pushMessage({
        title: 'ログアウト',
        message: ['ログアウトしますか'],
        isCancel: true,
        callback: () => {
          dispatch(AuthActions.api.logout());
        },
      }));
    },
    [],
  );

  const handleClickChangePassword = () => {
    dispatch(DialogActions.push({
      title: 'パスワード変更',
      element: <ChangePasswordDialogSP />,
    }));
  };

  /* effect */
  useEffect(() => {
    setMenuHeaderHeight(menuHeaderEle.current?.getBoundingClientRect().height || 0);
  }, [menuHeaderEle]);

  useEffect(() => {
    const pageCategory = path.split('/')[1];
    // console.log('pageCategory >>>>>>>>>>', pageCategory);
    switch (pageCategory) {
      case 'customer':
        setPlaceholderText('顧客住所／顧客名／TEL');
        break;
      case 'project':
        setPlaceholderText('住所／顧客名／案件名／現場TEL');
        break;
      case 'estimate':
        setPlaceholderText('現場名称／案件名／見積作成者');
        break;
      case 'maintenance':
        setPlaceholderText('顧客名／メンテナンス／顧客住所／顧客TEL');
        break;
      case 'file':
        setPlaceholderText('顧客名／案件名／ファイル名／更新日');
        break;
      case 'support-history':
        setPlaceholderText('顧客名／案件名／対応履歴名(件名)／対応日時');
        break;
      default:
        setPlaceholderText('住所／顧客名／TEL');
        break;
    }
  }, [path]);

  return (
    <header
      className="header_sp"
      id="header_sp"
      ref={headerRef}
    >
      {/* ハンバーガー */}
      <div
        className={`header_sp_menu_btn ${isSearchFocus ? 'search_focused' : ''}`}
        onClick={() => setIsMenuOpened(!isMenuOpened)}
      >
        <i className="fas fa-bars" />
      </div>

      {/* キーワード検索 */}
      <div className={`header_sp__search ${isSearchFocus ? 'search_focused' : ''}`}>
        <form action="">
          <Input
            onEnterKeyPress={() => {
              if (searchCallback) { searchCallback(searchStr); }
            }}
            placeholder={placeholderText}
            type="search"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            setIsFocus={setIsSearchFocus}
          />
        </form>
      </div>

      {/* 詳細検索 */}
      <div
        className={`header_sp__search_box_btn ${searchBoxDialog ? '' : 'invisible'} ${isSearchFocus ? 'search_focused' : ''}`}
        onClick={() => {
          dispatch(DialogActions.push({
            title: searchBoxDialog?.title,
            element: searchBoxDialog?.element,
          }));
        }}
      >
        <img src={IconSearchDetail} alt="" />
      </div>

      {/* ==================== ヘッダーメニュー ==================== */}
      <div className={`header_sp__menu_content ${isMenuOpened ? 'opened' : ''}`}>

        {/* 下位レイヤー不可視用背景 */}
        <div className="header_sp__menu_content_bg" />

        {/* ========== ヘッダー ========== */}
        <div className="header_sp__menu_content__header" ref={menuHeaderEle}>
          <span className="header_sp__menu_content__header__greeting">
            ようこそ！{user?.store_name || 'テスト'}店&nbsp;{user?.name}&nbsp;さん
            {/* ようこそ！○○店 ○○さん */}
          </span>
          <div
            className="header_sp__menu_content__header__close"
            onClick={() => setIsMenuOpened(false)}
          >
            <i className="fas fa-times" />
          </div>
        </div>

        {/* ========== ボディ ========== */}
        <div
          className="header_sp__menu_content__body"
          style={{
            top: `${menuHeaderHeight}px`,
            height: `calc(100% - ${menuHeaderHeight}px)`,
          }}
        >

          {/* ===== メインメニュー ===== */}
          <div className="main_menu">

            <div
              className="main_menu_btn"
              onClick={() => handleClickMenu(RoutingPath.customer)}
            >
              <img src={IconUsers} alt="" />
              <span>顧客一覧</span>
            </div>

            <div
              className="main_menu_btn"
              onClick={() => {
                dispatch(DialogActions.push({
                  title: CustomerEditDialogTitle.add,
                  element: <CustomerEditSP mode="add" />,
                }));
              }}
            >
              <img src={IconUserEdit} alt="" />
              <span>顧客登録</span>
            </div>

            <div
              className="main_menu_btn"
              onClick={() => {
                dispatch(DialogActions.push({
                  title: SearchBoxDialogTitle,
                  element: <SearchBoxCustomerSP />,
                }));
              }}
            >
              <img src={IconCustomerSearch} alt="" />
              <span>顧客検索</span>
            </div>

            <div className="main_menu_btn" onClick={() => handleClickMenu(RoutingPath.file)}>
              <img src={IconFileUpload} alt="" />
              <span>ファイル</span>
            </div>

            <div
              className="main_menu_btn"
              onClick={() => {
                handleClickMenu(RoutingPath.supportHistory);
                dispatch(DialogActions.push({
                  title: SupportHistoryEditDialogTitle.add,
                  element: <SupportHistoryEditSP mode="add" />,
                }));
              }}
            >
              <img src={IconEditSupport} alt="" />
              <span>対応登録</span>
            </div>
          </div>

          {/* ===== メニューリスト ===== */}
          {/* TODO メニュー押下時の動線不備対応 */}
          <div className="header_sp__menu_content__body__menu_list">

            <div className="menu">
              <div className="menu__category">顧客</div>
              <HeaderMenuListItem
                label="顧客一覧"
                onClick={() => handleClickMenu(RoutingPath.customer)}
                className="menu__item"
              />
              <HeaderMenuListItem
                label="顧客登録"
                onClick={() => {
                  dispatch(DialogActions.push({
                    title: CustomerEditDialogTitle.add,
                    element: <CustomerEditSP mode="add" />,
                  }));
                }}
                className="menu__item"
              />
            </div>

            <div className="menu">
              <div className="menu__category">案件</div>
              <HeaderMenuListItem
                label="案件一覧"
                onClick={() => handleClickMenu(RoutingPath.project)}
                className="menu__item"
              />

              <HeaderMenuListItem
                label="案件登録"
                onClick={() => {
                  dispatch(DialogActions.push({
                    title: ProjectEditDialogTitle.add,
                    element: <ProjectEditSP mode="add" />,
                  }));
                }}
                className="menu__item"
              />
            </div>

            <div className="menu">
              <div className="menu__category">見積</div>
              <HeaderMenuListItem
                label="見積一覧"
                onClick={() => handleClickMenu(RoutingPath.estimate)}
                className="menu__item"
              />

              <HeaderMenuListItem
                label="見積登録"
                onClick={() => {
                  dispatch(DialogActions.push({
                    title: EstimateEditDialogTitle.add,
                    element: <EstimateEditSP mode="add" />,
                  }));
                }}
                className="menu__item"
              />
            </div>

            <div className="menu">
              <div className="menu__category">メンテナンス</div>
              <HeaderMenuListItem
                label="メンテナンス一覧"
                onClick={() => handleClickMenu(RoutingPath.maintenance)}
                className="menu__item"
              />
              <HeaderMenuListItem
                label="メンテナンス登録"
                onClick={() => dispatch(DialogActions.push({
                  title: MaintenanceEditDialogTitle.add,
                  element: <MaintenanceEditSP mode="add" />,
                }))}
                className="menu__item"
              />
            </div>

            <div className="menu">
              <div className="menu__category">ファイル</div>
              <HeaderMenuListItem
                label="ファイル一覧"
                onClick={() => handleClickMenu(RoutingPath.file)}
                className="menu__item"
              />
              <HeaderMenuListItem
                label="ファイル登録"
                onClick={() => {
                  dispatch(DialogActions.push({
                    title: FileEditDialogTitle.add,
                    element: <FileEditSP mode="add" />,
                  }));
                }}
                className="menu__item "
              />
            </div>

            <div className="menu">
              <div className="menu__category">対応履歴</div>
              <HeaderMenuListItem
                label="対応履歴一覧"
                onClick={() => handleClickMenu(RoutingPath.supportHistory)}
                className="menu__item "
              />
              <HeaderMenuListItem
                label="対応履歴登録"
                onClick={() => dispatch(DialogActions.push({
                  title: SupportHistoryEditDialogTitle.add,
                  element: <SupportHistoryEditSP mode="add" />,
                }))}
                className="menu__item "
              />
            </div>
          </div>

          {/* ===== ユーザー情報・ログアウト ===== */}
          <div className="header_sp__menu_content__body__bottom">

            <div className="user_info">
              <div className="user_info_label">
                <span>ユーザー情報</span>
                <Button size="md" color="secondary" onClick={handleClickChangePassword} className="menu__user-info__remake-pass">パスワード変更</Button>
              </div>
              <div className="user_info_table row_table_style">
                <div className="t_row">
                  <div className="t_header">社員CD</div>
                  <div className="t_body">{userInfo.employeeCD}</div>
                </div>
                <div className="t_row">
                  <div className="t_header">店舗</div>
                  <div className="t_body">{userInfo.storeName}</div>
                </div>
                <div className="t_row">
                  <div className="t_header">名称</div>
                  <div className="t_body">{userInfo.userName}（略称：{userInfo.userAltName && userInfo.userAltName}）</div>
                </div>
                <div className="t_row">
                  <div className="t_header">フリガナ</div>
                  <div className="t_body">{userInfo.userFurigana}</div>
                </div>
                <div className="t_row">
                  <div className="t_header">役職</div>
                  <div className="t_body">{userInfo.jobPost}</div>
                </div>
                <div className="t_row">
                  <div className="t_header">メールアドレス</div>
                  <div className="t_body">{userInfo.email}</div>
                </div>
              </div>
            </div>
            <LeftIconButton
              label="ログアウト"
              fontAwesomeClass="fas fa-sign-out-alt"
              className="menu__item"
              onClick={handleClickLogout}
              color="primary"
              size="md"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
