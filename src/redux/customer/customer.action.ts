// import {ApiLogin} from '../../api/auth/api-login';
import actionCreatorFactory from 'typescript-fsa';
import { CustomerListType, Customer } from '../../type/customer/customer.type';
import { apiCustomerFamily } from './api/customer-family/api-customer-family';
import { apiCustomerPet } from './api/customer-pet/api-customer-pet';
import { apiCustomer } from './api/customer/api-customer';
import { FamilyList } from '../../type/customer/family.type';
import { PetList } from '../../type/customer/pet.type';
import { CustomerSort } from '../../components/sp/layout/search-box/customer/customer-search-box.sp.type';
import { apiCustomerId } from './api/id/api-customer-id';

const ActionCreator = actionCreatorFactory('customer');

export const CustomerActions = {
  api: {
    customer: apiCustomer,
    pet: apiCustomerPet,
    family: apiCustomerFamily,
    id: apiCustomerId,
  },
  setCustomer: ActionCreator<Customer | null>('set/customer'),
  setList: ActionCreator<CustomerListType[]>('set/list'),
  setListCount: ActionCreator<number>('set/list/count'),
  setPetList: ActionCreator<PetList[]>('set/pet/list'),
  setPetListCount: ActionCreator<number>('set/pet/list/count'),
  setFamilyList: ActionCreator<FamilyList[]>('set/family/list'),
  setFamilyListCount: ActionCreator<number>('set/family/list/count'),
  setSort: ActionCreator<CustomerSort | null>('set/sort'),
  resetState: ActionCreator('reset/state'),
};
