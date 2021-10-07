import { Config } from '../config/config';
import { ContentsType, HttpMethodType, ParamType } from '../type/api.type';
import { Connection } from './connection';

const { host } = Config;
// const host = 'https://localhost';

export class ApiBase<T = {}, J = {}> {
  public httpMethod: HttpMethodType;

  public contents: ContentsType = 'JSON';

  public url: string;

  public param: ParamType = {};

  public header: { [key: string]: string | undefined | null } = {};

  public sendParam?: J;

  public host?: string;

  public isBinary?: boolean = false;

  public dummyData: any | null = null;

  public credentials: any;

  constructor(data: {
    httpMethod: HttpMethodType;
    contents?: ContentsType;
    url: string;
    param?: ParamType;
    header?: { [key: string]: string | undefined|null };
    sendParam?: J;
    host?: string;
    isBinary?: boolean;
    credentials?: any;
  }) {
    this.httpMethod = data.httpMethod;
    this.contents = data.contents || this.contents;
    this.url = data.url;
    this.param = data.param || this.param;
    this.header = data.header || this.header;
    this.sendParam = data.sendParam;
    this.host = data.host;
    this.isBinary = data.isBinary;
    this.credentials = data.credentials === null ? undefined : 'include';
  }

  /** API接続を実行させる */
  public async run(): Promise<T> {
    return Connection.run<T>(this)
      .then((v) => {
        if (this.dummyData) {
          window.console.groupCollapsed('┗ Dummy Response');
          window.console.log('Header  : ', this.dummyData.header);
          window.console.log('Body    : ', this.dummyData.body);
          window.console.groupEnd();
          return this.dummyData;
        }
        return v;
      });
  }

  /** URLの生成 */
  public createUrl() {
    const hostName = this.host || host;
    const param = this.httpMethod === 'GET' && this.param
      ? ApiBase.createQueryParam(this.param)
      : '';
    return `${hostName}${this.url}${param}`;
  }

  /** ヘッダーの生成 */
  public createHeader(isAuth?:boolean) {
    const headers = new Headers();
    const keys = Object.keys(this.header);
    const values = Object.values(this.header);

    keys.forEach((key, i) => {
      if (values[i]) {
        headers.append(key, String(values[i]));
      }
    });

    // headers.append('X-XSRF-TOKEN', ApiBase.getCookie() || '');
    return this.url.match('/api?/') && !this.url.match('/api/v1') && isAuth
      ? { ...headers, 'X-XSRF-TOKEN': ApiBase.getCookie() || '' }
      : headers;
  }

  /** ボディの生成 */
  public createBody() {
    const formData = new FormData();
    const keys = Object.keys(this.param);
    const values = Object.values(this.param);
    for (let i = 0; i < keys.length; i += 1) {
      if (values[i] === 0 || values[i] === '' || values[i]) {
        if (Array.isArray(values[i])) {
          if (!(values[i] as []).length) {
            formData.append(`${keys[i]}[0]`, '[]');
          } else {
            (values[i] as []).forEach((v: any, j) => {
              formData.append(`${keys[i]}[${j}]`, v);
            });
          }
        } else {
          formData.append(keys[i], values[i] as string);
        }
      }
    }
    return formData;
  }

  /** 送信情報 */
  public createRequestInit() {
  // eslint-disable-next-line no-undef
    let requestInit: RequestInit = {};
    switch (this.httpMethod) {
      case 'GET':
        requestInit = {
          credentials: this.url.match('/api/') && !this.url.match('/api/v1') ? this.credentials : 'omit',
          // mode: 'no-cors',
          headers: this.createHeader(),
        };
        break;
      case 'POST':
      case 'DELETE':
        requestInit = {
          credentials: this.url.match('/api/') && !this.url.match('/api/v1') ? this.credentials : 'omit',
          // mode: 'cors',
          headers: this.createHeader(true),
          method: this.httpMethod,
          body: this.createBody(),
        };
        break;
      default:
        break;
    }
    return requestInit;
  }

  /** パース */
  public parse(response: any): any {
    return response;
  }

  /** 成功判定 */
  static isSuccess(response: any) {
    // return response !== null;
    return response !== null && (response.status === 200 || response.header.status_code === 200);
  }

  /** クエリパラメータの生成 */
  public static createQueryParam(param: ParamType) {
    if (!Object.keys(param).length) return '';

    let queryParam = '?';
    const keys = Object.keys(param);
    const values = Object.values(param);
    for (let i = 0; i < keys.length; i += 1) {
      if (values[i] === 0 || values[i]) {
        queryParam += queryParam.length === 1 ? '' : '&';

        if (Array.isArray(values[i])) {
          let query = '';

          (values[i] as []).forEach((v: any, j) => {
            query += `${j ? '&' : ''}${keys[i]}[${j}]=${v}`;
          });

          queryParam += query;
        } else {
          queryParam += `${keys[i]}=${values[i]}`;
        }
      }
    }
    return queryParam;
  }

  private static getCookie() {
    if (!document.cookie) {
      return null;
    }

    const xsrfCookies = document.cookie.split(';')
      .map((c) => c.trim())
      .filter((c) => c.startsWith('XSRF-TOKEN='));

    if (xsrfCookies.length === 0) {
      return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
  }
}
