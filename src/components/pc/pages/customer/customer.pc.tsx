import './customer.pc.scss';
import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { replace } from 'connected-react-router';
import cloneDeep from 'lodash/cloneDeep';
import { isEqual } from 'lodash';
import { BasePagePC } from '../base.page.pc';
import { CustomerSearchBox } from '../../layout/search-box/customer/customer-search-box';
import { CustomerMapListPC } from '../../layout/body/map/map-list/customer/customer-map-list';
import { CustomerListPC } from '../../layout/body/list/customer-list/customer-list.pc';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { useWillUnMount } from '../../../../hooks/life-cycle';
import { CustomerActions } from '../../../../redux/customer/customer.action';
import { State } from '../../../../redux/root.reducer';
import { useQuery } from '../../../../hooks/use-query';
import { RoutingPath } from '../../../../routes/routing-pass';
import { CustomerEdit } from './edit/customer-edit';
import { TableSort, Limit } from '../../../ui/table/table-sort/table-sort';
import { MapActions } from '../../../../redux/map/map.action';

export const CustomerPC = () => {
  const shoType = useQuery('type');
  const dispatch = useDispatch();
  const customerList = useSelector((state: State) => (state.customer.list), isEqual);
  const listHitCount = useSelector((state: State) => (state.customer.listHitCount), isEqual);
  const sortState = useSelector((state: State) => (state.customer.sort), isEqual);
  const mapAreaPos = useSelector((state: State) => (state.map.mapAreaPos), isEqual);
  const gpsStatus = useSelector((state: State) => (state.map.gpsStatus), isEqual);

  const [showType, setShowType] = useState<'map' | 'list'>('map');
  const [isSearch, setIsSearch] = useState(false);

  const [customerShowType, setCustomerShowType] = useState<0 | 1 | 2>(0);
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

  const getList = useCallback(() => {
    const isMap = showType === 'map';
    dispatch(CustomerActions.api.customer.getList({
      ...cloneDeep(sortState),
      tags: sortState?.tags?.getSendData(),
      parts: sortState?.parts?.getSendData(),
      is_deficiency: sortState?.is_deficiency ? 1 : 0,
      limit: isMap ? 99999 : sortState.limit,
      north_lat: isMap ? String(mapAreaPos?.n.lat) : undefined,
      north_lng: isMap ? String(mapAreaPos?.n.lng) : undefined,
      south_lat: isMap ? String(mapAreaPos?.s.lat) : undefined,
      south_lng: isMap ? String(mapAreaPos?.s.lng) : undefined,
    }));
  },
  [sortState, showType, gpsStatus, mapAreaPos]);

  const handleClickRegistration = useCallback(() => {
    let editId = NaN;
    dispatch(DialogActions.push({
      title: '顧客登録',
      className: 'max_height_dialog max_width_dialog customer',
      onCloseClick: () => {
        dispatch(CustomerActions.api.id.delete({ id: editId }));
      },
      element: <CustomerEdit
        mode="add"
        callback={() => {
          getList();
        }}
        closeCallback={(v) => { editId = v; }}
      />,
    }));
  }, [dispatch, sortState, getList]);

  useEffect(() => {
    if (!mapAreaPos && showType === 'map') return;
    getList();
  }, [sortState.highlow, sortState.sort_by, sortState.offset, sortState.limit, showType]);

  useEffect(() => {
    if (showType === 'list' || !mapAreaPos) return;
    getList();
  }, [mapAreaPos]);

  useEffect(() => {
    const mapType = (shoType || 'map');
    const path = `${RoutingPath.customer}?type=`;
    dispatch(replace(path + mapType));
    setShowType(mapType === 'map' ? 'map' : 'list');
  }, [shoType]);

  useWillUnMount(() => {
    dispatch(CustomerActions.setSort(null));
  });

  useEffect(() => {
    if (!isSearch || !customerList.length || showType === 'list') return;

    dispatch(MapActions.setCenterPos({
      lat: Number(customerList[0].lat), lng: Number(customerList[0].lng),
    }));
  }, [customerList]);

  return (
    <BasePagePC>
      <div id="customer" className={`cnt_area ${searchIsOpen ? 'detail_on' : ''}`}>
        <div className="inner">
          <CustomerSearchBox
            openCallback={setSearchIsOpen}
            callbackGetList={() => {
              setIsSearch(true);
              getList();
            }}
          />

          <div className="MapPC__body__map" />
          {showType === 'map'
            ? (
              <CustomerMapListPC
                type={customerShowType}
                callback={(type) => setCustomerShowType(type)}
              />
            )
            : (
              <>
                <TableSort
                  page={sortState.offset ?? 0}
                  limit={sortState.limit !== (100 || 200 || 300 || 400 || 500 || 9999)
                    ? 100 : sortState.limit as Limit}
                  hitCount={listHitCount}
                  callback={(page, limits) => {
                    dispatch(CustomerActions.setSort({
                      ...sortState,
                      offset: page,
                      limit: limits,
                    }));
                  }}
                />
                <CustomerListPC
                  type={customerShowType}
                  callbackSort={(highlow, sort_by) => {
                    dispatch(CustomerActions.setSort({
                      ...sortState,
                      highlow,
                      sort_by,
                    }));
                  }}
                />
                <TableSort
                  className="bottom"
                  page={sortState.offset ?? 0}
                  limit={sortState.limit !== (100 || 200 || 300 || 400 || 500 || 9999)
                    ? 100 : sortState.limit as Limit}
                  hitCount={listHitCount}
                  callback={(page, limits) => {
                    dispatch(CustomerActions.setSort({
                      ...sortState,
                      offset: page,
                      limit: limits,
                    }));
                  }}
                />
              </>
            )}
        </div>
      </div>
      <footer className="btn_area">
        <div className="left_box">
          <LeftIconButton
            label="顧客新規登録"
            size="md"
            fontAwesomeClass="fas fa-edit"
            className="btn_search for_detail"
            color="primary"
            onClick={handleClickRegistration}
          />
          <LeftIconButton
            label="CSV出力"
            size="md"
            fontAwesomeClass="fas fa-file-download"
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
              const path = `${RoutingPath.customer}?type=${showType === 'map' ? 'list' : 'map'}`;
              dispatch(replace(path));
              setShowType(showType === 'map' ? 'list' : 'map');
            }}
          />
        </div>
      </footer>
    </BasePagePC>
  );
};
