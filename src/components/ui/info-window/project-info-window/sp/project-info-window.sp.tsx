/* eslint-disable no-irregular-whitespace */
import { push } from 'connected-react-router';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { MapActions } from '../../../../../redux/map/map.action';
import { RoutingPath } from '../../../../../routes/routing-pass';
import { ProjectListType } from '../../../../../type/project/project.type';
import { joinStr } from '../../../../../utilities/join-str';
import { noPinch } from '../../../../../utilities/no-pinch';
import { openLineMessage } from '../../../../../utilities/open-link';
import { openTel } from '../../../../../utilities/open-tel';
import { ProjectEditSP } from '../../../../sp/pages/project/edit/project-edit.sp';
import { ProjectEditDialogTitle } from '../../../../sp/pages/project/edit/project-edit.type.sp';
import { Button } from '../../../button/button';
import { RectLabel } from '../../../label/rect-label/rect-label';
import projectUncontracted from '../../../../../asset/images/icon_project_uncontracted.svg';
import projectConstruction from '../../../../../asset/images/icon_project_construction.svg';
import projectOb from '../../../../../asset/images/icon_project_ob.svg';
import { ShowTypeLabel } from '../../../label/show-type/show-type-label';
import { IconButton } from '../../../button/icon-button/icon-button';
import './project-info-window.sp.scss';
import { StreetViewImg } from '../../../street-view-img/street-view-img';
import { SupportHistoryEditDialogTitle } from '../../../../sp/pages/support-history/edit/support-history-edit.type';
import { SupportHistoryEditSP } from '../../../../sp/pages/support-history/edit/support-history-edit.sp';
import { RouteDialog } from '../../../../dialogs/route-dialog/route-dialog';

type project_info_window_spProps = {
  project: ProjectListType;
  callBack: () => void;
  callbackRegist?: (v: ProjectListType) => void;
  index: number;
  label?: string;
};

