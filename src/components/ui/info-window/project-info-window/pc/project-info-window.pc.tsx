/* eslint-disable no-irregular-whitespace */
import {
  useCallback,
} from 'react';
import './project-info-window.pc.scss';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton } from '../../../button/icon-button/icon-button';
import { Button } from '../../../button/button';
import { ProjectListType } from '../../../../../type/project/project.type';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { MapActions } from '../../../../../redux/map/map.action';
import { joinStr } from '../../../../../utilities/join-str';
import { RectLabel } from '../../../label/rect-label/rect-label';
import projectUncontracted from '../../../../../asset/images/icon_project_uncontracted.svg';
import projectConstruction from '../../../../../asset/images/icon_project_construction.svg';
import projectOb from '../../../../../asset/images/icon_project_ob.svg';
import { ShowTypeLabel } from '../../../label/show-type/show-type-label';
import { StreetViewImg } from '../../../street-view-img/street-view-img';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { RouteDialog } from '../../../../dialogs/route-dialog/route-dialog';

type ProjectInfoWindowProps = {
  project: ProjectListType;
  callbackRegist?: (v: ProjectListType) => void;
  callbackClose: () => void;
  index: number;
  label?: string;
};

export const ProjectInfoWindowPC = (props: ProjectInfoWindowProps) => {
  const {
    project, callbackRegist, callbackClose, index, label,
  } = props;

  const dispatch = useDispatch();

  const handleClickDetail = useCallback(() => {
    dispatch(push(`${RoutingPath.projectDetail}/${project.id}/project`));
  }, [project.id]);

  const handleClickHere = useCallback(() => {
    dispatch(MapActions.setGpsStatus('out'));
    dispatch(DialogActions.push({
      title: 'ルート設定',
      element: <RouteDialog
        type="project"
        destination={project.field_place}
        callback={() => { }}
      />,
    }));
  }, [project]);

  /* TODO 後で消す */
  let cRankColor = '#1451a1';
  // const pRankColor = '#1451a1';
  let status = '';
  let img = '';
  let pClassName = '';
  switch (project.project_rank_name) {
    case 'プラチナ':
    default:
      cRankColor = '#d06d8c';
      break;
    case 'ゴールド':
      cRankColor = '#b8b2d6';
      break;
    case 'シルバー':
      cRankColor = '#6bb6bb';
      break;
    case 'ブロンズ':
      cRankColor = '#f9a743';
      break;
  }
  switch (project.koji_flag) {
    case 3:
    default:
      // pRankColor = '#1451a1';
      status = '完工';
      img = projectOb;
      pClassName = 'project_ob';
      break;
    case 2:
      // pRankColor = '#0A7B24';
      status = '工事中';
      img = projectConstruction;
      pClassName = 'project_construction';
      break;
    case 1:
      // pRankColor = '#D24444';
      status = '未契約';
      img = projectUncontracted;
      pClassName = 'project_uncontracted';
      break;
  }

  const handleClickSupportHistory = useCallback(() => {
    if (callbackRegist) {
      callbackRegist(project);
    }
  }, [callbackRegist]);

  return (
    <div className="card">
      <div className="name">{project.name || '---'}</div>
      <div className="card_base_row">
        <div className="col">
          <div className="sub_name">
            <i className="fas fa-user" title="顧客名" />
            <Link to={`${RoutingPath.customerDetail}/${project.customer_id}`}>
              {project.customer_name || '---'}{/* （{project.furigana || '---'}）*/}
              <i className="fas fa-link ml_10" title={project.customer_name || '---'} />
            </Link>
          </div>
          <div className="address_box">
            <i className="fas fa-map-marker-alt" title="住所" />
            <div>
              <div className="post_no">
                〒{joinStr(project.post_no, 3, '-') || '---'}
                <IconButton
                  title="ルートを表示する"
                  fontAwesomeClass="fas fa-route"
                  className="secondary"
                  onClick={handleClickHere}
                // disabled
                />
              </div>
              <div className="address">{project.field_place || '---'}</div>
            </div>
          </div>
          <div className="tell"><i className="fas fa-phone" title="TEL" />{project.field_tel_no || '---'}</div>
          <div className="sales_contact"><i className="fas fa-user-circle" title="案件担当者" />{project.project_representative_name || '---'}</div>
        </div>
        <div className="label_box">
          <ShowTypeLabel
            label={status}
            showTypeImg={img}
            className={pClassName}
          />
          {/* <RectLabel label={status} bgColor={pRankColor} />*/}

          <RectLabel
            label={project.project_rank_name || 'ランクなし'}/* ★案件ランク略称abbreviation */
            bgColor={project.project_rank_name ? cRankColor : 'gray'}/* ★TODO 背景色（background_color）*/
            color={project.project_rank_name ? '#FFF' : '#FFF'}/* ★TODO 文字色（text_color） */
          />
          <div className="google">
            {/* FIXME 仮 */}
            <StreetViewImg isShow={index < 3} lat={project.lat} lng={project.lng} />
          </div>
        </div>
      </div>
      <div className="btn_box">
        {!callbackRegist
          ? <Button className="sm primary" onClick={handleClickDetail}>案件詳細</Button>
          : <Button className="sm primary" onClick={handleClickSupportHistory}>{label || '対応登録'}</Button>}
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
