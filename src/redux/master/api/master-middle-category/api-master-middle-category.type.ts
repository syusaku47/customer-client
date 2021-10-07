import { MasterMiddleCategory } from '../../../../type/master/master-middle-category.type';

/* Param */
export type ApiMasterMiddleCategoryGetListParam = {
  is_muko?: 0 | 1;
  category_id?: number;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterMiddleCategoryPostParam = {
  data: {
    category_id: number;
    name: string;
    is_valid: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterMiddleCategoryGetListResponse = MasterMiddleCategory;
