import { replace } from 'connected-react-router';
import { isEqual } from 'lodash';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWillUnMount } from '../../../../hooks/life-cycle';
import { useQuery } from '../../../../hooks/use-query';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { MaintenanceActions } from '../../../../redux/maintenance/maintenance.action';
import { State } from '../../../../redux/root.reducer';
import { RoutingPath } from '../../../../routes/routing-pass';
import { DateFormatter } from '../../../../utilities/date-formatter';
import { SetSelectedClass } from '../../../../utilities/set-selected-class';
import { BottomBorderButton } from '../../../ui/button/bottom-border/bottom-border-button';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { MapListToggleButton } from '../../../ui/button/map-list-toggle/map-list-toggle-button';
import { HorizontalCalendar } from '../../../ui/calender/horizontal/horizontal-calendar';
import { MapBase } from '../../../ui/map/map-base';
import { MaintenanceListSP } from '../../layout/body/list/maintenance/maintenance-list';
import { BasePageSP } from '../base.page.sp';
import { MaintenanceEditSP } from './edit/maintenance-edit.sp';
import { MaintenanceEditDialogTitle } from './edit/maintenance-edit.type';
import './maintenance.sp.scss';
import { MaintenanceSearchBoxSP } from './search-box/maintenance-search-box.sp';

