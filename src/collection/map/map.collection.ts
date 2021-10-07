export class MapCollection {
  // private static _apiKey = 'AIzaSyDd4kZOB96LZ9GMxmDUiHcwriQEb1KA9-w';
  private static _apiKey = 'AIzaSyCS6FkShW2PaAKtdB9yVgiVlLIgbqhsgGs';

  private static _clusterImg = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'

  private static _clusterMaxZoom = 14;

  private static _testCenter = {
    lat: 35.69775,
    lng: 139.77521,
  };

  static get apiKey() {
    return MapCollection._apiKey;
  }

  static get clusterMaxZoom() {
    return MapCollection._clusterMaxZoom;
  }

  static get clusterImg() {
    return MapCollection._clusterImg;
  }

  static get testCenter() {
    return MapCollection._testCenter;
  }
}
