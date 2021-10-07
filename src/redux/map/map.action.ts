// import {ApiLogin} from '../../api/auth/api-login';
import actionCreatorFactory from 'typescript-fsa';
import {
  Position, Address, GPSStatus, MapAreaPosition, RouteInfo,
} from '../../type/map/map.type';
import { AddressSearch } from '../../type/map/address-search.type';
import { ApiMap } from '../root.type';

const ActionCreator = actionCreatorFactory('map');

export const MapActions = {
  api: {
    getLocationImg: ActionCreator<{
      param: ApiMap.GetLocationImg.Param;
      callback:(url: string | null) => void;
        }>('api/get/location/img'),
    geocoder: ActionCreator<{
      isRegist?: boolean;
      param: ApiMap.GeoCoder.Param;
      callback?:(url: { position: Position, address: string; }) => void;
        }>('/api/geocoder'),
    addressSearch: ActionCreator<{
      param: ApiMap.AddressSearch.Param;
      callback:(address: AddressSearch) => void;
        }>('api/address/search'),
  },
  gps: {
    start: ActionCreator<{ onFirstLoaded?: boolean, callback?:(v:Position) => void;}>('gps/start'),
    stop: ActionCreator('gps/stop'),
    setId: ActionCreator<number | null>('gps/set/id'),
  },
  loading: ActionCreator<boolean>('loading'),
  setMapAreaPosition: ActionCreator<MapAreaPosition>('set/map/area/position'),
  setGpsStatus: ActionCreator<GPSStatus>('set/gps/status'),
  // setDestinationPos: ActionCreator<Position | null>('set/destination/pos'),
  setRouteInfo: ActionCreator<RouteInfo | null>('set/route/info'),
  setHumanPos: ActionCreator<Position | null>('set/human/pos'),
  setZoomLevel: ActionCreator<number | null>('set/zoom/level'),
  setCenterPos: ActionCreator<Position | null>('set/center/pos'),
  setSearchPos: ActionCreator<Position | null>('set/search/pos'),
  setSearchAddress: ActionCreator<Address | null>('set/search/address'),
  resetState: ActionCreator('reset/state'),
};
