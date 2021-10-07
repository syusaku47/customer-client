import './project.pc.scss';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, replace } from 'connected-react-router';
import { isEqual } from 'lodash';
import { BasePagePC } from '../base.page.pc';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { ProjectSearchBox } from '../../layout/search-box/project/project-search-box';
import { ProjectMapListPC } from '../../layout/body/map/map-list/project/project-map-list';
import { ProjectListPC } from '../../layout/body/list/project-list/project-list.pc';
import { RoutingPath } from '../../../../routes/routing-pass';
import { useQuery } from '../../../../hooks/use-query';
import { useWillUnMount } from '../../../../hooks/life-cycle';
import { ProjectActions } from '../../../../redux/project/project.action';
import { ProjectAdd } from './add/project-add';
import { TableSort, Limit } from '../../../ui/table/table-sort/table-sort';
import { State } from '../../../../redux/root.reducer';
import { ProjectListType, ProjectSortState } from '../../../../type/project/project.type';
import { MapActions } from '../../../../redux/map/map.action';

export const ProjectPC = () => {
  const dispatch = useDispatch();
  const shoType = useQuery('type');
  const [showType, setShowType] = useState<'map' | 'list'>('map');
  const list = useSelector((state: State) => (state.project.list), isEqual);
  const listHitCount = useSelector((state: State) => (state.project.listHitCount), isEqual);
  const sortState = useSelector((state: State) => state.project.sort, isEqual);

  /** 1:未契約 2:工事中 3:完工 */
  const [projectShowType, setProjectShowType] = useState<0 | 1 | 2 | 3>(0);
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState(false);
  // eslint-disable-next-line
  const [selectData, setSelectData] = useState<ProjectListType[]>([]);

  /* Callback */

  const getList = useCallback((v?:ProjectSortState) => {
    const sortData = v || sortState;
    dispatch(ProjectActions.api.project.getList({
      customer_prefecture: sortData.customer_prefecture,
      sales_contact: sortData.sales_contact,
      field_place: sortData.field_place,
      name: sortData.name,
      field_name: sortData.field_name,
      field_tel_no: sortData.field_tel_no,
      customer_name: sortData.customer_name,
      sales_shop: sortData.sales_shop,
      construction_parts: sortData.construction_parts?.getSendData(),
      construction_status: sortData.construction_status?.getSendData(),
      limit: showType === 'map' ? 99999 : sortData.limit,
      sort_by: showType === 'map' ? 2 : sortState.sort_by,
      highlow: showType === 'map' ? 1 : sortState.highlow,
      offset: showType === 'map' ? 0 : sortState.offset,
    }));
  }, [showType, sortState]);

  const handleClickRegistration = useCallback(() => {
    dispatch(DialogActions.push({
      title: '案件登録',
      className: 'max_height_dialog',
      element: <ProjectAdd callback={getList} />,
    }));
  }, []);

  const handleChangePagination = useCallback((offset: number, limit: Limit) => {
    dispatch(ProjectActions.setSort({ offset, limit }));
  }, []);

  useEffect(() => {
    const mapType = (shoType || 'map');
    const path = `${RoutingPath.project}?type=`;
    dispatch(replace(path + mapType));
    setShowType(mapType === 'map' ? 'map' : 'list');
  }, [shoType]);

  useWillUnMount(() => {
    dispatch(ProjectActions.setSort(null));
    dispatch(ProjectActions.setList([]));
  });

  useEffect(() => {
    getList();
  }, [sortState.offset, sortState.sort_by, sortState.limit, sortState.highlow]);

  useEffect(() => {
    if (!isSearch || !list.length) return;
    dispatch(MapActions.setCenterPos({
      lat: Number(list[0].lat), lng: Number(list[0].lng),
    }));
  }, [list]);

  return (
    <BasePagePC>
      <div id="project" className={`cnt_area ${searchIsOpen ? 'detail_on' : ''}`}>
        <div className="inner">
          <ProjectSearchBox
            callback={() => {
              getList();
              setIsSearch(true);
            }}
            openCallback={setSearchIsOpen}
          />
          <div className="MapPC__body__map" />
          {showType === 'map'
            ? (
              <ProjectMapListPC
                type={projectShowType}
                callback={(type) => setProjectShowType(type)}
                callbackGetList={getList}
              />
            )
            : (
              <>
                <TableSort
                  page={sortState.offset ?? 0}
                  limit={sortState.limit as Limit}
                  hitCount={listHitCount}
                  callback={handleChangePagination}
                />
                <ProjectListPC
                  callbackSelect={setSelectData}
                />
                <TableSort
                  className="bottom"
                  page={sortState.offset ?? 0}
                  limit={sortState.limit as Limit}
                  hitCount={listHitCount}
                  callback={handleChangePagination}
                />
              </>
            )}
          <div />
        </div>
      </div>
      <footer className="btn_area">
        <div className="left_box">
          <LeftIconButton
            label="案件新規登録"
            size="md"
            fontAwesomeClass="fas fa-edit"
            className="btn_search for_detail"
            color="primary"
            onClick={handleClickRegistration}
          />
          <LeftIconButton
            label="CSV出力"
            size="md"
            fontAwesomeClass="fas fa-file-csv"
            className="btn_search for_detail"
            color="primary"
            onClick={() => dispatch(DialogActions.pushReady())}
          />
        </div>
        <div className="right_box">
          <LeftIconButton
            fontAwesomeClass={`${showType === 'map' ? 'fas fa-list' : 'fas fa-map'}`}
            label={showType === 'map' ? 'リスト表示' : '地図表示'}
            size="md"
            color="primary"
            className="btn_search for_detail"
            onClick={() => {
              const path = `${RoutingPath.project}?type=${showType === 'map' ? 'list' : 'map'}`;
              dispatch(replace(path));
              setShowType(showType === 'map' ? 'list' : 'map');
            }}
          />
          <LeftIconButton
            label="戻る"
            fontAwesomeClass="fas fa-arrow-left"
            size="md"
            color="dark"
            onClick={() => dispatch(goBack())}
          />
        </div>
      </footer>
    </BasePagePC>
  );
};
