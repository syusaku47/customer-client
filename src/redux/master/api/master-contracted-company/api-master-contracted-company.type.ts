import { MasterContractedCompany } from '../../../../type/master/master-contracted-company.type';

/* Param */
export type ApiMasterContractedCompanyGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterContractedCompanyPostParam = {
  data: {
    name: string;
    mail_address: string;
    password: string;
    tel_no: string;
    post_no: string;
    prefecture: number;
    city: string;
    address: string;
    building_name: string;
    status: 1 | 2; // 1:有償 2:無償
    accounts: number; // 無償の場合は10固定
    is_valid: 0 | 1; // 1:有効 0:無効
    is_valid1: 0 | 1; // 1:有効 0:無効
    is_valid2: 0 | 1; // 1:有効 0:無効
    is_valid3: 0 | 1; // 1:有効 0:無効
    is_valid4: 0 | 1; // 1:有効 0:無効
    is_valid5: 0 | 1; // 1:有効 0:無効
  };
  id?: number;
};

/* Response */
export type ApiMasterContractedCompanyGetListResponse = MasterContractedCompany;
