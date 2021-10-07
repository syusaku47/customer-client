import { MasterStore } from '../../../../type/master/master-store.type';

/* Param */
export type ApiMasterStoreGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterStorePostParam = {
  data: {
    name: string;
    furigana: string;
    short_name: string;
    tel_no: string;
    fax_no: string;
    free_dial: string;
    post_no: string;
    prefecture: number;
    city: string;
    address: string;
    building_name: string;
    bank_name: string;
    bank_account_no: string;
    holder: string;
    bank_account: number; // 1:普通口座 2:当座
    is_valid: number;
    logo: Blob | any; // TODO anyの修正
  };
  id?: number;
};

/* Response */
export type ApiMasterStoreGetListResponse = MasterStore;
