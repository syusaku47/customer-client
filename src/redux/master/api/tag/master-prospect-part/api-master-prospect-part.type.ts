/* Param */
export type ApiMasterProspectPartGetListParam = {
  is_muko?: 0 | 1;
};

export type ApiMasterProspectPartPostParam = {
  data: {
    name: string;
    is_input: number;
    is_valid: number;
  };
  id: number;
};

/* Response */
export type ApiMasterProspectPartGetListResponse = {};
// export type ApiMasterProspectPartGetListResponse = MasterProspectPart;
