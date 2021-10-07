import { Marker } from '@react-google-maps/api';
import { useCallback, useMemo, memo } from 'react';
import { useDispatch } from 'react-redux';
import customerOb from '../../../../../asset/images/pin/customer_ob.svg';
import customerObActive from '../../../../../asset/images/pin/customer_ob_on.svg';
import customerUncontracted from '../../../../../asset/images/pin/customer_uncontracted.svg';
import customerUncontractedActive from '../../../../../asset/images/pin/customer_uncontracted_on.svg';
import { CustomerListType } from '../../../../../type/customer/customer.type';
import { MapActions } from '../../../../../redux/map/map.action';
import { UserAgent } from '../../../../../utilities/user-agent';

export type CustomerMarkerProps = {
  activeId: number;
  customer: CustomerListType;
  callback: () => void;
  clusterer: any;
};

export const CustomerMarker = memo((props: CustomerMarkerProps) => {
  const {
    customer, callback, activeId, clusterer,
  } = props;

  /* Hook */
  const dispatch = useDispatch();

  /* Memo */
  const url = useMemo(() => {
    const normal = customer.ob_flag === 1 ? customerOb : customerUncontracted;
    const active = customer.ob_flag === 1 ? customerObActive : customerUncontractedActive;
    return activeId === customer.id ? active : normal;
  }, [UserAgent, activeId, customer.id]);

  const scaledSize = useMemo(() => {
    const normal = UserAgent === 'pc' ? 90 : 60;
    const active = UserAgent === 'pc' ? 90 : 60;
    const size = new globalThis.google.maps.Size(
      100,
      activeId === customer.id ? active : normal,
    );
    return size;
  }, [UserAgent, activeId, customer.id]);

  /* Callback */
  const handleClickMarker = useCallback(
    (e: globalThis.google.maps.MapMouseEvent) => {
      dispatch(MapActions.setSearchPos(null));
      dispatch(MapActions.setRouteInfo(null));
      dispatch(MapActions.setGpsStatus('out'));
      e.domEvent.preventDefault();
      e.domEvent.stopPropagation();
      dispatch(MapActions.setCenterPos({
        lat: Number(customer.lat),
        lng: Number(customer.lng),
      }));
      if (callback) callback();
    },
    [customer.lat, customer.lng],
  );

  return (
    <Marker
      clusterer={clusterer}
      position={{
        lat: Number(customer.lat),
        lng: Number(customer.lng),
      }}
      zIndex={activeId === customer.id ? 99 : undefined}
      onClick={handleClickMarker}
      icon={{
        url,
        scaledSize,
      }}
    />
  );
});
