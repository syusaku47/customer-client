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
  const [placeholderText, setPlaceholderText] = useState<string>('?????? (??????/?????????/TEL)');

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
        title: '???????????????',
        message: ['???????????????????????????'],
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
      title: '?????????????????????',
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
        setPlaceholderText('???????????????????????????TEL');
        break;
      case 'project':
        setPlaceholderText('???????????????????????????????????????TEL');
        break;
      case 'estimate':
        setPlaceholderText('??????????????????????????????????????????');
        break;
      case 'maintenance':
        setPlaceholderText('??????????????????????????????????????????????????????TEL');
        break;
      case 'file':
        setPlaceholderText('???????????????????????????????????????????????????');
        break;
      case 'support-history':
        setPlaceholderText('???????????????????????????????????????(??????)???????????????');
        break;
      default:
        setPlaceholderText('?????????????????????TEL');
        break;
    }
  }, [path]);

  return (
    <header
      className="header_sp"
      id="header_sp"
      ref={headerRef}
    >
      {/* ?????????????????? */}
      <div
        className={`header_sp_menu_btn ${isSearchFocus ? 'search_focused' : ''}`}
        onClick={() => setIsMenuOpened(!isMenuOpened)}
      >
        <i className="fas fa-bars" />
      </div>

      {/* ????????????????????? */}
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

      {/* ???????????? */}
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

      {/* ==================== ???????????????????????? ==================== */}
      <div className={`header_sp__menu_content ${isMenuOpened ? 'opened' : ''}`}>

        {/* ???????????????????????????????????? */}
        <div className="header_sp__menu_content_bg" />

        {/* ========== ???????????? ========== */}
        <div className="header_sp__menu_content__header" ref={menuHeaderEle}>
          <span className="header_sp__menu_content__header__greeting">
            ???????????????{user?.store_name || '?????????'}???&nbsp;{user?.name}&nbsp;??????
            {/* ???????????????????????? ???????????? */}
          </span>
          <div
            className="header_sp__menu_content__header__close"
            onClick={() => setIsMenuOpened(false)}
          >
            <i className="fas fa-times" />
          </div>
        </div>

        {/* ========== ????????? ========== */}
        <div
          className="header_sp__menu_content__body"
          style={{
            top: `${menuHeaderHeight}px`,
            height: `calc(100% - ${menuHeaderHeight}px)`,
          }}
        >

          {/* ===== ????????????????????? ===== */}
          <div className="main_menu">

            <div
              className="main_menu_btn"
              onClick={() => handleClickMenu(RoutingPath.customer)}
            >
              <img src={IconUsers} alt="" />
              <span>????????????</span>
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
              <span>????????????</span>
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
              <span>????????????</span>
            </div>

            <div className="main_menu_btn" onClick={() => handleClickMenu(RoutingPath.file)}>
              <img src={IconFileUpload} alt="" />
              <span>????????????</span>
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
              <span>????????????</span>
            </div>
          </div>

          {/* ===== ????????????????????? ===== */}
          {/* TODO ?????????????????????????????????????????? */}
          <div className="header_sp__menu_content__body__menu_list">

            <div className="menu">
              <div className="menu__category">??????</div>
              <HeaderMenuListItem
                label="????????????"
                onClick={() => handleClickMenu(RoutingPath.customer)}
                className="menu__item"
              />
              <HeaderMenuListItem
                label="????????????"
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
              <div className="menu__category">??????</div>
              <HeaderMenuListItem
                label="????????????"
                onClick={() => handleClickMenu(RoutingPath.project)}
                className="menu__item"
              />

              <HeaderMenuListItem
                label="????????????"
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
              <div className="menu__category">??????</div>
              <HeaderMenuListItem
                label="????????????"
                onClick={() => handleClickMenu(RoutingPath.estimate)}
                className="menu__item"
              />

              <HeaderMenuListItem
                label="????????????"
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
              <div className="menu__category">??????????????????</div>
              <HeaderMenuListItem
                label="????????????????????????"
                onClick={() => handleClickMenu(RoutingPath.maintenance)}
                className="menu__item"
              />
              <HeaderMenuListItem
                label="????????????????????????"
                onClick={() => dispatch(DialogActions.push({
                  title: MaintenanceEditDialogTitle.add,
                  element: <MaintenanceEditSP mode="add" />,
                }))}
                className="menu__item"
              />
            </div>

            <div className="menu">
              <div className="menu__category">????????????</div>
              <HeaderMenuListItem
                label="??????????????????"
                onClick={() => handleClickMenu(RoutingPath.file)}
                className="menu__item"
              />
              <HeaderMenuListItem
                label="??????????????????"
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
              <div className="menu__category">????????????</div>
              <HeaderMenuListItem
                label="??????????????????"
                onClick={() => handleClickMenu(RoutingPath.supportHistory)}
                className="menu__item "
              />
              <HeaderMenuListItem
                label="??????????????????"
                onClick={() => dispatch(DialogActions.push({
                  title: SupportHistoryEditDialogTitle.add,
                  element: <SupportHistoryEditSP mode="add" />,
                }))}
                className="menu__item "
              />
            </div>
          </div>

          {/* ===== ???????????????????????????????????? ===== */}
          <div className="header_sp__menu_content__body__bottom">

            <div className="user_info">
              <div className="user_info_label">
                <span>??????????????????</span>
                <Button size="md" color="secondary" onClick={handleClickChangePassword} className="menu__user-info__remake-pass">?????????????????????</Button>
              </div>
              <div className="user_info_table row_table_style">
                <div className="t_row">
                  <div className="t_header">??????CD</div>
                  <div className="t_body">{userInfo.employeeCD}</div>
                </div>
                <div className="t_row">
                  <div className="t_header">??????</div>
                  <div className="t_body">{userInfo.storeName}</div>
                </div>
                <div className="t_row">
                  <div className="t_header">??????</div>
                  <div className="t_body">{userInfo.userName}????????????{userInfo.userAltName && userInfo.userAltName}???</div>
                </div>
                <div className="t_row">
                  <div className="t_header">????????????</div>
                  <div className="t_body">{userInfo.userFurigana}</div>
                </div>
                <div className="t_row">
                  <div className="t_header">??????</div>
                  <div className="t_body">{userInfo.jobPost}</div>
                </div>
                <div className="t_row">
                  <div className="t_header">?????????????????????</div>
                  <div className="t_body">{userInfo.email}</div>
                </div>
              </div>
            </div>
            <LeftIconButton
              label="???????????????"
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
