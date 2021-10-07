/* eslint-disable no-irregular-whitespace */
import {
  useCallback,
} from 'react';
import './maintenance-info-window.pc.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton } from '../../../button/icon-button/icon-button';
import { Button } from '../../../button/button';
import { MaintenanceList } from '../../../../../type/maintenance/maintenance.type';
import { MapActions } from '../../../../../redux/map/map.action';
import { joinStr } from '../../../../../utilities/join-str';
import { RectLabel } from '../../../label/rect-label/rect-label';
import maintenance_completed from '../../../../../asset/images/icon_maintenance_completed.svg';
import maintenance_started from '../../../../../asset/images/icon_maintenance_started.svg';
import { ShowTypeLabel } from '../../../label/show-type/show-type-label';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { MaintenanceEditPC } from '../../../../pc/pages/maintenance/edit/maintenance-edit.pc';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { RouteDialog } from '../../../../dialogs/route-dialog/route-dialog';
// import { StreetViewImg } from '../../../street-view-img/street-view-img';

type MaintenanceInfoWindowProps = {
  maintenance: MaintenanceList;
  callbackRegist?: (v: MaintenanceList) => void;
  callbackClose: () => void;
  index: number;
};

export const MaintenanceInfoWindowPC = (props: MaintenanceInfoWindowProps) => {
  const {
    maintenance, callbackRegist, callbackClose, index,
  } = props;

  const dispatch = useDispatch();

  const handleClickDetail = useCallback(() => {
    dispatch(DialogActions.push({
      title: 'メンテナンス情報入力',
      className: 'maintenance',
      element: <MaintenanceEditPC mode="update" id={maintenance.id} />,
    }));
  }, [maintenance.id]);

  const handleClickHere = useCallback(() => {
    dispatch(MapActions.setGpsStatus('out'));
    dispatch(DialogActions.push({
      title: 'ルート設定',
      element: <RouteDialog
        type="customer"
        destination={`${maintenance.customer_place}`}
        callback={() => { }}
      />,
    }));
  }, [maintenance]);

  /* TODO 後で消す */
  let cRankColor = '#1451a1';
  // const pRankColor = '#1451a1';
  // let status = '';
  // let img = '';
  // let pClassName = '';
  switch ('プラチナ') {
    case 'プラチナ':
    default:
      cRankColor = '#d06d8c';
      break;
  }

  return (
    <div className="card">
      <div className="name">{maintenance.title || '---'}</div>
      <div className="card_base_row">
        <div className="col">
          <div className="sub_name">
            <i className="fas fa-user" title="顧客名" />
            <Link to={`${RoutingPath.customerDetail}/${maintenance.customer_id}`}>
              {maintenance.customer_name || '---'}{/* （{maintenance.furigana || '---'}）*/}
              <i className="fas fa-link ml_10" title={maintenance.customer_name || '---'} />
            </Link>
          </div>
          <div className="address_box">
            <i className="fas fa-map-marker-alt" title="住所" />
            <div>
              <div className="post_no">
                〒{joinStr(maintenance.post_no, 3, '-') || '---'}
                <IconButton
                  title="ルートを表示する"
                  fontAwesomeClass="fas fa-route"
                  className="secondary"
                  onClick={handleClickHere}
                  // disabled
                />
              </div>
              <div className="address">{maintenance.customer_place || '---'}</div>
            </div>
          </div>
          <div className="tell"><i className="fas fa-phone" title="電話番号" />{maintenance.tel_no || '---'}</div>
          <div className="sales_contact"><i className="fas fa-user-circle" title="案件担当者" />{maintenance.project_representative || '---'}</div>
        </div>
        <div className="label_box">
          <ShowTypeLabel
            label={maintenance.fixed_flag === false ? '未対応' : '対応済'}
            showTypeImg={
              maintenance.fixed_flag
                === false ? maintenance_started : maintenance_completed
            }
            className={
              maintenance.fixed_flag === false ? 'maintenance_started' : 'maintenance_completed'
            }
          />
          {/* <RectLabel label={status} bgColor={pRankColor} />*/}

          <RectLabel
            label={maintenance.customer_rank_name || 'ランクなし'}/* ★案件ランク略称abbreviation */
            // eslint-disable-next-line no-constant-condition
            bgColor={maintenance.customer_rank_name ? cRankColor : 'gray'}/* ★TODO 背景色（background_color）*/
            // eslint-disable-next-line no-constant-condition
            color={maintenance.customer_rank_name ? '#FFF' : '#FFF'}/* ★TODO 文字色（text_color） */
          />
          <div className={`google ${index}`}>
            {/* FIXME 仮 */}
            {/* <StreetViewImg isShow={index < 3} lat={maintenance.lat} lng={maintenance.lng} />*/}
          </div>
        </div>
      </div>
      <div className="btn_box">
        {!callbackRegist
          && (
            <>
              <Button className="sm primary" onClick={handleClickDetail}>メンテナンス詳細</Button>
            </>
          )}
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
