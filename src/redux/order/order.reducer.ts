import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as lodash from 'lodash';
import { Order } from '../../type/order/order.type';
import { OrderActions } from './order.action';

export type OrderState = {
  order: Order | null,
};

const initialState: OrderState = {
  order: null,
};

export const OrderReducer = reducerWithInitialState<OrderState>(initialState)
  .case(OrderActions.setOrder, (state, payload) => ({
    ...state,
    order: lodash.cloneDeep(payload),
  }))
  .case(OrderActions.resetState, () => initialState)
  .default((state) => state);
