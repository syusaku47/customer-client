import { ApiBase } from '../service/api-base';
import { Limit } from '../components/ui/table/table-sort/table-sort';

export type HttpMethodType = 'GET' | 'POST' | 'DELETE';

export type ContentsType = 'JSON' | 'BLOB' | 'PDF';

export type ParamType = {
  [key: string]: (string |
    number | number[] | string[] | boolean | undefined | File | File[] | null);
};

export type Errors = {
  status: number;
  errors: string;
};

export type ApiResType<T> = (T | Errors);

export type ResType<T> = {
  args: T,
  json: T;
} & T & Errors;

export type ResponseHeader = {
  request: string;
  status: string;
  status_code: number;
  messages?: (string)[] | null;
}

export type ResultType<T=any> = {
  header: ResponseHeader;
  body: {
    hit_count: number;
    data:T[]
  } & []
}

export type ResFileType = {
  file: File,
} & Errors;

export type ApiRequestType<T = ApiBase> = {
  request: T;
  onSuccess?: Generator
  onError?: Generator;
};

export type RequestBaseParam = {
  httpMethod: HttpMethodType;
  param?: ParamType;
}

/** 指定した値のみRequiredにする */
export type PartialRequired<T, K extends keyof T> = Pick<T, K> & Omit<Partial<T>, K>;

/** 指定した値のみUndefined許容にする */
export type RequiredPartial<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

/** 指定した値を違う型に変更する, ない場合は追加する */
export type ChangeType<T, K extends object> = Omit<T, keyof K> & K;

export type CallbackRequest<T, K=any> = {
  param: T;
  onSuccess?: (res?:K) => void;
  onError?: (res?:K) => void;
}

export type SortParam = {
  /** 何ページ目を表示するか 1ページ目=0 */
  offset: number;
  /** 何件取得するか */
  limit: number | Limit;
  /** ソートする列のIndex */
  sort_by: number;
  /** 0:昇順 1:降順 */
  highlow: number;
}
