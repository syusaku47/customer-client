import { ApiGeocoderParam, ApiGeocoderResponse } from './api-geocoder/api-geocoder';
import { ApiGetLocationImgParam, ApiGetLocationImgResponse } from './api-get-location-img/api-get-location-img';
import { ApiAddressSearchParam, ApiAddressSearchResponse } from './address-search/api-address-search';

export declare namespace ApiMap {

  namespace GeoCoder {
    type Param = ApiGeocoderParam;
    type Response = ApiGeocoderResponse;
  }

  namespace GetLocationImg {
    type Param = ApiGetLocationImgParam;
    type Response = ApiGetLocationImgResponse;
  }

  namespace AddressSearch {
    type Param = ApiAddressSearchParam;
    type Response = ApiAddressSearchResponse;
  }
}
