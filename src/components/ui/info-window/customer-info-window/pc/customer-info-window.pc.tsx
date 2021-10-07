import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { CustomerListType } from '../../../../../type/customer/customer.type';
import './customer-info-window.pc.scss';
import { IconButton } from '../../../button/icon-button/icon-button';
import { Button } from '../../../button/button';
import { emailTemp } from '../../../../../utilities/open-email';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { MapActions } from '../../../../../redux/map/map.action';
import { RectLabel } from '../../../label/rect-label/rect-label';
import obIcon from '../../../../../asset/images/icon_customer_ob.svg';
import mikomiIcon from '../../../../../asset/images/icon_customer_uncontracted.svg';
import { ShowTypeLabel } from '../../../label/show-type/show-type-label';
import { joinStr } from '../../../../../utilities/join-str';
import { ProjectAdd } from '../../../../pc/pages/project/add/project-add';
import { StreetViewImg } from '../../../street-view-img/street-view-img';
import { SupportHistoryEditPC } from '../../../../pc/pages/support-history/edit/support-history-edit.pc';
import { RouteDialog } from '../../../../dialogs/route-dialog/route-dialog';

type CustomerInfoWindowProps = {
  customer: CustomerListType;
  callbackRegist?: (v: CustomerListType) => void;
  callbackClose: () => void;
  /* FIXME 仮 */
  index: number;
  label?: string;
};

export const CustomerInfoWindowPC = (props: CustomerInfoWindowProps) => {
  const {
    customer, callbackRegist, callbackClose, index, label,
  } = props;

  const dispatch = useDispatch();

  const handleClickMail = useCallback(() => {
    if (!customer.mail_address) return;
    dispatch(DialogActions.pushMessage({
      title: '',
      message: [`${customer.name}様`],
      label: 'はい',
      isCancel: true,
      cancelLabel: 'いいえ',
      callback: () => {
        dispatch(DialogActions.push({
          title: '対応履歴新規登録',
          className: 'support_history',
          element: <SupportHistoryEditPC
            mode="add"
            customerData={customer}
          />,
        }));
        emailTemp({
          emailAddress: customer.mail_address || '',
          address: `${'東京都' || ''}${'東京都台東区1-1-1' || ''}`,
          companyName: 'テスト株式会社',
          name: customer.name || '',
          postNo: joinStr(1111111 || '', 3, '-'),
          fax: '010-1111-1111' || '',
          tel: '010-1111-1111' || '',
          message: ['', 'テスト', 'テスト', 'テスト', ''],
        });
      },
    }));
  }, [customer]);

  const handleClickDetail = useCallback(() => {
    dispatch(push(`${RoutingPath.customerDetail}/${customer.id}`));
  }, [customer.id]);

  const handleClickProject = useCallback(() => {
    dispatch(DialogActions.push({
      title: '案件登録',
      className: 'max_height_dialog',
      element: <ProjectAdd customerData={customer} />,
    }));
  }, [customer]);

  const handleClickSupportHistory = useCallback(() => {
    if (callbackRegist) {
      callbackRegist(customer);
      return;
    }
    dispatch(DialogActions.push({
      title: '対応履歴新規登録',
      className: 'support_history',
      element: <SupportHistoryEditPC
        mode="add"
        customerData={customer}
      />,
    }));
  }, [callbackRegist, customer]);

  const handleClickHere = useCallback(() => {
    dispatch(MapActions.setGpsStatus('out'));
    dispatch(DialogActions.push({
      title: 'ルート設定',
      element: <RouteDialog
        type="customer"
        destination={`${customer.prefecture_name}${customer.city}${customer.address}`}
        callback={() => { }}
      />,
    }));
    // dispatch(MapActions.setDestinationPos({
    //   lat: Number(customer.lat),
    //   lng: Number(customer.lng),
    // }));
  }, [customer]);

  const typeName = customer.ob_flag && (customer.ob_flag === 1 ? 'OB' : '見込み');

  return (
    <div className="card">
      <div className="name">
        {customer.name}{/* <span>（{customer.furigana || '---'}）</span>*/}
      </div>
      <div className="card_base_row">
        <div className="col">
          <div className="address_box">
            <i className="fas fa-map-marker-alt" title="住所" />
            <div>
              <div className="post_no">
                〒{joinStr(customer.post_no, 3, '-')}
                <IconButton
                  title="ルートを表示する"
                  fontAwesomeClass="fas fa-route"
                  className="secondary"
                  // disabled
                  onClick={handleClickHere}
                />
              </div>
              <div className="address">{customer.prefecture_name || ''}{customer.city || ''}{customer.address || ''}</div>
            </div>
          </div>
          <div className="tell"><i className="fas fa-phone" title="TEL" />{customer.tel_no || '---'}</div>
          <div className="mail_address"><i className="fas fa-envelope" title="メールアドレス" /><span> {customer.mail_address || '---'}</span>
            <IconButton
              title="メールを送る"
              fontAwesomeClass="fas fa-paper-plane"
              className="secondary"
              onClick={handleClickMail}
              disabled={Boolean(!customer.mail_address)}
            />
          </div>
          <div className="sales_contact"><i className="fas fa-user-circle" title="担当者" />{customer.sales_contact_name || '---'}</div>
        </div>
        <div className="label_box">
          <ShowTypeLabel
            label={customer.ob_flag === 1 ? 'OB' : '見込み'}
            showTypeImg={typeName === 'OB' ? obIcon : mikomiIcon}
            className={typeName === 'OB' ? 'ob' : 'mikomi'}
          />
          {/* {customer.rank_name && <RectLabel label={customer.rank_name} />}*/}
          <RectLabel
            label={customer.rank_name || 'ランクなし'}/* ★顧客ランク略称abbreviation */
            bgColor={customer.rank ? 'gray' : 'gray'}/* ★TODO 背景色（background_color）*/
            color={customer.rank ? '#FFF' : '#FFF'}/* ★TODO 文字色（text_color） */
          />
          <div className="google">
            <StreetViewImg isShow={index < 3} lat={customer.lat} lng={customer.lng} />
          </div>
        </div>
      </div>
      <div className="btn_box">
        {!callbackRegist
          && (
            <>
              <Button className="sm primary" onClick={handleClickDetail}>顧客詳細</Button>
              <Button className="sm primary" onClick={handleClickProject}>案件登録</Button>
            </>
          )}
        <Button className="sm primary" onClick={handleClickSupportHistory}>{label || '対応登録'}</Button>
      </div>
      <IconButton
        title="閉じる"
        fontAwesomeClass="fas fa-times"
        className="default close"
        onClick={callbackClose}
      />
    </div>
  );
};
