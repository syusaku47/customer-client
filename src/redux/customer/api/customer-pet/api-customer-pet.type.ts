import { Pet, PetList } from '../../../../type/customer/pet.type';

export type ApiCustomerPetParam = {
  id: number;
  pet_id?:number
}

export type ApiCustomerPetGetParam = {
  id: number;
  pet_id:number
}

export type ApiCustomerPetGetListParam = {
  id: number;
  sort_by?: number;
  highlow?: number;
};

export type ApiCustomerPetPostParam = {
  data: {
    name: string;
    type: string;
    sex: number; // 1: 指定なし 2: オス 3: メス
    age: number;
  },
  base: ApiCustomerPetParam;
};

export type ApiCustomerPetDeleteParam = {
  id: number;
  pet_id: number;
}

export type ApiCustomerPetGetListResponse = PetList;
export type ApiCustomerPetGetResponse = Pet;
