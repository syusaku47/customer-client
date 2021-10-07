/* eslint-disable no-irregular-whitespace */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { CustomerListType } from '../../../../../type/customer/customer.type';
import { emailTemp } from '../../../../../utilities/open-email';
import { IconButton } from '../../../button/icon-button/icon-button';
import { openTel } from '../../../../../utilities/open-tel';
import { Button } from '../../../button/button';
import { noPinch } from '../../../../../utilities/no-pinch';
import { MapActions } from '../../../../../redux/map/map.action';
import { RectLabel } from '../../../label/rect-label/rect-label';
import { ShowTypeLabel } from '../../../label/show-type/show-type-label';
import obIcon from '../../../../../asset/images/icon_customer_ob.svg';
import mikomiIcon from '../../../../../asset/images/icon_customer_uncontracted.svg';
import { joinStr } from '../../../../../utilities/join-str';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { SupportHistoryEditDialogTitle } from '../../../../sp/pages/support-history/edit/support-history-edit.type';
import { SupportHistoryEditSP } from '../../../../sp/pages/support-history/edit/support-history-edit.sp';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { CustomerEditDialogTitle } from '../../../../sp/pages/customer/edit/customer-edit.type';
import { CustomerEditSP } from '../../../../sp/pages/customer/edit/customer-edit.sp';
import { openLineMessage } from '../../../../../utilities/open-link';
import { StreetViewImg } from '../../../street-view-img/street-view-img';
import { RouteDialog } from '../../../../dialogs/route-dialog/route-dialog';

type CustomerInfoWindowProps = {
  customer: CustomerListType;
  callBack: () => void;
  callbackRegist?: (v: CustomerListType) => void;
  index: number;
  label?: string;
};

