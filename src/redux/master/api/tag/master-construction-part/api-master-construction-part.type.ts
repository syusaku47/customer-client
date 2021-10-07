/* Param */
export type ApiMasterConstructionPartGetListParam = {
  is_muko?: 0 | 1;
};

export type ApiMasterConstructionPartPostParam = {
  data: {
    name: string;
    is_input: number;
    is_valid: number;
  };
  id: number;
};

/* Response */
export type ApiMasterConstructionPartGetListResponse = any;
// export type ApiMasterConstructionPartGetListResponse = MasterConstructionPart;
