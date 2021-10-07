import { MasterEmployee } from '../../../../type/master/master-employee.type';

/* Param */
export type ApiMasterEmployeeGetListParam = {
  data: {
    is_muko: 0 | 1;
    sort_by?: number;
    highlow?: number;
    offset?: number;
    limit?: number;  
  };
} | any;

export type ApiMasterEmployeePostParam = {
  data: {
    employee_cd: string;
    new_password: string;
    confirm_password: string;
    store_id: number;
    name: string;
    short_name: string;
    furigana: string;
    job_title: string;
    mail_address: string;
    sales_target: string;
    is_delete: number; // 1:削除済 0:未削除
    authority1: number; // 1:権限有 0:権限無（自分の担当以外のデータ登録、修正が可能な権限）
    authority4: number; // 1:権限有 0:権限無（入金処理、原価処理の操作が可能な権限）
  };
  id?: number;
};

/* Response */
export type ApiMasterEmployeeGetListResponse = MasterEmployee;
