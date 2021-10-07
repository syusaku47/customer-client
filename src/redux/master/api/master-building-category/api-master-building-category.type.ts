import { MasterBuildingCategory } from '../../../../type/master/master-building-category.type';

/* Param */
export type ApiMasterBuildingCategoryGetListParam = {
  is_muko?: 0 | 1;
  sort_by?: number;
  highlow?: number;
  offset?: number;
  limit?: number;
};

export type ApiMasterBuildingCategoryPostParam = {
  data: {
    name: string;
    is_valid: 0 | 1;
  };
  id?: number;
};

/* Response */
export type ApiMasterBuildingCategoryGetListResponse = MasterBuildingCategory;
