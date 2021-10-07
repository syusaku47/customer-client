import { MasterLargeCategory } from '../../../../type/master/master-large-category.type';

/* Param */
export type ApiMasterLargeCategoryGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterLargeCategoryPostParam = {
  data: {
    name: string;
    is_valid: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterLargeCategoryGetListResponse = MasterLargeCategory;
