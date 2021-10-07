import { MasterTax } from '../../../../type/master/master-tax.type';

/* Param */
export type ApiMasterTaxGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterTaxPostParam = {
  data: {
    start_date: string;
    tax_rate: string;
    is_valid: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterTaxGetListResponse = MasterTax;
