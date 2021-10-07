import { ApiBase } from '../../../../service/api-base';
import { AddressSearch } from '../../../../type/map/address-search.type';

export type ApiAddressSearchParam = {
  zipcode1: string;
  zipcode2: string;
}

export type ApiAddressSearchResponse = {
  code: string;
  data: AddressSearch[]
}

export class ApiAddressSearch extends ApiBase<ApiAddressSearchResponse> {
  constructor(param: ApiAddressSearchParam) {
    const { zipcode1, zipcode2 } = param;
    super({
      httpMethod: 'GET',
      url: `/api/v1/${zipcode1}/${zipcode2}.json`,
      host: 'https://madefor.github.io/postal-code-api',
      credentials: null,
    });
  }
}
