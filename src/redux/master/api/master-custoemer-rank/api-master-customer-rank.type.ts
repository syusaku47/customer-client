/* Param */
export type ApiMasterCustomerRankGetListParam = {
    is_muko?: 0 | 1;
};

export type ApiMasterCustomerRankPostParam = {
  data: {
    store_name: string;
    area_name: string;
    is_valid: 0 | 1;
  };
  id: number;
};

/* Response */
export type ApiMasterCustomerRankGetListResponse = {};
