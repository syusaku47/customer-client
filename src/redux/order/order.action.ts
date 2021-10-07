// import actionCreatorFactory from 'typescript-fsa';
import { apiOrder } from './api/order/api-order';
import { ActionCreator } from '../test/api/str/index';
import { Order } from '../../type/order/order.type';

export const OrderActions = {
  api: {
    order: apiOrder,
  },
  setOrder: ActionCreator<Order | null>('set/order'),
  resetState: ActionCreator('reset/state'),
};
