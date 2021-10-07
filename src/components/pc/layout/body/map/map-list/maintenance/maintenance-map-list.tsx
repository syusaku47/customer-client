import {
  useCallback, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as lodash from 'lodash';
import { cloneDeep } from 'lodash';
import { State } from '../../../../../../../redux/root.reducer';
import { MaintenanceList } from '../../../../../../../type/maintenance/maintenance.type';
import { Button } from '../../../../../../ui/button/button';
import { LeftIconButton } from '../../../../../../ui/button/left-icon-button/left-icon-button';
import { MapBase } from '../../../../../../ui/map/map-base';
import './maintenance-map-list.scss';
import { MapActions } from '../../../../../../../redux/map/map.action';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { LeftLabelInputField } from '../../../../../../ui/input-field/left-label-input-field/left-label-input-field';
import { MaintenanceEditPC } from '../../../../../pages/maintenance/edit/maintenance-edit.pc';
import { MaintenanceCard } from '../../../../../../ui/card/maintenance/maintenance-card';
import { useDidMount, useWillUnMount } from '../../../../../../../hooks/life-cycle';
import { InputField } from '../../../../../../ui/input-field/input-field';
import { RouteDialog } from '../../../../../../dialogs/route-dialog/route-dialog';

type Props = {
  type: 0 | 1 | 2;
  callbackType: (type: 0 | 1 | 2) => void;
}

export const MaintenanceMapListPC = (props: Props) => {
  const { type, callbackType } = props;

  /* Hooks */
  // eslint-disable-next-line
  const sortState = useSelector((state:State) => state.maintenance.sort);
  const humanPos = useSelector((state:State) => state.map.humanPos);
  const maintenanceListData = useSelector((state: State) => state.maintenance.list);
  const routeInfo = useSelector((state: State) => state.map.routeInfo);
  const dispatch = useDispatch();

  /* State */
  const [maintenance, setMaintenance] = useState<MaintenanceList | null>(null);
  const [maintenanceIndex, setMaintenanceIndex] = useState(NaN);

  const [searchValue, setSearchValue] = useState('');
  const [searchValue2, setSearchValue2] = useState('');
  const [active, setActive] = useState(NaN);

  /* List */
  const maintenanceList = useMemo(() => (
    !type ? maintenanceListData : maintenanceListData.filter(
      (v) => (v.fixed_flag ? 2 : 1) === type,
    )), [type, maintenanceListData]);

  /* Callback */
  const handleClickCard = useCallback((v: MaintenanceList) => {
    setMaintenance(lodash.cloneDeep(v));
    setActive(v.id);
    dispatch(MapActions.setCenterPos({ lat: Number(v.lat), lng: Number(v.lng) }));
  }, []);

  const handleClickSearch = useCallback(
    (inMap?:boolean) => {
      dispatch(MapActions.setGpsStatus('out'));
      dispatch(MapActions.api.geocoder({
        param: { param: { address: inMap ? searchValue2 : searchValue } },
        callback: () => {
          dispatch(DialogActions.pop());
          dispatch(MapActions.setZoomLevel(null));
        },
      }));
    },
    [searchValue, searchValue2],
  );

  const handleClickRegistration = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: 'メンテナンス情報入力',
        className: 'maintenance',
        element: <MaintenanceEditPC mode="add" />,
      }));
    }, [],
  );

  const handleClickRouteSearch = useCallback(() => {
    dispatch(MapActions.setGpsStatus('out'));
    dispatch(DialogActions.push({
      title: 'ルート設定',
      element: <RouteDialog
        type="project"
        destination={maintenance?.customer_place}
        callback={() => { }}
      />,
    }));
  }, [maintenance]);

  useDidMount(() => {
    if (humanPos) {
      dispatch(MapActions.setCenterPos(cloneDeep(humanPos)));
    }
  });

  useWillUnMount(() => {
    dispatch(MapActions.setRouteInfo(null));
  });

  return (
    <section className="result_area">
      <div className="inner">
        <div className="list_wrap">
          {/* リスト側の場所検索は使用しないため非表示 */}
          <div className="search_box item_wrap display_none">
            <LeftLabelInputField
              onEnterKeyPress={handleClickSearch}
              className="item_box"
              label="場所を検索"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <LeftIconButton
              label="検索"
              fontAwesomeClass="fas fa-search"
              className="btn_search for_detail"
              size="sm"
              color="secondary"
              onClick={() => handleClickSearch()}
            />
          </div>
          <div className="list_box_sort">
            <Button
              className={`md primary maintenance_all ${type === 0 ? 'active' : ''}`}
              onClick={() => callbackType(0)}
            >すべて
            </Button>
            <Button
              className={`md primary maintenance_started  ${type === 1 ? 'active' : ''}`}
              onClick={() => callbackType(1)}
            >未対応
            </Button>
            <Button
              className={`md primary maintenance_completed  ${type === 2 ? 'active' : ''}`}
              onClick={() => callbackType(2)}
            >対応済
            </Button>
            <Button
              className="md primary edit"
              onClick={handleClickRegistration}
            >新規登録
            </Button>
          </div>
          <div className="list_box">
            {/* {[].length ? maintenanceList.map((v, i) => ( */}
            {maintenanceList.length ? maintenanceList.map((v, i) => (
              <div key={`card${i}`} className={`card_wrapper ${active === v.id ? 'active' : ''}`}>
                <MaintenanceCard
                  className="list_card"
                  maintenanceData={v}
                  onClick={() => {
                    setMaintenanceIndex(i);
                    handleClickCard(v);
                  }}
                />
              </div>
            )) : <div className="not_hit">該当する結果が見つかりません</div>}
          </div>
        </div>
        <div className="map_area">
          <MapBase
            maintenanceOption={{
              type,
              selectInfo: maintenance,
              selectIndex: maintenanceIndex,
              callbackActiveMarker: setActive,
            }}
            searchOption={{}}
            isNowPoint
          />
          <div className="map_search_box">
            <div className="search_box item_wrap">
              <InputField
                onEnterKeyPress={() => handleClickSearch(true)}
                className="item_box"
                // labelPlace="left"
                // label="場所を検索"
                value={searchValue2}
                placeholder="場所を検索"
                onChange={(e) => setSearchValue2(e.target.value)}
              />
              <LeftIconButton
                label="検索"
                fontAwesomeClass="fas fa-search"
                className="btn_search"
                size="sm"
                color="secondary"
                onClick={() => handleClickSearch(true)}
              />
              <LeftIconButton
                label="ルート検索"
                fontAwesomeClass="fas fa-route"
                className="btn_search"
                size="sm"
                color="secondary"
                onClick={handleClickRouteSearch}
              />
              {routeInfo && (
                <Button
                  size="sm"
                  color="secondary"
                  onClick={() => dispatch(MapActions.setRouteInfo(null))}
                >
                  ルート終了
                </Button>
              ) }
            </div>
          </div>

        </div>
      </div>
    </section>

  );
};
