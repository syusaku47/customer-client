/* eslint-disable no-irregular-whitespace */
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import projectConstruction from '../../../../asset/images/icon_project_construction.svg';
import projectOb from '../../../../asset/images/icon_project_ob.svg';
import projectUncontracted from '../../../../asset/images/icon_project_uncontracted.svg';
import { MapActions } from '../../../../redux/map/map.action';
import { ProjectListType } from '../../../../type/project/project.type';
import { changeString } from '../../../../utilities/change-string';
import { joinStr } from '../../../../utilities/join-str';
import { MathHelper } from '../../../../utilities/math-helper';
import { RectLabel } from '../../label/rect-label/rect-label';
import { ShowTypeLabel } from '../../label/show-type/show-type-label';
import './project-card.scss';
import { UserAgent } from '../../../../utilities/user-agent';
import { StreetViewImg } from '../../street-view-img/street-view-img';

type Props = {
  onClick: (id: number) => void,
  projectData: ProjectListType,
  className?: string,
  isInCustomerDetail?: boolean;
  index: number,
}

export const ProjectCard = (props: Props) => {
  const {
    onClick, projectData, className, isInCustomerDetail, index,
  } = props;

  /* Hook */
  const dispatch = useDispatch();

  /* Callback */
  const handleClickProjectDetail = useCallback(
    () => {
      onClick(projectData.id);
      dispatch(MapActions.setGpsStatus('out'));
      dispatch(MapActions.setZoomLevel(20));
    }, [onClick, projectData.id],
  );

  /* TODO 後で消す */
  let cRankColor = '#1451a1';
  // let pRankColor = '#1451a1';
  let status = '';
  let img = '';
  let pClassName = '';
  switch (projectData.project_rank_name) {
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
  switch (projectData.koji_flag) {
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
    <>
      {UserAgent === 'sp'
        ? (
          <div className={`project_card ${UserAgent} card_base ${className || ''}`} onClick={handleClickProjectDetail}>
            <div className="card_base_row">
              <div className="card_base_row__col_left">

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    案件名
                  </div>
                  <div className="card_info_item__text important">
                    {`${projectData.name || '---'}`}
                  </div>
                </div>

                {!isInCustomerDetail && (
                  <>
                    <div className="card_info_item">
                      <div className="card_info_item__head">
                        顧客名
                      </div>
                      <div className="card_info_item__text emphasis">
                        {`${projectData.customer_name || '---'}`/* （${projectData.furigana || '---'}）*/}
                      </div>
                    </div>

                    <div className="card_info_item">
                      <div className="card_info_item__head">
                        住所
                      </div>
                      <div className="card_info_item__text">
                        {`〒${joinStr(projectData.post_no, 3, '-') || '---'}`}<br />
                        {projectData.field_place || '---'}
                      </div>
                    </div>
                  </>
                )}

                {/* <div className="card_info_item">
                  <div className="card_info_item__head">
                    TEL
                  </div>
                  <div className="card_info_item__text">
                    {projectData.field_tel_no || '---'}
                  </div>
                </div> */}

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    担当者
                  </div>
                  <div className="card_info_item__text">
                    {projectData.project_representative_name || '---'}
                  </div>
                </div>

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    受注金額
                  </div>
                  <div className="card_info_item__text">
                    {projectData.order_price ? `¥ ${MathHelper.localStr(projectData.order_price)}` : '---'}
                  </div>
                </div>

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    着工日
                  </div>
                  <div className="card_info_item__text">
                    {changeString(projectData.construction_date, '/') || '---'}
                  </div>
                </div>

                <div className="card_info_item">
                  <div className="card_info_item__head">
                    完工日
                  </div>
                  <div className="card_info_item__text">
                    {changeString(projectData.complete_date, '/') || '---'}
                  </div>
                </div>

                {/* {projectData.failure_date && ( */}
                <div className="card_info_item">
                  <div className="card_info_item__head">
                    失注日
                  </div>
                  <div className="card_info_item__text">
                    {changeString(projectData.failure_date, '/') || '---'}
                  </div>
                </div>
                {/* )} */}

                {/* {projectData.cancel_date && ( */}
                <div className="card_info_item">
                  <div className="card_info_item__head">
                    キャンセル日
                  </div>
                  <div className="card_info_item__text">
                    {changeString(projectData.cancel_date, '/') || '---'}
                  </div>
                </div>
                {/* )} */}
              </div>

              <div className="card_base_row__col_right">
                <div className="thumb google">
                  {/* FIXME 仮 */}
                  <StreetViewImg isShow={index < 3} lat={projectData.lat} lng={projectData.lng} />

                </div>

                <div>
                  <ShowTypeLabel
                    label={status}
                    showTypeImg={img}
                    className={pClassName}
                  />
                  {/*
              labelは未契約、工事中、完工
              showtypeは projectUncontracted/projectConstruction/projectOb
              classNameは　project_uncontracted/project_construction/project_ob
            */}
                  {/* <RectLabel label={status} bgColor={pRankColor} />*/}
                  <RectLabel
                    label={projectData.project_rank_name || 'ランクなし'}/* ★案件ランク略称abbreviation */
                    bgColor={projectData.project_rank_name ? cRankColor : 'gray'}/* ★TODO 背景色（background_color）*/
                    color={projectData.project_rank_name ? '#FFF' : '#FFF'}
                  />
                </div>
              </div>

            </div>
          </div>
        )
        : (
          <div className={`project_card_pc card_base ${className}`} onClick={handleClickProjectDetail}>
            <div className="row1 card_base_row">
              <div className="row1_col1 card_base_col">
                {isInCustomerDetail ? (
                  <>
                    <div className="important">{`${projectData.name || '---'}`}</div>
                    <div>
                      {`〒${joinStr(projectData.post_no, 3, '-') || '---'}`}
                    </div>
                    <div>{projectData.field_place || '---'}</div>
                  </>
                ) : (
                  <>
                    <div className="emphasis">{`${projectData.customer_name || '---'}`/* （${projectData.furigana || '---'}）*/}</div>
                    <div className="important">{`${projectData.name || '---'}`}</div>
                    <div>
                      {`〒${joinStr(projectData.post_no, 3, '-') || '---'}`}
                    </div>
                  </>
                )}
              </div>
              <div className="row1_col2">

                <ShowTypeLabel
                  label={status}
                  showTypeImg={img}
                  className={pClassName}
                />
                {/*
        labelは未契約、工事中、完工
        showtypeは projectUncontracted/projectConstruction/projectOb
        classNameは　project_uncontracted/project_construction/project_ob
        */}
                {/* <RectLabel label={status} bgColor={pRankColor} />*/}
                <RectLabel
                  label={projectData.project_rank_name || 'ランクなし'}/* ★案件ランク略称abbreviation */
                  bgColor={projectData.project_rank_name ? cRankColor : 'gray'}/* ★TODO 背景色（background_color）*/
                  color={projectData.project_rank_name ? '#FFF' : '#FFF'}
                />
              </div>
              <div className="row1_col3">
                <div className="thumb google">
                  {/* FIXME 仮 */}
                  <StreetViewImg isShow={index < 3} lat={projectData.lat} lng={projectData.lng} />
                </div>
              </div>
            </div>
            {!isInCustomerDetail && (
            <div className="card_base_row row2">
              <div className="row2_col1">{projectData.field_place || '---'}</div>
            </div>
            )}
            <div className="card_base_row row3">
              <div className="row3_col1 tel_no">TEL：{projectData.field_tel_no || '---'}</div>
              <div className="row3_col2 sales_contact">担当者：{projectData.project_representative_name || '---'}</div>
            </div>
          </div>
        )}
    </>
  );
};
