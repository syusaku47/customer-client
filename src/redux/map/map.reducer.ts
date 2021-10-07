import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { MapActions } from './map.action';
import {
  Position, Address, GPSStatus, MapAreaPosition, RouteInfo,
} from '../../type/map/map.type';

export type MapState = {
  gpsStatus: GPSStatus;
  routeInfo: RouteInfo | null;
  // destinationPos: Position | null;
  humanPos: Position | null;
  centerPos: Position | null;
  searchPos: Position | null;
  searchAddress: Address | null;
  mapAreaPos: MapAreaPosition | null;
  gpsId: number | null;
  loading: boolean;
  zoomLevel: number,
};

const initialState: MapState = {
  routeInfo: null,
  mapAreaPos: null,
  gpsStatus: 'watch',
  humanPos: null,
  centerPos: null,
  searchPos: null,
  searchAddress: null,
  gpsId: null,
  loading: false,
  zoomLevel: 15,
};

export const MapReducer = reducerWithInitialState<MapState>(initialState)
  .case(MapActions.loading, (state, payload) => ({
    ...state,
    loading: payload,
  }))
  .case(MapActions.setRouteInfo, (state, payload) => ({
    ...state,
    routeInfo: lodash.cloneDeep(payload),
  }))
  .case(MapActions.gps.setId, (state, payload) => ({
    ...state,
    gpsId: payload,
  }))
  .case(MapActions.setGpsStatus, (state, payload) => {
    window.console.log('status :', payload);

    return ({
      ...state,
      gpsStatus: lodash.cloneDeep(payload),
    });
  })
  .case(MapActions.setCenterPos, (state, payload) => ({
    ...state,
    centerPos: lodash.cloneDeep(payload),
  }))
  .case(MapActions.setMapAreaPosition, (state, payload) => ({
    ...state,
    mapAreaPos: lodash.cloneDeep(payload),
  }))
  .case(MapActions.setHumanPos, (state, payload) => ({
    ...state,
    humanPos: lodash.cloneDeep(payload),
  }))
  .case(MapActions.setSearchPos, (state, payload) => ({
    ...state,
    searchPos: lodash.cloneDeep(payload),
  }))
  .case(MapActions.setSearchAddress, (state, payload) => ({
    ...state,
    searchAddress: lodash.cloneDeep(payload),
  }))
  .case(MapActions.setZoomLevel, (state, payload) => ({
    ...state,
    zoomLevel: payload !== null ? payload : 15,
  }))
  .case(MapActions.resetState, () => initialState)
  .default((state) => state);
