/** 実際にAPIと接続するクラス */
import { LogDecorator } from '../utilities/log-decorator';
import { ApiBase } from './api-base';

class ConnectionClass {
  public async run<ReturnType>(apiBase: ApiBase): Promise<ReturnType> {
    return fetch(apiBase.createUrl(), apiBase.createRequestInit())
      .then((res) => this.response(apiBase, res))
      .catch((error) => {
        throw error;
      });
  }

  /** レスポンスのタイプによって処理わけ */
  public async response(api: ApiBase, response: Response) {
    const { status } = response;
    if (status !== 200) {
      // eslint-disable-next-line no-param-reassign
      api.contents = 'JSON';
    }

    switch (api.contents) {
      case 'JSON':
        return response.json()
          .then((json) => {
            this.log(api, json, response);
            return json;
          });
      case 'BLOB':
        return response.blob()
          .then((blob) => {
            const contentType = response.headers.get('Content-Type') || '';
            const contentTypeArr = contentType.replace(/\s/g, '').split(';');
            const nameItem = contentTypeArr.find((v) => v.indexOf('name') === 0) || '';
            window.console.log('nameItem', nameItem);
            if (contentTypeArr.length > 1 && nameItem) {
              const name = nameItem.split('=').length > 1 ? nameItem.split('=')[1] : '';
              const file = new File([blob], name);
              this.log(api, file, response);
              return { file, status };
            }
            const parsedBlob = api.parse(blob);
            this.log(api, api.parse, response);
            return { file: parsedBlob, status };
          });
      case 'PDF':
        // eslint-disable-next-line no-case-declarations
        let filename = '';
        // eslint-disable-next-line no-case-declarations
        const disposition = response.headers.get('Content-Disposition');
        if (disposition && disposition.indexOf('attachment') !== -1) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(disposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }
        return response.blob()
          .then((blob) => {
            if (filename) {
              const file = new File([blob], filename, { type: 'application/pdf' });
              this.log(api, file, response);
              return { file, status };
            }
            const parsedBlob = api.parse(blob);
            this.log(api, api.parse, response);
            return { file: parsedBlob, status };
          });
      default:
        return response.text()
          .then(async (text) => {
            const parsedText = await api.parse(text);
            this.log(api, parsedText, response);
            return parsedText;
          });
    }
  }

  public log(api: ApiBase, data: any, res: Response) {
    const title = `[<${res.status}>] ${api.httpMethod} ${api.url}`;
    const statusColor = res.status === 200 ? 'blue' : 'red';
    window.console.groupCollapsed(...LogDecorator(title, statusColor));
    window.console.log('Url          : ', api.createUrl());
    window.console.group('Request');
    window.console.log('Method     : ', api.httpMethod);
    window.console.log('Contents   : ', api.contents);
    window.console.log('Header     : ', api.header);
    if (api.httpMethod === 'GET') {
      window.console.log('Param      : ', api.param);
    } else {
      window.console.log('Body       : ', api.param);
    }
    window.console.groupEnd();
    window.console.group('Response');
    window.console.log('Body       : ', data);
    window.console.groupEnd();
    window.console.groupEnd();
  }
}

export const Connection = new ConnectionClass();
