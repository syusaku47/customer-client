import { ApiBase } from '../../../../service/api-base';

export type ApiGeocoderParam = {
  param: globalThis.google.maps.GeocoderRequest;
  noMessage?: boolean;
}
export type ApiGeocoderResponse = Promise<globalThis.google.maps.GeocoderResponse | null>;

export class ApiGeocoder extends ApiBase<ApiGeocoderResponse> {
  public geoParam: globalThis.google.maps.GeocoderRequest;

  constructor(param: ApiGeocoderParam) {
    super({
      httpMethod: 'GET',
      url: '',
      host: '',
    });

    this.geoParam = param.param;
  }

  run2() {
    const geocoder = new globalThis.google.maps.Geocoder();
    return geocoder.geocode(
      this.geoParam,
      (results, status) => ({ results, status }),
    );
  }
}
