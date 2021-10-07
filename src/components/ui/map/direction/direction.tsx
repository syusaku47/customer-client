import {
  DirectionsRenderer, DirectionsService,
} from '@react-google-maps/api';
import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { SystemActions } from '../../../../redux/system/system.action';
import { State } from '../../../../redux/root.reducer';
import { DialogActions } from '../../../../redux/dialog/dialog.action';
import { MapActions } from '../../../../redux/map/map.action';

export const Direction = () => {
  const routeInfo = useSelector((state: State) => state.map.routeInfo, isEqual);
  const dispatch = useDispatch();

  /* State */
  const [
    currentDirection,
    setCurrentDirection,
  ] = useState<globalThis.google.maps.DirectionsResult | null>(null);

  const [
    viewPort,
    setViewPort,
  ] = useState(false);

  const routeCallback = useCallback(
    (res: globalThis.google.maps.DirectionsResult,
      status: globalThis.google.maps.DirectionsStatus) => {
      try {
        if (res) {
          const route = res.routes[0].legs[0];

          /* すでにルート状態があった場合 */
          if (currentDirection) {
            if (
              status === globalThis.google.maps.DirectionsStatus.OK
            && res.geocoded_waypoints?.length
              !== currentDirection.geocoded_waypoints?.length
            ) {
              setCurrentDirection(res);
              if (route.distance && route.duration) {
                window.console.log('ルート結果', route);
              }
            }
          } else if (status === globalThis.google.maps.DirectionsStatus.OK) {
            window.console.log('ルート結果', route);
            setCurrentDirection(res);
          }
        }
      } catch (error) {
        setCurrentDirection(null);
        dispatch(SystemActions.isLoading(false));
        dispatch(MapActions.setRouteInfo(null));
        setViewPort(false);
        dispatch(DialogActions.clear());
        dispatch(DialogActions.pushMessage({
          title: 'ルート検索',
          message: ['ルートの検索に失敗しました'],
        }));
      }
    },
    [currentDirection],
  );

  useEffect(() => {
    if (!currentDirection) {
      dispatch(SystemActions.isLoading(true));
      setTimeout(() => {
        setViewPort(true);
        dispatch(SystemActions.isLoading(false));
      }, 1000);
    }
  }, [currentDirection]);

  useEffect(() => {
    setCurrentDirection(null);
    setViewPort(false);
  }, [routeInfo]);

  return (
    <div>
      {!currentDirection
      && routeInfo && (
      <DirectionsService
        options={{
          origin: routeInfo.start,
          waypoints: routeInfo.wayPoints.length
            ? routeInfo.wayPoints.map((v) => ({ location: v, stopover: false }))
            : undefined,
          destination: routeInfo.destination,
          travelMode: routeInfo.travelMode,
        }}
        callback={routeCallback}
      />
      )}
      {currentDirection !== null && (
        <>
          <DirectionsRenderer
            options={{
              draggable: false,
              directions: currentDirection,
              preserveViewport: viewPort,
              suppressMarkers: false,
              polylineOptions: {
                clickable: true,
                strokeColor: 'red',
                strokeWeight: 7,
                strokeOpacity: 0.7,
              },
            }}
          />
          {/* {routeInfo?.legs.map((v) => (<Marker />))} */}
        </>
      )}
    </div>
  );
};
