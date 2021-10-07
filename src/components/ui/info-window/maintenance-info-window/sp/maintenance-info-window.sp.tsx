/* eslint-disable no-irregular-whitespace */
import { push } from 'connected-react-router';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { MapActions } from '../../../../../redux/map/map.action';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { MaintenanceList } from '../../../../../type/maintenance/maintenance.type';
import { joinStr } from '../../../../../utilities/join-str';
import { noPinch } from '../../../../../utilities/no-pinch';
import { openLineMessage } from '../../../../../utilities/open-link';
import { openTel } from '../../../../../utilities/open-tel';
import { MaintenanceEditSP } from '../../../../sp/pages/maintenance/edit/maintenance-edit.sp';
import { Button } from '../../../button/button';
import { RectLabel } from '../../../label/rect-label/rect-label';
import maintenanceCompleted from '../../../../../asset/images/pin/maintenance_completed.svg';
import maintenanceStarted from '../../../../../asset/images/pin/maintenance_started.svg';
import { ShowTypeLabel } from '../../../label/show-type/show-type-label';
import './maintenance-info-window.sp.scss';
import { MaintenanceEditDialogTitle } from '../../../../sp/pages/maintenance/edit/maintenance-edit.type';
import { IconButton } from '../../../button/icon-button/icon-button';
import { StreetViewImg } from '../../../street-view-img/street-view-img';
import { RouteDialog } from '../../../../dialogs/route-dialog/route-dialog';

type maintenance_info_window_spProps = {
  maintenance: MaintenanceList;
  callBack: () => void;
  index: number;
};