export const CustomerInfoWindowSP = (props: CustomerInfoWindowProps) => {
  const {
    customer, callBack, callbackRegist, index, label,
  } = props;
  const [detailFlag, setDetailFlag] = useState(false);
  const ele = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleClickArrow = useCallback(() => {
    if (detailFlag) {
      setDetailFlag(false);
      callBack();
    } else {
      setDetailFlag(true);
    }
  }, [detailFlag]);

  const handleClickTel = useCallback(() => {
    dispatch(DialogActions.pushMessage({
      title: '',
      message: [`${customer.name}宛に電話をかけます`],
      label: 'はい',
      isCancel: true,
      cancelLabel: 'いいえ',
      callback: () => {
        dispatch(DialogActions.push({
          title: SupportHistoryEditDialogTitle.add,
          element: <SupportHistoryEditSP
            mode="add"
            customerData={customer}
          />,
        }));
        openTel({ tel: customer.tel_no });
      },
    }));
  }, [customer]);

  const handleClickMail = useCallback(() => {
    dispatch(DialogActions.pushMessage({
      title: '',
      message: [`${customer.name}宛にメールを送信します`],
      label: 'はい',
      isCancel: true,
      cancelLabel: 'いいえ',
      callback: () => {
        dispatch(DialogActions.push({
          title: SupportHistoryEditDialogTitle.add,
          element: <SupportHistoryEditSP
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

  const handleClickSupportHistory = useCallback(() => {
    if (callbackRegist) {
      callbackRegist(customer);
      return;
    }
    dispatch(DialogActions.push({
      title: SupportHistoryEditDialogTitle.add,
      element: <SupportHistoryEditSP
        mode="add"
        customerData={customer}
      />,
    }));
  }, [dispatch, callbackRegist, customer]);

  const handleClickLine = useCallback(() => {
    openLineMessage(`/#${RoutingPath.customerDetail}/${customer.id}`);
  }, []);

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
  }, [customer]);

  useEffect(() => {
    const pinchCallback = noPinch(ele.current);
    return pinchCallback;
  }, [ele]);

  return (
    <div className={`CustomerInfoWindow info_window ${callbackRegist ? 'in_dialog' : ''}`} ref={ele}>
      {!callbackRegist
      && (
        <>
          <div className="info_window_arrow_btn" onClick={handleClickArrow}>
            <i className={`fas fa-angle-double-${!detailFlag ? 'up' : 'down'}`} />
          </div>
          <IconButton
            title="閉じる"
            fontAwesomeClass="fas fa-times"
            className="default info_window_close_btn"
            onClick={callBack}
          />
        </>
      )}
      {detailFlag ? (
        /* ===================== 詳細表示 ===================== */
        <div className="info_window_info detail">

          <div className="info_window_info_row row1">
            <div className="row1_col1">

              <div className="important">
                {customer.name} {/* `(${customer.furigana || '---'})`*/}
              </div>

              <div>
                <div>
                  〒{joinStr(customer.post_no, 3, '-')}<br />
                  {`${customer.prefecture_name || ' '}${customer.city || ''}${customer.address || ''} ${customer.building_name || ''}`}
                </div>
              </div>

              <div className="row_table_style">

                <div className="t_row">
                  <div className="t_header">TEL</div>
                  <div className="t_body">{customer.tel_no ?? '---'}</div>
                  <div>
                    <IconButton
                      color="secondary"
                      size="md"
                      onClick={handleClickTel}
                      fontAwesomeClass="fa fa-phone"
                      disabled={!customer.tel_no}
                    />
                  </div>
                </div>

                <div className="t_row">
                  <div className="t_header">Email</div>
                  <div className="t_body e_mail">
                    <div>
                      {customer.mail_address ?? '---'}
                    </div>
                    <div>
                      <IconButton
                        color="secondary"
                        size="sm"
                        onClick={handleClickMail}
                        fontAwesomeClass="fas fa-envelope"
                        disabled={Boolean(!customer.mail_address)}
                      />
                    </div>
                  </div>
                </div>

                <div className="t_row">
                  <div className="t_header">LINE ID</div>
                  <div className="t_body">{customer.line_id ?? '---'}</div>
                </div>

                <div className="t_row">
                  <div className="t_header">Facebook ID</div>
                  <div className="t_body">{customer.facebook_id
                    ? (
                      <a href={`https://www.facebook.com/${customer.facebook_id}`} target="_blank" rel="noopener noreferrer">
                        {customer.facebook_id}
                      </a>
                    )
                    : '---'}
                  </div>
                </div>

                <div className="t_row">
                  <div className="t_header">エリア</div>
                  <div className="t_body">{customer.area_name ?? '---'}</div>
                </div>

                <div className="t_row">
                  <div className="t_header">営業担当店舗</div>
                  <div className="t_body">{customer.sales_shop ?? '---'}</div>
                </div>

                <div className="t_row">
                  <div className="t_header">営業担当者</div>
                  <div className="t_body">{customer.sales_contact_name ?? '---'}</div>
                </div>

              </div>
            </div>

            <div className="row1_col2 ">
              <div className="thumb google">
                <StreetViewImg isShow={index < 3} lat={customer.lat} lng={customer.lng} />
              </div>

              <ShowTypeLabel
                label={`${customer.ob_flag === 1 ? 'OB' : '見込み'}`}
                showTypeImg={`${customer.ob_flag === 1 ? obIcon : mikomiIcon}`}
                className={`${customer.ob_flag === 1 ? 'ob' : 'mikomi'}`}
              />
              {/* {customer.rank_name && <RectLabel label={customer.rank_name} />}*/}
              <RectLabel
                label={customer.rank_name || 'ランクなし'}/* ★顧客ランク略称abbreviation */
                bgColor={customer.rank ? 'gray' : 'gray'}/* ★TODO 背景色（background_color）*/
                color={customer.rank ? '#FFF' : '#FFF'}
              />
            </div>
          </div>

          <div className="info_window_info_row row2">
            <Button
              color="secondary"
              size="md"
              onClick={() => {
                dispatch(push(`${RoutingPath.customerDetail}/${customer.id}`));
              }}
            >顧客詳細
            </Button>

            <Button
              color="secondary"
              size="md"
              onClick={() => dispatch(DialogActions.push({
                title: CustomerEditDialogTitle.update,
                element: <CustomerEditSP mode="update" customerID={customer.id} />,
              }))}
            >顧客編集
            </Button>
          </div>

        </div>
      ) : (
        /* ===================== 簡易表示 ===================== */
        <div className="info_window_info simple" style={callbackRegist && { paddingTop: 0 }}>
          <div className="info_window_info_row row1">
            <div className="row1_col1" style={callbackRegist && { paddingTop: '0.75rem' }}>

              <div className="important">
                {customer.name} {/* `(${customer.furigana || '---'})`*/}
              </div>

              <div>
                〒{joinStr(customer.post_no, 3, '-')}<br />
                {`${customer.prefecture_name || ' '}${customer.city || ''}${customer.address || ''} ${customer.building_name || ''}`}
              </div>

              <div className="row_table_style">
                <div className="t_row">
                  <div className="t_header">TEL</div>
                  <div className="t_body">{customer.tel_no ?? '---'}</div>
                  <div>
                    <IconButton
                      color="secondary"
                      size="md"
                      onClick={handleClickTel}
                      fontAwesomeClass="fa fa-phone"
                      disabled={!customer.tel_no}
                    />
                  </div>
                </div>

                <div className="t_row">
                  <div className="t_header">Email</div>
                  <div className="t_body e_mail">
                    <div>
                      {customer.mail_address ?? '---'}
                    </div>
                    <div>
                      <IconButton
                        color="secondary"
                        size="sm"
                        onClick={handleClickMail}
                        fontAwesomeClass="fas fa-envelope"
                        disabled={Boolean(!customer.mail_address)}
                      />
                    </div>
                  </div>
                </div>

                <div className="t_row">
                  <div className="t_header">担当者</div>
                  <div className="t_body">{customer.sales_contact_name || '---'}</div>
                </div>
              </div>

            </div>

            <div className="row1_col2 ">
              {callbackRegist && (
              <IconButton
                title="閉じる"
                fontAwesomeClass="fas fa-times"
                className="default info_window_close_btn"
                onClick={callBack}
                style={{ position: 'static', marginLeft: 'auto', width: 'auto' }}
              />
              )}

              <div className="thumb google">
                <StreetViewImg isShow={index < 3} lat={customer.lat} lng={customer.lng} />
              </div>
              <ShowTypeLabel
                label={`${customer.ob_flag === 1 ? 'OB' : '見込み'}`}
                showTypeImg={`${customer.ob_flag === 1 ? obIcon : mikomiIcon}`}
                className={`${customer.ob_flag === 1 ? 'ob' : 'mikomi'}`}
              />

              {/* {customer.rank_name && <RectLabel label={customer.rank_name} />}*/}
              <RectLabel
                label={customer.rank_name || 'ランクなし'}/* ★顧客ランク略称abbreviation */
                bgColor={customer.rank ? 'gray' : 'gray'}/* ★TODO 背景色（background_color）*/
                color={customer.rank ? '#FFF' : '#FFF'}
              />
            </div>
          </div>
          {!callbackRegist
              && (
              <div className="info_window_info_row row2">
                <Button
                  color="secondary"
                  size="md"
                  onClick={() => {
                    dispatch(push(`${RoutingPath.customerDetail}/${customer.id}`));
                  }}
                >顧客詳細
                </Button>

                <Button
                  color="secondary"
                  size="md"
                  onClick={() => dispatch(DialogActions.push({
                    title: CustomerEditDialogTitle.update,
                    element: <CustomerEditSP mode="update" customerID={customer.id} />,
                  }))}
                >顧客編集
                </Button>
              </div>
              )}
        </div>
      )}
      <div className="info_window_footer">
        {!callbackRegist
        && (
        <>
          <Button className="icon_btn" color="primary" size="sm" onClick={handleClickTel} disabled={!customer.tel_no}>
            <i className="fas fa-phone" />
          </Button>
          <Button color="primary" size="md" onClick={handleClickSupportHistory}>対応登録</Button>
          <Button className="icon_btn" color="primary" size="sm" onClick={handleClickLine}>
            <i className="fab fa-line" />
          </Button>
          <Button color="primary" size="md" onClick={handleClickHere}>ここへ行く</Button>
        </>
        )}
        {callbackRegist
          && <Button color="primary" size="md" onClick={handleClickSupportHistory}>{label || '対応登録'}</Button>}
      </div>
    </div>
  );
};
