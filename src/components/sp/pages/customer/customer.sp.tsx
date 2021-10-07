import { replace } from 'connected-react-router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDidMount, useWillUnMount } from '../../../../hooks/life-cycle';
import { useQuery } from '../../../../hooks/use-query';
import { CustomerActions } from '../../../../redux/customer/customer.action';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { RoutingPath } from '../../../../routes/routing-pass';
import { noPinch } from '../../../../utilities/no-pinch';
import { SetSelectedClass } from '../../../../utilities/set-selected-class';
import { BottomBorderButton } from '../../../ui/button/bottom-border/bottom-border-button';
import { LeftIconButton } from '../../../ui/button/left-icon-button/left-icon-button';
import { MapListToggleButton } from '../../../ui/button/map-list-toggle/map-list-toggle-button';
import { MapBase } from '../../../ui/map/map-base';
import { CustomerListSP } from '../../layout/body/list/customer-list/customer-list.sp';
import { SearchBoxDialogTitle } from '../../layout/search-box/search-box.type.sp';
import { BasePageSP } from '../base.page.sp';
import { CustomerEditSP } from './edit/customer-edit.sp';
import { CustomerEditDialogTitle } from './edit/customer-edit.type';
import { SearchBoxCustomerSP } from './serch-box/customer-search-box.sp';

export const CustomerSP = () => {
  const shoType = useQuery('type');
  const dispatch = useDispatch();
  const locationState = Boolean(useLocation().state);

  /* State */
  const [showType, setShowType] = useState<'map' | 'list'>('map');
  const [customerShowType, setCustomerShowType] = useState<0 | 1 |2>(0);

  const headerEle = useRef<HTMLDivElement>(null);
  const footerEle = useRef<HTMLDivElement>(null);
  const listEle = useRef<HTMLDivElement>(null);

  /* effect */
  useEffect(() => {
    const pinchCallback = noPinch(footerEle.current);
    return pinchCallback;
  }, [footerEle]);

  useDidMount(() => {
    dispatch(CustomerActions.api.customer.getList({
      limit: 9999999,
    }));
  });

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
    listEle.current?.scrollTo(0, -10000);
  }, [customerShowType]);

  return (
    <BasePageSP
      className="customer_sp"
      searchBoxDialog={{
        title: SearchBoxDialogTitle,
        element: <SearchBoxCustomerSP />,
      }}
      menuOpen={locationState}
      searchCallback={(v) => {
        if (v) {
          dispatch(CustomerActions.api.customer.getList({
            name: v,
            limit: 99999,
          }));
        }
      }}
    >
      <div
        id="customer_sp_header"
        className="map_list_header"
        onClick={(e) => { e.preventDefault(); }}
        ref={headerEle}
      >
        <BottomBorderButton
          label="すべて"
          onClick={(e) => {
            setCustomerShowType(0);
            SetSelectedClass(e.currentTarget, headerEle.current);
          }}
          selected
        />
        <BottomBorderButton
          label="OBのみ"
          onClick={(e) => {
            setCustomerShowType(1);
            SetSelectedClass(e.currentTarget, headerEle.current);
          }}
        />
        <BottomBorderButton
          label="見込みのみ"
          onClick={(e) => {
            setCustomerShowType(2);
            SetSelectedClass(e.currentTarget, headerEle.current);
          }}
        />
      </div>

      <div className="map_list_body" ref={listEle}>
        {showType === 'map'
          ? (
            <MapBase
              customerOption={{
                type: customerShowType,
              }}
              isNowPoint
              searchOption={{}}
            />
          )
          : <CustomerListSP type={customerShowType} />}
      </div>

      <div
        className="page_body_footer space_between"
        ref={footerEle}
      >
        <LeftIconButton
          label="顧客新規登録"
          fontAwesomeClass="far fa-edit"
          onClick={() => {
            let editId = NaN;
            dispatch(DialogActions.push({
              title: CustomerEditDialogTitle.add,
              onCloseClick: () => {
                dispatch(CustomerActions.api.id.delete({ id: editId }));
              },
              element: <CustomerEditSP
                mode="add"
                closeCallback={(v) => { editId = v; }}
              />,
            }));
          }}
          size="md"
          color="primary"
        />
        <MapListToggleButton
          showType={showType}
          onClick={() => {
            const path = `${RoutingPath.customer}?type=${showType === 'map' ? 'list' : 'map'}`;
            dispatch(replace(path));
            setShowType(showType === 'map' ? 'list' : 'map');
          }}
        />
      </div>
    </BasePageSP>
  );
};
