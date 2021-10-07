import './maintenance.pc.scss';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, replace } from 'connected-react-router';
import { useCallback, useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { useParams } from 'react-router-dom';
import { BasePagePC } from '../base.page.pc';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { RoutingPath } from '../../../../routes/routing-pass';
import { MaintenanceEditPC } from './edit/maintenance-edit.pc';
import { MaintenanceSearchBoxPC } from '../../layout/search-box/maintenance/maintenance-search-box.pc';
import { MaintenanceListPC } from '../../layout/body/list/maintenance-list/maintenance-list.pc';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { useWillUnMount } from '../../../../hooks/life-cycle';
import { MaintenanceActions } from '../../../../redux/maintenance/maintenance.action';
import { State } from '../../../../redux/root.reducer';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { useQuery } from '../../../../hooks/use-query';
import { MaintenanceMapListPC } from '../../layout/body/map/map-list/maintenance/maintenance-map-list';
import { MaintenanceSortState } from '../../../../type/maintenance/maintenance.type';
import { MapActions } from '../../../../redux/map/map.action';

export const MaintenancePC = () => {
  const { id } = useParams<{id:string}>();
  /* Hooks */
  const shoType = useQuery('type');
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.maintenance.sort), isEqual);
  const list = useSelector((state: State) => (state.maintenance.list), isEqual);

  /* State */
  const [maintenanceShowType, setMaintenanceShowType] = useState<0 | 1 | 2>(0);
  const [showType, setShowType] = useState<'map' | 'list'>('map');
  // eslint-disable-next-line
  const [selected, setSelected] = useState<number[]>([]);
  const [selectId, setSelectId] = useState<number | undefined>(undefined);
  const [isSearch, setIsSearch] = useState(false);

  /* Callback */
  const handleClickNew = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: 'メンテナンス情報入力',
        className: 'maintenance',
        element: <MaintenanceEditPC mode="add" />,
        onCloseClick: () => {
          dispatch(replace(RoutingPath.maintenance));
        },
      }));
    }, [],
  );

  const getList = useCallback((v?: MaintenanceSortState) => {
    const sortData = v || sortState;
    dispatch(MaintenanceActions.api.maintenance.getList({
      param: {
        ...sortData,
        maintenance_date: sortData?.maintenance_date
          ? DateFormatter.date2str(sortData.maintenance_date) : undefined,
        maintenance_date_start: sortData?.maintenance_date_start
          ? DateFormatter.date2str(sortData.maintenance_date_start) : undefined,
        maintenance_date_end: sortData?.maintenance_date_end
          ? DateFormatter.date2str(sortData.maintenance_date_end) : undefined,
        completion_date_start: sortData?.completion_date_start
          ? DateFormatter.date2str(sortData.completion_date_start) : undefined,
        completion_date_end: sortData?.completion_date_end
          ? DateFormatter.date2str(sortData.completion_date_end) : undefined,
        construction_date: sortData?.construction_date
          ? DateFormatter.date2str(sortData.construction_date) : undefined,
        completion_date: sortData?.completion_date
          ? DateFormatter.date2str(sortData.completion_date) : undefined,
        supported_date: sortData?.supported_date
          ? DateFormatter.date2str(sortData.supported_date) : undefined,
        is_muko: sortData.is_muko ? 1 : 0,
        limit: showType === 'map' ? 9999 : sortData.limit,
      },
    }));
    setSelected([]);
  },
  [sortState]);

  useEffect(() => {
    if (!selectId) return;
    dispatch(DialogActions.push({
      title: 'メンテナンス情報入力',
      className: 'maintenance',
      element: <MaintenanceEditPC mode="update" id={Number(selectId)} />,
      onCloseClick: () => {
        dispatch(replace(`${RoutingPath.maintenance}?type=list`));
      },
    }));
  }, [selectId, showType]);

  useEffect(() => {
    getList();
  }, [sortState.highlow, sortState.sort_by]);

  useWillUnMount(() => {
    dispatch(MaintenanceActions.setSort(null));
  });

  useEffect(() => {
    setSelectId(id ? Number(id) : undefined);
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(replace(`${RoutingPath.maintenanceDetail}/${id}?type=list`));
      setShowType('list');
      return;
    }
    const mapType = (shoType || 'map');
    const path = `${RoutingPath.maintenance}?type=`;
    dispatch(replace(path + mapType));
    setShowType(mapType === 'map' ? 'map' : 'list');
  }, [shoType, id]);

  useEffect(() => {
    if (!isSearch || !list.length) return;
    dispatch(MapActions.setCenterPos({
      lat: Number(list[0].lat), lng: Number(list[0].lng),
    }));
  }, [list]);

  return (
    <BasePagePC className="MaintenancePC">
      <div id="maintenance" className="cnt_area">
        <div className="inner">
          <MaintenanceSearchBoxPC
            callback={() => {
              getList();
              setIsSearch(true);
            }}
          />
          {showType === 'map'
            ? (
              <MaintenanceMapListPC
                type={maintenanceShowType}
                callbackType={(type) => setMaintenanceShowType(type)}
              />
            )
            : (
              <MaintenanceListPC
                callbackSelected={setSelected}
                selectId={selectId}
              />
            )}
        </div>
      </div>
      <footer className="btn_area">
        <div className="left_box">
          <LeftIconButton
            label="新規登録"
            size="md"
            fontAwesomeClass="fas fa-edit"
            className="btn_search for_detail"
            color="primary"
            onClick={handleClickNew}
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
            label={`${showType === 'map' ? 'リスト表示' : '地図表示'}`}
            size="md"
            className="btn_search for_detail"
            color="primary"
            onClick={() => {
              const path = `${RoutingPath.maintenance}?type=${showType === 'map' ? 'list' : 'map'}`;
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