export const MaintenanceInfoWindowSP = (props: maintenance_info_window_spProps) => {
  const { maintenance, callBack, index } = props;
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
    openTel({ tel: maintenance.tel_no });
    // openTel({ tel: maintenance.field_tel_no });
  }, []);

  const handleClickLine = useCallback(() => {
    openLineMessage(`/#${RoutingPath.maintenanceDetail}/${maintenance.id}`);
  }, [maintenance.id]);

  const handeleClickHere = useCallback(() => {
    dispatch(MapActions.setGpsStatus('out'));
    dispatch(DialogActions.push({
      title: 'ルート設定',
      element: <RouteDialog
        type="customer"
        destination={maintenance.customer_place}
        callback={() => { }}
      />,
    }));
  }, [maintenance]);

  useEffect(() => {
    const pinchCallback = noPinch(ele.current);
    return pinchCallback;
  }, [ele]);

  /* TODO 後で消す */
  let cRankColor = '#1451a1';
  // let pRankColor = '#1451a1';
  let status = '';
  let img = '';
  let pClassName = '';
  switch ('プラチナ') {
    case 'プラチナ':
    default:
      cRankColor = '#d06d8c';
      break;
  }
  switch (maintenance.fixed_flag) {
    case true:
    default:
      // pRankColor = '#1451a1';
      status = '完工';
      img = maintenanceCompleted;
      pClassName = 'maintenance_completed';
      break;
    case false:
      // pRankColor = '#0A7B24';
      status = '工事中';
      img = maintenanceStarted;
      pClassName = 'maintenance_started';
      break;
  }

  const row2Contents = (
    <>
      <Button
        color="secondary"
        size="md"
        onClick={() => dispatch(push(`${RoutingPath.maintenanceDetail}/${maintenance.id}`))}
      >メンテナンス詳細
      </Button>

      <Button
        color="secondary"
        size="md"
        onClick={() => dispatch(DialogActions.push({
          title: MaintenanceEditDialogTitle.update,
          element: <MaintenanceEditSP
            mode="update"
            id={maintenance.id}
          />,
        }))}
      >メンテナンス編集
      </Button>
    </>
  );

  return (
    <div className="maintenance_info_window_sp info_window" ref={ele}>
      <div className="info_window_arrow_btn" onClick={handleClickArrow}>
        <i className={`fas fa-angle-double-${!detailFlag ? 'up' : 'down'}`} />
      </div>
      <IconButton
        title="閉じる"
        fontAwesomeClass="fas fa-times"
        className="default info_window_close_btn"
        onClick={callBack}
      />

      {detailFlag ? (

        /* ===================== 詳細表示 ===================== */
        <div className="info_window_info detail">

          <div className="info_window_info_row row1">
            <div className="row1_col1">
              <div className="important">
                テスト
                {/* {maintenance.name} */}
              </div>
              <div className="row_table_style">
                <div className="t_row">
                  <div className="t_header">顧客名</div>
                  <div className="t_body">
                    {maintenance.customer_name} {/* `(${maintenance.furigana})`*/}
                  </div>
                </div>
                <div className="t_row">
                  <div className="t_header">住所</div>
                  <div className="t_body">
                    〒{joinStr(maintenance.post_no, 3, '-') || '---'}<br />
                    {'' || '---'}
                  </div>
                </div>
                <div className="t_row">
                  <div className="t_header">現場名称</div>
                  <div className="t_body">{'' || '---'}</div>
                </div>

                <div className="t_row">
                  <div className="t_header">TEL</div>
                  <div className="t_body">{maintenance?.tel_no || '---'}</div>
                  <div>
                    <IconButton
                      fontAwesomeClass="fas fa-phone"
                      onClick={handleClickTel}
                      size="md"
                      color="secondary"
                      disabled={!maintenance?.tel_no}
                    />
                  </div>
                </div>

                <div className="t_row">
                  <div className="t_header">FAX</div>
                  <div className="t_body">{'' || '---'}</div>
                </div>

                <div className="t_row">
                  <div className="t_header">工事部位</div>
                  <div className="t_body">{'キッチン/洗面所/塗装' || '---'}</div>
                </div>

                <div className="t_row">
                  <div className="t_header">案件担当店舗</div>
                  <div className="t_body">{'' || '---'}</div>
                </div>

                <div className="t_row">
                  <div className="t_header">案件担当者</div>
                  <div className="t_body">{'' || '---'}</div>
                </div>
              </div>
            </div>

            <div className="row1_col2 ">
              <div className="thumb">
                {/* FIXME 仮 */}
                <StreetViewImg isShow={index < 3} lat={maintenance.lat} lng={maintenance.lng} />
              </div>
              <ShowTypeLabel
                label={status}
                showTypeImg={img}
                className={pClassName}
              />
              {/* <RectLabel label={status} bgColor={pRankColor} />*/}
              {/* eslint-disable-next-line no-constant-condition */}
              <RectLabel label={'' || 'ランクなし'} bgColor={true ? cRankColor : 'gray'} />

            </div>
          </div>

          <div className="info_window_info_row row2">
            {row2Contents}
          </div>
        </div>
      ) : (
        /* ===================== 簡易表示 ===================== */
        <div className="info_window_info simple">
          <div className="info_window_info_row row1">
            <div className="row1_col1">
              <div className="important">
                テスト
                {/* {maintenance.name} */}
              </div>
              <div className="row_table_style">
                <div className="t_row">
                  <div className="t_header">顧客名</div>
                  <div className="t_body">
                    {maintenance.customer_name} {/* `(${maintenance.furigana})`*/}
                  </div>
                </div>
                <div className="t_row">
                  <div className="t_header">住所</div>
                  <div className="t_body">
                    〒{joinStr(maintenance.post_no, 3, '-') || '---'}<br />
                    {'' || '---'}
                  </div>
                </div>

                <div className="t_row">
                  <div className="t_header">TEL</div>
                  <div className="t_body">{maintenance.tel_no || '---'}</div>
                  <div>
                    <IconButton
                      fontAwesomeClass="fas fa-phone"
                      onClick={handleClickTel}
                      size="md"
                      color="secondary"
                      disabled={!maintenance?.tel_no}
                    />
                  </div>
                </div>

                <div className="t_row">
                  <div className="t_header">案件担当者</div>
                  <div className="t_body">{'' || '---'}</div>
                </div>
              </div>

            </div>

            <div className="row1_col2 ">
              <div className="thumb">
                {/* FIXME 仮 */}
                <StreetViewImg isShow={index < 3} lat={maintenance.lat} lng={maintenance.lng} />
              </div>
              <ShowTypeLabel
                label={status}
                showTypeImg={img}
                className={pClassName}
              />
              {/* <RectLabel label={status} bgColor={pRankColor} />*/}
              {/*  eslint-disable-next-line no-constant-condition */}
              <RectLabel label={'' || 'ランクなし'} bgColor={true ? cRankColor : 'gray'} />

            </div>

          </div>

          <div className="info_window_info_row row2">
            {row2Contents}
          </div>

        </div>
      )}

      <div className="info_window_footer">
        <Button className="icon_btn" color="primary" size="sm" onClick={handleClickTel} disabled={!maintenance.tel_no}>
          <i className="fas fa-phone" />
        </Button>
        <Button className="icon_btn" color="primary" size="sm" onClick={handleClickLine}>
          <i className="fab fa-line" />
        </Button>
        <Button color="primary" size="md" onClick={handeleClickHere}>ここへ行く</Button>
      </div>
    </div>
  );
};
