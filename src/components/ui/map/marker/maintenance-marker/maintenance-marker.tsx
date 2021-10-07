import { Marker } from '@react-google-maps/api';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import maintenanceCompleted from '../../../../../asset/images/pin/maintenance_completed.svg';
import maintenanceCompletedActive from '../../../../../asset/images/pin/maintenance_completed_on.svg';
import maintenanceStarted from '../../../../../asset/images/pin/maintenance_started.svg';
import maintenanceStartedActive from '../../../../../asset/images/pin/maintenance_started_on.svg';
import { MaintenanceList } from '../../../../../type/maintenance/maintenance.type';
import { MapActions } from '../../../../../redux/map/map.action';
import { UserAgent } from '../../../../../utilities/user-agent';

export type MaintenanceMarkerProps = {
  activeId: number;
  maintenance: MaintenanceList;
  callback: () => void;
  clusterer: any;
};

export const MaintenanceMarker = (props: MaintenanceMarkerProps) => {
  const {
    maintenance, callback, activeId, clusterer,
  } = props;

  /* Hook */
  const dispatch = useDispatch();

  /* Memo */
  const url = useMemo(() => {
    const normal = maintenance.fixed_flag ? maintenanceCompleted : maintenanceStarted;
    const active = maintenance.fixed_flag ? maintenanceCompletedActive : maintenanceStartedActive;
    return activeId === maintenance.id ? active : normal;
  }, [UserAgent, activeId, maintenance.id]);

  const scaledSize = useMemo(() => {
    const normal = UserAgent === 'pc' ? 90 : 60;
    const active = UserAgent === 'pc' ? 90 : 60;
    const size = new globalThis.google.maps.Size(
      100,
      activeId === maintenance.id ? active : normal,
    );
    return size;
  }, [UserAgent, activeId, maintenance.id]);

  /* Callback */
  const handleClickMarker = useCallback(
    (e: globalThis.google.maps.MapMouseEvent) => {
      dispatch(MapActions.setSearchPos(null));
      dispatch(MapActions.setRouteInfo(null));
      dispatch(MapActions.setGpsStatus('out'));
      e.domEvent.preventDefault();
      e.domEvent.stopPropagation();
      dispatch(MapActions.setCenterPos({
        lat: Number(maintenance.lat),
        lng: Number(maintenance.lng),
      }));
      if (callback) callback();
    },
    [maintenance.lat, maintenance.lng],
  );

  return (
    <Marker
      position={{
        lat: Number(maintenance.lat),
        lng: Number(maintenance.lng),
      }}
      zIndex={activeId === maintenance.id ? 99 : undefined}
      onClick={handleClickMarker}
      icon={{ url, scaledSize }}
      clusterer={clusterer}
    />
  );
};
