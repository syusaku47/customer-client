import { Position } from '../../type/map/map.type';

type StartGpsType = {
  setTimer: (timerId: number) => void;
  successCallback: (position: Position) => void;
  errorCallback: () => void;
}

export class MapModel {
  /**
   * GPS 開始処理
   * @param param StartGpsType
   */
  public static startGps(param: StartGpsType) {
    const {
      setTimer,
      successCallback,
      errorCallback,
    } = param;

    setTimer(navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      successCallback({
        lat: latitude,
        lng: longitude,
      });
    },
    errorCallback,
    {
      enableHighAccuracy: true, // より精度の高い位置情報を取得するか（true／false）
      timeout: 3000, // 取得タイムアウトまでの時間（ミリ秒）
      maximumAge: 0, // 位置情報の有効期限（ミリ秒）
    }));
  }

  /**
   * GPS 停止処理
   * @param gpsId
   */
  public static stopGps(gpsId: number) {
    navigator.geolocation.clearWatch(gpsId);
  }
}
