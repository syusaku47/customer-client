import { MasterSignature } from '../../../../type/master/master-signature.type';

/* Param */
export type ApiMasterSignatureGetListParam = {
};

export type ApiMasterSignaturePostParam = {
  data: {
    item: string;
    name: string;
  };
  id: number;
};

/* Response */
export type ApiMasterSignatureGetListResponse = MasterSignature;
