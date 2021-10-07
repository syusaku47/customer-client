import { MapCollection } from '../../../../collection/map/map.collection';
import { ApiBase } from '../../../../service/api-base';

export type ApiGetLocationImgParam = {
  size: { w: number; h: number };
  location: globalThis.google.maps.LatLngLiteral;
};

export type ApiGetLocationImgResponse = {
  status: number;
  url: string;
};

export class ApiGetLocationImg extends ApiBase<ApiGetLocationImgResponse> {
  constructor(param: ApiGetLocationImgParam) {
    const { size, location } = param;

    super({
      httpMethod: 'POST',
      url: `/api/streetview?size=${size.w}x${size.h}&location=${location.lat},${location.lng}&fov=80&heading=70&pitch=0&key=${MapCollection.apiKey}`,
      param: {},
      host: 'https://maps.googleapis.com/maps',
    });
  }

  run() {
    return fetch(this.url);
  }
}
