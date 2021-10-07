import lodash from 'lodash';
import { RequestBaseParam } from '../type/api.type';

export const RequestBaseCollection:()=> RequestBaseParam = () => (
  lodash.cloneDeep(
    {
      httpMethod: 'GET',
      param: {},
    },
  ));