export const ProjectInfoWindowSP = (props: project_info_window_spProps) => {
  const {
    project, callBack, callbackRegist, index, label,
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

  const handleClickSupportHistory = useCallback(() => {
    if (callbackRegist) {
      callbackRegist(project);
    }
  }, [dispatch, callbackRegist, project]);

  const handleClickTel = useCallback(() => {
    dispatch(DialogActions.pushMessage({
      title: '',
      message: [`${project.customer_name}宛に電話をかけます`],
      label: 'はい',
      isCancel: true,
      cancelLabel: 'いいえ',
      callback: () => {
        dispatch(DialogActions.push({
          title: SupportHistoryEditDialogTitle.add,
          element: <SupportHistoryEditSP
            mode="add"
            projectData={project}
          />,
        }));
        openTel({ tel: project.field_tel_no });
      },
    }));
  }, [project]);

  const handleClickLine = useCallback(() => {
    openLineMessage(`/#${RoutingPath.projectDetail}/${project.id}`);
  }, [project.id]);

  const handeleClickHere = useCallback(() => {
    dispatch(MapActions.setGpsStatus('out'));
    dispatch(DialogActions.push({
      title: 'ルート設定',
      element: <RouteDialog
        type="customer"
        destination={project.field_place}
        callback={() => { }}
      />,
    }));
  }, [project.lat, project.lng]);

  useEffect(() => {
    const pinchCallback = noPinch(ele.current);
    return pinchCallback;
  }, [ele]);

  /* TODO 後で消す */
  // let cRankColor = '#1451a1';
  // let pRankColor = '#1451a1';
  let status = '';
  let img = '';
  let pClassName = '';
  /*
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
  */
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

  return (
    <div className={`project_info_window_sp info_window ${callbackRegist ? 'in_dialog' : ''}`} ref={ele}>
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
                {project.name}
              </div>
              <div className="row_table_style">
                <div className="t_row">
                  <div className="t_header">顧客名</div>
                  <div className="t_body">
                    {project.customer_name || '---'}{/* （{project.furigana || '---'}）*/}
                  </div>
                </div>
                <div className="t_row">
                  <div className="t_header">住所</div>
                  <div className="t_body">
                    〒{joinStr(project.post_no, 3, '-') || '---'}<br />
                    {project.field_place || '---'}
                  </div>
                </div>
                <div className="t_row">
                  <div className="t_header">現場名称</div>
                  <div className="t_body">{project.name || '---'}</div>
                </div>
                <div className="t_row">
                  <div className="t_header">TEL</div>
                  <div className="t_body">{project.field_tel_no || '---'}</div>
                  <div>
                    <IconButton
                      fontAwesomeClass="fas fa-phone"
                      onClick={handleClickTel}
                      size="md"
                      color="secondary"
                      disabled={!project.field_tel_no}
                    />
                  </div>
                </div>

                <div className="t_row">
                  <div className="t_header">FAX</div>
                  <div className="t_body">{project.field_fax_no || '---'}</div>
                </div>

                <div className="t_row">
                  <div className="t_header">工事部位</div>
                  <div className="t_body">{'キッチン/洗面所/塗装' || '---'}</div>
                </div>

                <div className="t_row">
                  <div className="t_header">案件担当店舗</div>
                  <div className="t_body">{project.project_store_name || '---'}</div>
                </div>

                <div className="t_row">
                  <div className="t_header">案件担当者</div>
                  <div className="t_body">{project.project_representative_name || '---'}</div>
                </div>
              </div>
            </div>

            <div className="row1_col2 ">
              <div className="thumb">
                {/* FIXME 仮 */}
                <StreetViewImg isShow={index < 3} lat={project.lat} lng={project.lng} />
              </div>
              <ShowTypeLabel
                label={status}
                showTypeImg={img}
                className={pClassName}
              />
              {/* <RectLabel label={status} bgColor={pRankColor} />*/}
              {/* <RectLabel
                label={project.project_rank_name || 'ランクなし'}
                bgColor={project.project_rank_name ? cRankColor : 'gray'}
              />*/}
              <RectLabel
                label={project.project_rank_name || 'ランクなし'}/* ★顧客ランク略称abbreviation */
                bgColor={project.project_rank_name ? 'gray' : 'gray'}/* ★TODO 背景色（background_color）*/
                color={project.project_rank_name ? '#FFF' : '#FFF'}
              />
            </div>
          </div>

          <div className="info_window_info_row row2">
            <Button
              color="secondary"
              size="md"
              onClick={() => {
                dispatch(push(`${RoutingPath.projectDetail}/${project.id}`));
              }}
            >案件詳細
            </Button>

            <Button
              color="secondary"
              size="md"
              onClick={() => dispatch(DialogActions.push({
                title: ProjectEditDialogTitle.update,
                element: <ProjectEditSP mode="update" projectID={project.id} />,
              }))}
            >案件編集
            </Button>
          </div>
        </div>
      ) : (
        /* ===================== 簡易表示 ===================== */
        <div className="info_window_info simple" style={callbackRegist && { paddingTop: 0 }}>
          <div className="info_window_info_row row1">
            <div className="row1_col1" style={callbackRegist && { paddingTop: '0.75rem' }}>
              <div className="important">
                {project.name}
              </div>
              <div className="row_table_style">
                <div className="t_row">
                  <div className="t_header">顧客名</div>
                  <div className="t_body">
                    {project.customer_name} {/* `(${project.furigana})`*/}
                  </div>
                </div>
                <div className="t_row">
                  <div className="t_header">住所</div>
                  <div className="t_body">
                    〒{joinStr(project.post_no, 3, '-') || '---'}<br />
                    {project.field_place || '---'}
                  </div>
                </div>
                <div className="t_row">
                  <div className="t_header">TEL</div>
                  <div className="t_body">{project.field_tel_no || '---'}</div>
                  <div>
                    <IconButton
                      fontAwesomeClass="fas fa-phone"
                      onClick={handleClickTel}
                      size="md"
                      color="secondary"
                      disabled={!project.field_tel_no}
                    />
                  </div>
                </div>

                <div className="t_row">
                  <div className="t_header">案件担当者</div>
                  <div className="t_body">{project.project_representative_name || '---'}</div>
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

              <div className="thumb">
                {/* FIXME 仮 */}
                <StreetViewImg isShow={index < 3} lat={project.lat} lng={project.lng} />
              </div>
              <ShowTypeLabel
                label={status}
                showTypeImg={img}
                className={pClassName}
              />
              {/* <RectLabel label={status} bgColor={pRankColor} />*/}
              {/*
               <RectLabel
                label={project.project_rank_name || 'ランクなし'}
                bgColor={project.project_rank_name ? cRankColor : 'gray'} />
               */}
              <RectLabel
                label={project.project_rank_name || 'ランクなし'}/* ★顧客ランク略称abbreviation */
                bgColor={project.project_rank_name ? 'gray' : 'gray'}/* ★TODO 背景色（background_color）*/
                color={project.project_rank_name ? '#FFF' : '#FFF'}
              />
            </div>
          </div>

          {!callbackRegist
            && (
              <div className="info_window_info_row row2">
                <Button
                  color="secondary"
                  size="md"
                  onClick={() => dispatch(push(`${RoutingPath.projectDetail}/${project.id}`))}
                >案件詳細
                </Button>

                <Button
                  color="secondary"
                  size="md"
                  onClick={() => dispatch(DialogActions.push({
                    title: ProjectEditDialogTitle.update,
                    element: <ProjectEditSP mode="update" projectID={project.id} />,
                  }))}
                >案件編集
                </Button>
              </div>
            )}

        </div>
      )}

      <div className="info_window_footer">
        {!callbackRegist
          && (
            <>
              <Button className="icon_btn" color="primary" size="sm" onClick={handleClickTel} disabled={!project.field_tel_no}>
                <i className="fas fa-phone" />
              </Button>
              <Button className="icon_btn" color="primary" size="sm" onClick={handleClickLine}>
                <i className="fab fa-line" />
              </Button>
              <Button color="primary" size="md" onClick={handeleClickHere}>ここへ行く</Button>
            </>
          )}
        {callbackRegist
          && <Button color="primary" size="md" onClick={handleClickSupportHistory}>{label || '対応登録'}</Button>}
      </div>
    </div>
  );
};
