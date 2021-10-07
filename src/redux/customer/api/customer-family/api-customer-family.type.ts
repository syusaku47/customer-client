import { Family, FamilyList } from '../../../../type/customer/family.type';

/* Parma */
export type ApiCustomerFamilyParam = {
  id: number;
  family_id?:number
}

export type ApiCustomerFamilyGetParam = {
  id: number;
  family_id:number
}

export type ApiCustomerFamilyGetListParam = {
  id: number;
  sort_by?: number;
  highlow?: number;
};

export type ApiCustomerFamilyPostParam = {
  data: {
    name: string;
    relationship: string;
    mobile_phone?: string;
    birth_date?: string;
  },
  base: ApiCustomerFamilyParam;
};

export type ApiCustomerFamilyDeleteParam = {
  id: number;
  family_id: number;
};

/* Response */
export type ApiCustomerFamilyGetListResponse = FamilyList;
export type ApiCustomerFamilyGetResponse = Family;