export const MaintenanceSP = () => {
  /* Hooks */
  const shoType = useQuery('type');
  const dispatch = useDispatch();
  const sortState = useSelector((state: State) => (state.maintenance.sort), isEqual);

  /* State */
  const [maintenanceShowType, setMaintenanceShowType] = useState<0 | 1 |2>(0);
  const [showType, setShowType] = useState<'map' | 'list' | 'date'>('map');
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const [secondaryHeaderHeight, setSecondaryHeaderHeight] = useState<number>(0);
  const [selectDay, setSelectDay] = useState(new Date());

  /* Ref */
  const headerEle = useRef<HTMLDivElement>(null);
  const footerEle = useRef<HTMLDivElement>(null);
  const secondaryHeaderEle = useRef<HTMLDivElement>(null);
  const listEle = useRef<HTMLDivElement>(null);

  /* Callback */
  const getList = useCallback(() => {
    dispatch(MaintenanceActions.api.maintenance.getList({
      param: {
        ...sortState,
        maintenance_date: showType === 'date' && sortState?.maintenance_date
          ? DateFormatter.date2str(sortState.maintenance_date) : undefined,
        maintenance_date_start: sortState?.maintenance_date_start
          ? DateFormatter.date2str(sortState.maintenance_date_start) : undefined,
        maintenance_date_end: sortState?.maintenance_date_end
          ? DateFormatter.date2str(sortState.maintenance_date_end) : undefined,
        completion_date_start: sortState?.completion_date_start
          ? DateFormatter.date2str(sortState.completion_date_start) : undefined,
        completion_date_end: sortState?.completion_date_end
          ? DateFormatter.date2str(sortState.completion_date_end) : undefined,
        construction_date: sortState?.construction_date
          ? DateFormatter.date2str(sortState.construction_date) : undefined,
        completion_date: sortState?.completion_date
          ? DateFormatter.date2str(sortState.completion_date) : undefined,
        supported_date: sortState?.supported_date
          ? DateFormatter.date2str(sortState.supported_date) : undefined,
        is_muko: sortState.is_muko ? 1 : 0,
        limit: 9999,
      },
    }));
  },
  [sortState, showType]);

  const calendarScrollEle = document.getElementsByClassName('react-datepicker__month');
  const calendarDayEle = document.getElementsByClassName('react-datepicker__day--today')[0];

  /* Effect */
  useEffect(() => {
    setFooterHeight(footerEle.current?.getBoundingClientRect().height || 0);
  }, [footerEle, footerHeight]);

  useEffect(() => {
    setSecondaryHeaderHeight(secondaryHeaderEle.current?.getBoundingClientRect().height || 0);
  }, [secondaryHeaderEle, secondaryHeaderHeight, showType]);

  useEffect(() => {
    getList();
  }, [sortState.highlow, sortState.sort_by]);

  useWillUnMount(() => {
    dispatch(MaintenanceActions.setSort(null));
  });

  useEffect(() => {
    const mapType = (shoType || 'map');
    const path = `${RoutingPath.maintenance}?type=`;
    dispatch(replace(path + mapType));
    switch (mapType) {
      case 'map':
        setShowType('map');
        break;
      case 'list':
        setShowType('list');
        break;
      case 'date':
        setShowType('date');
        break;
      default:
        break;
    }
  }, [shoType]);

  useEffect(() => {
    if (calendarScrollEle.length !== 0 && calendarDayEle) {
      const today = new Date();
      const thisDate = today.getDate();
      const thisYear = today.getFullYear().toString();
      const thisMonth = today.getMonth().toString();
      const totalDays = new Date(parseInt(thisYear, 10), parseInt(thisMonth, 10), 0).getDate();
      const relativePos = totalDays / thisDate;
      const scrollPos = (
        (calendarScrollEle[0].scrollWidth / relativePos)
        - (window.innerWidth / 2)
        - calendarDayEle.clientWidth
      );
      calendarScrollEle[0].scrollTo({ left: scrollPos });
    }
  }, [calendarScrollEle, showType, calendarDayEle]);

  useEffect(() => {
    listEle.current?.scrollTo(0, -10000);
  }, [maintenanceShowType]);

  return (
    <BasePageSP
      className="maintenance_sp"
      searchBoxDialog={{
        title: '詳細検索',
        element: <MaintenanceSearchBoxSP
          callback={getList}
        />,
      }}
    >
      <div id="map_list_header" className="map_list_header" onClick={(e) => { e.preventDefault(); }} ref={headerEle}>
        <BottomBorderButton
          label="すべて"
          onClick={(e) => {
            setMaintenanceShowType(0);
            SetSelectedClass(e.currentTarget, headerEle.current);
          }}
          selected
        />
        <BottomBorderButton
          label="未対応"
          onClick={(e) => {
            setMaintenanceShowType(1);
            SetSelectedClass(e.currentTarget, headerEle.current);
          }}
        />
        <BottomBorderButton
          label="対応済"
          onClick={(e) => {
            setMaintenanceShowType(2);
            SetSelectedClass(e.currentTarget, headerEle.current);
          }}
        />
      </div>

      <div className="map_list_body" ref={listEle}>
        {showType === 'map' && (
          <MapBase
            maintenanceOption={{
              type: maintenanceShowType,
            }}
            isNowPoint
            searchOption={{}}
          />
        )}

        {showType === 'list' && (
        <MaintenanceListSP type={maintenanceShowType} showType={showType} />
        )}

        {showType === 'date' && (
        <div className="maintenance_sp__list">
          <div className="maintenance_sp__list__header" ref={secondaryHeaderEle}>
            <HorizontalCalendar
              value={selectDay}
              onChange={setSelectDay}
            />
          </div>
          <div className="maintenance_sp__list__body">
            <MaintenanceListSP type={maintenanceShowType} showType={showType} />
          </div>
        </div>
        )}
      </div>

      <div className="page_body_footer space_between" ref={footerEle}>
        <LeftIconButton
          label="メンテナンス登録"
          fontAwesomeClass="far fa-edit"
          className="btn regist"
          onClick={() => dispatch(DialogActions.push({
            title: MaintenanceEditDialogTitle.add,
            element: <MaintenanceEditSP mode="add" />,
          }))}
          size="md"
          color="primary"
        />
        <MapListToggleButton
          showType={showType}
          onClick={() => {
            let newShowType = showType;
            switch (showType) {
              case 'map':
                newShowType = 'list';
                break;
              case 'list':
                newShowType = 'date';
                break;
              case 'date':
                newShowType = 'map';
                break;
              default:
                break;
            }
            const path = `${RoutingPath.maintenance}?type=${newShowType}`;
            dispatch(replace(path));
            setShowType(newShowType);
          }}
          typeNum={3}
        />
      </div>
    </BasePageSP>
  );
};
