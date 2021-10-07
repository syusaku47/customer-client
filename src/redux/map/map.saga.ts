import { takeEvery, put } from 'redux-saga/effects';
import * as lodash from 'lodash';
import { MapActions } from './map.action';
import { ApiGetLocationImg } from './api/api-get-location-img/api-get-location-img';
import { ApiBase } from '../../service/api-base';
import { Store } from '../store';
import { DialogActions } from '../dialog/dialog.action';
import { MapModel } from '../../model/map/map.model';
import { MapAddressModel } from '../../model/map/map-address.model';
import { zenkaku2HankakuNum } from '../../utilities/zenkaku-2-hankaku';
import { ApiMap } from '../root.type';
import { ApiAddressSearch } from './api/address-search/api-address-search';
import { SystemActions } from '../system/system.action';

function* tryGpsStart(action: ReturnType<typeof MapActions.gps.start>) {
  const { onFirstLoaded, callback } = action.payload;
  if (onFirstLoaded && !Store.getState().map.humanPos) {
    yield put(SystemActions.isLoading(true));
  }

  /* ブラウザ対応可否 */
  if (!navigator.geolocation) {
    yield put(DialogActions.pushMessage({
      title: '',
      message: ['ブラウザが対応していません'],
    }));
    return;
  }

  try {
    yield MapModel.startGps({
      setTimer: (timerId) => {
        Store.dispatch(MapActions.gps.setId(timerId));
      },
      successCallback: (position) => {
        Store.dispatch(MapActions.setHumanPos(position));
        if (Store.getState().map.gpsStatus === 'watch') {
          Store.dispatch(MapActions.setCenterPos(position));
        }
        Store.dispatch(SystemActions.isLoading(false));
        if (callback) callback(position);
      },
      errorCallback: () => {
        Store.dispatch(SystemActions.isLoading(false));
        window.console.log('現在地の取得に失敗しました');
        // Store.dispatch(DialogActions.pushMessage({
        //   message: ['現在地の取得に失敗しました'],
        // }));
        // if (callback) callback();
        // Store.dispatch(SystemActions.isLoading(false));
      },
    });
  } catch (e) {
    Store.dispatch(DialogActions.pushMessage({
      title: '',
      message: ['現在地の取得に失敗しました'],
    }));
    Store.dispatch(SystemActions.isLoading(false));
  }
  Store.dispatch(SystemActions.isLoading(false));
}

function* tryGpsStop() {
  const { gpsId } = Store.getState().map;
  if (gpsId) {
    yield MapModel.stopGps(gpsId);
    yield put(MapActions.gps.setId(null));
  }
}

function* tryGetLocationImg(action: ReturnType<typeof MapActions.api.getLocationImg>) {
  const api = new ApiGetLocationImg(action.payload.param);
  try {
    const result: ApiMap.GetLocationImg.Response = yield api.run();
    yield action.payload.callback(ApiBase.isSuccess(result) ? `https://maps.googleapis.com/maps${api.url}` : null);
  } catch (error) {
    window.console.error(error);
  }
}
function* tryAddressSearch(action: ReturnType<typeof MapActions.api.addressSearch>) {
  const { param, callback } = action.payload;
  const api = new ApiAddressSearch(param);
  yield put(SystemActions.isLoading(true));

  try {
    const result: ApiMap.AddressSearch.Response = yield api.run();
    if (result.data.length) {
      callback(lodash.cloneDeep(result.data[0]));
    }
  } catch (error) {
    Store.dispatch(DialogActions.pushMessage({
      title: '',
      message: ['検索に失敗しました'],
    }));
  }
  yield put(SystemActions.isLoading(false));
}

function* tryGeocoder(action: ReturnType<typeof MapActions.api.geocoder>) {
  const { param, callback, isRegist } = action.payload;
  const geocoder = new globalThis.google.maps.Geocoder();
  yield put(SystemActions.isLoading(true));
  try {
    yield geocoder.geocode(
      param.param,
      (results, status) => {
        if (status === globalThis.google.maps.GeocoderStatus.OK) {
          const bounds = new globalThis.google.maps.LatLngBounds();
          if (results && results[0].geometry) {
            console.log('map res : ', results[0]);
            const { geometry, address_components, formatted_address } = results[0];

            const position = { lat: geometry.location.lat(), lng: geometry.location.lng() };

            bounds.extend(position);
            Store.dispatch(MapActions.setCenterPos(position));

            if (!isRegist) {
              Store.dispatch(MapActions.setSearchPos(position));
              Store.dispatch(MapActions.setSearchAddress({
                components: new MapAddressModel(address_components),
                formattedAddress: zenkaku2HankakuNum(formatted_address),
              }));
            }
            if (callback) {
              callback({
                position,
                address: zenkaku2HankakuNum(formatted_address),
              });
            }
          }
        }
      },
    );
  } catch (error: any) {
    if (error.code === globalThis.google.maps.GeocoderStatus.ZERO_RESULTS) {
      if (param.noMessage) return;
      yield put(DialogActions.pushMessage({
        title: '検索結果',
        message: ['検索結果が見つかりませんでした'],
      }));
    } else {
      if (param.noMessage) return;
      yield put(DialogActions.pushMessage({
        title: '検索結果',
        message: ['検索結果が見つかりませんでした'],
      }));
    }
  }
  yield put(SystemActions.isLoading(false));
}

export function* MapSaga() {
  yield takeEvery(MapActions.api.getLocationImg, tryGetLocationImg);
  yield takeEvery(MapActions.api.geocoder, tryGeocoder);
  yield takeEvery(MapActions.api.addressSearch, tryAddressSearch);
  yield takeEvery(MapActions.gps.start, tryGpsStart);
  yield takeEvery(MapActions.gps.stop, tryGpsStop);
}
