import {
  useCallback, useMemo, useState, memo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as lodash from 'lodash';
import { cloneDeep } from 'lodash';
import { State } from '../../../../../../../redux/root.reducer';
import { CustomerListType } from '../../../../../../../type/customer/customer.type';
import { Button } from '../../../../../../ui/button/button';
import { LeftIconButton } from '../../../../../../ui/button/left-icon-button/left-icon-button';
import { CustomerCard } from '../../../../../../ui/card/customer-card/customer-card';
import { InputField } from '../../../../../../ui/input-field/input-field';
import { MapBase } from '../../../../../../ui/map/map-base';
import './customer-map-list.scss';
import { MapActions } from '../../../../../../../redux/map/map.action';
import { DialogActions } from '../../../../../../../redux/dialog/dialog.action';
import { CustomerEdit } from '../../../../../pages/customer/edit/customer-edit';
import { CustomerActions } from '../../../../../../../redux/customer/customer.action';
import { useDidMount, useWillUnMount } from '../../../../../../../hooks/life-cycle';
import { RouteDialog } from '../../../../../../dialogs/route-dialog/route-dialog';

type Props = {
  type: 0 | 1 | 2;
  callback: (type: 0 | 1 | 2) => void;
}

export const CustomerMapListPC = memo((props: Props) => {
  const { type, callback } = props;

  /* Hooks */
  const humanPos = useSelector((state:State) => state.map.humanPos);
  const sortState = useSelector((state:State) => state.customer.sort);
  const customerListData = useSelector((state: State) => state.customer.list);
  const routeInfo = useSelector((state: State) => state.map.routeInfo);
  const dispatch = useDispatch();

  /* State */
  const [customer, setCustomer] = useState<CustomerListType | null>(null);
  const [customerIndex, setCustomerIndex] = useState(NaN);

  const [searchValue, setSearchValue] = useState('');
  const [searchValue2, setSearchValue2] = useState('');
  const [active, setActive] = useState(NaN);

  /* List */
  const customerList = useMemo(() => (
    !type ? customerListData : customerListData.filter(
      (v) => v.ob_flag === type,
    )), [type, customerListData]);

  /* Callback */
  const handleClickCard = useCallback((v: CustomerListType) => {
    setCustomer(lodash.cloneDeep(v));
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

  const handleClickRouteSearch = useCallback(() => {
    dispatch(MapActions.setGpsStatus('out'));
    dispatch(DialogActions.push({
      title: 'ルート設定',
      element: <RouteDialog
        type="customer"
        destination={searchValue2}
        callback={() => { }}
      />,
    }));
  }, [searchValue2]);

  const handleClickRegistration = useCallback(
    () => {
      let editId = NaN;
      dispatch(DialogActions.push({
        title: '顧客登録',
        className: 'max_height_dialog max_width_dialog',
        onCloseClick: () => {
          dispatch(CustomerActions.api.id.delete({ id: editId }));
        },
        element: <CustomerEdit
          mode="add"
          callback={() => {
            dispatch(CustomerActions.api.customer.getList({
              ...sortState,
              tags: sortState?.tags?.getSendData(),
              parts: sortState?.parts?.getSendData(),
              is_deficiency: sortState?.is_deficiency ? 1 : 0,
            }));
          }}
          closeCallback={(v) => { editId = v; }}
        />,
      }));
    }, [],
  );

  /* Effect */
  useDidMount(() => {
    if (humanPos) {
      dispatch(MapActions.setCenterPos(cloneDeep(humanPos)));
    }
  });

  useWillUnMount(() => {
    dispatch(MapActions.setRouteInfo(null));
  });

  // useEffect(() => {
  //   if (customerList.length && !active) {
  //     const data = customerList[0];
  //     dispatch(MapActions.setCenterPos({ lat: Number(data.lat), lng: Number(data.lng) }));
  //   }
  //   // dispatch(CustomerActions.api.customer.getList({}));
  // }, [customerList]);

  return (
    <section className="result_area">
      <div className="inner">
        <div className="list_wrap">
          {/* リスト側の場所検索は使用しないため非表示 */}
          <div className="search_box item_wrap display_none">
            <InputField
              onEnterKeyPress={handleClickSearch}
              labelPlace="left"
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
              className={`md primary customer_all ${type === 0 ? 'active' : ''}`}
              onClick={() => callback(0)}
            >すべて
            </Button>
            <Button
              className={`md primary customer_prospect  ${type === 2 ? 'active' : ''}`}
              onClick={() => callback(2)}
            >見込み
            </Button>
            <Button
              className={`md primary customer_ob focus  ${type === 1 ? 'active' : ''}`}
              onClick={() => callback(1)}
            >OB
            </Button>
            <Button
              className="md primary edit"
              onClick={handleClickRegistration}
            ><>顧客<br />新規登録</>
            </Button>
          </div>
          <div className="list_box">
            {/* {[].length ? customerList.map((v, i) => ( */}
            {customerList.length ? customerList.map((v, i) => (
              <div key={`card${i}`} className={`card_wrapper ${active === v.id ? 'active' : ''}`}>
                <CustomerCard
                  className="list_card"
                  customerData={v}
                  onClick={() => {
                    setCustomerIndex(i);
                    handleClickCard(v);
                  }}
                  index={i}
                />
              </div>
            )) : <div className="not_hit">該当する結果が見つかりません</div>}
          </div>
        </div>
        <div className="map_area">
          <MapBase
            customerOption={{
              type,
              selectInfo: customer,
              selectIndex: customerIndex,
              callbackActiveMarker: setActive,
            }}
            searchOption={{}}
            isNowPoint
          />
          <div className="map_search_box">
            <div className="search_box item_wrap">
              <InputField
                onEnterKeyPress={() => handleClickSearch(true)}
                // labelPlace="left"
                // label="場所を検索"
                className="item_box"
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
              <div className="root_btn_box">
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
                  className="btn_search ml_0"
                  size="sm"
                  color="dark"
                  onClick={() => dispatch(MapActions.setRouteInfo(null))}
                >
                  ルート検索終了
                </Button>
                ) }
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

  );
});
