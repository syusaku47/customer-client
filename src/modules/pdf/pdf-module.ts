import { LogDecorator } from './log-decorator';

export abstract class PdfModule<T> {
  public templateSvgStrCollection: string[] = [];

  // eslint-disable-next-line no-useless-constructor
  protected constructor(
    public templateSvgPathCollection: string[],
    protected replaceData: { from: string, to: string }[],
    // eslint-disable-next-line no-empty-function
  ) {
  }

  public async run(param: T): Promise<void> {
    console.group(...LogDecorator('[<magenta>PDF Module run()</magenta>]'));
    console.log('param : ', param);
    const svgStrList = await this.createSvgList(param);
    // --- SVG → PDF への変換 ---
    const pdfPath = await this.createPdf(svgStrList);
    this.showPdf(pdfPath);
    console.groupEnd();
    return Promise.resolve();
  }

  public async createSvgList(param: T): Promise<string[]> {
    // --- テンプレ SVG の文字列取得 ---
    // eslint-disable-next-line no-restricted-syntax
    for (const templateSvgPath of this.templateSvgPathCollection) {
      // eslint-disable-next-line no-await-in-loop
      this.templateSvgStrCollection.push(await this.getSvgStrFromPath(templateSvgPath));
    }
    // --- テンプレ SVG への文字列埋め込み ---
    // console.log('before : ', this.templateSvgStrCollection);
    const svgStrList: string[] = this.createSvg(param, this.templateSvgStrCollection);
    // console.log('after : ', svgStrList);
    return Promise.resolve(svgStrList);
  }

  public async getSvgStrFromPath(path: string): Promise<string> {
    return fetch(path)
      .then((res) => res.text())
      .then((text) => text);
  }

  public createSvg(param: T, templateSvgStrList: string[]): string[] {
    return this.replaceSvgStr(param, templateSvgStrList);
  }

  async createPdf(svgStrList: string[], tate: boolean = true): Promise<string> {
    // --- base64 エンコード ---
    const svgStrBase64List: string[] = svgStrList.map(
      (v) => window.btoa(unescape(encodeURIComponent(v))),
    );
    // --- svg -> pdf API のリクエスト ---
    const formData = new FormData();
    formData.append('preset_type', tate ? '1' : '7');
    formData.append('pdf_list', '1');
    svgStrBase64List.forEach((v, i) => {
      formData.append(`svg_file[${i}]`, v);
    });
    const pdf = await fetch(
      // TODO : API のエンドポイント
      'https://hoge/api/pdf/changepdf',
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      },
    )
      .then((res) => res.blob());
    // - URL 作って pdf.js で開く -
    const pdfUrl = window.URL.createObjectURL(pdf);
    // - ファイル開く -
    // const tempDir = SystemController.getTmpDir();
    // const uuid = UuidGenerator.create();
    // const path = `${tempDir}\\${uuid}.pdf`;
    // const buffer = Buffer.from(await (pdf as any).arrayBuffer());
    // SystemController.mkfile(path, buffer);
    // const pdfUrl = path;
    // --- file のパスをリターン or DataURI をリターン ---
    return Promise.resolve(pdfUrl);
  }

  showPdf(path: string) {
    console.log('path (showPdf)', path);
    // TODO : PDF Viewer で開く
    // Store.dispatch(SystemActions.pdfViewerShow(path));
    // SystemController.openPath(path);
  }

  protected findFromStr(to: string, indexes: number[]) {
    const foundFrom = this.replaceData.find((v) => v.to === to);
    if (!foundFrom) {
      return 'not found replace from string !!';
    }
    let str = foundFrom.from;
    if (indexes.length >= 1) {
      str = str.replace('%{i}', `%{${indexes[0]}}`);
    }
    if (indexes.length >= 2) {
      str = str.replace('%{j}', `%{${indexes[1]}}`);
    }
    if (indexes.length >= 3) {
      str = str.replace('%{k}', `%{${indexes[2]}}`);
    }
    // if (indexes.length >= 4) {
    //   str = str.replace('%{l}', `%{${indexes[3]}}`);
    // }
    if (indexes.length >= 4) {
      throw new RangeError('3階層を超えるデータ構造には対応していません\n実装してください');
    }
    return str;
  }

  protected translateElement(
    baseSvgStr: string,
    className: string,
    translate: { x: number, y: number },
  ) {
    const doc = new DOMParser().parseFromString(baseSvgStr, 'image/svg+xml');
    // 複製対象のエレメント取得
    const targetEle = doc.querySelector(`.${className}`);
    if (!targetEle) {
      // throw new Error(`テンプレートの移動対象に ${className} という class をつけてください !!`);
      return doc.documentElement.outerHTML;
    }
    targetEle.setAttributeNS(
      '',
      'transform',
      `translate(${translate.x} ${translate.y})`,
    );
    return doc.documentElement.outerHTML;
  }

  protected toggleElement(
    baseSvgStr: string,
    className: string,
    display: boolean,
  ) {
    const doc = new DOMParser().parseFromString(baseSvgStr, 'image/svg+xml');
    doc.querySelectorAll(`.${className}`).forEach((targetEle) => {
      if (!targetEle) {
        // throw new Error(`テンプレートの移動対象に ${className} という class をつけてください !!`);
        return;
      }
      targetEle.setAttributeNS(
        '',
        'display',
        display ? '' : 'none',
      );
    });
    return doc.documentElement.outerHTML;
  }

  toggleElements(
    baseSvgStr: string | Document,
    data: {
      className: string,
      display: boolean,
    }[],
  ) {
    const doc = typeof baseSvgStr === 'string' ? new DOMParser().parseFromString(baseSvgStr, 'image/svg+xml') : baseSvgStr;
    data.forEach((v) => {
      const { className, display } = v;
      doc.querySelectorAll(`.${className}`).forEach((targetEle) => {
        if (!targetEle) {
        // throw new Error(`テンプレートの移動対象に ${className} という class をつけてください !!`);
          return;
        }
        targetEle.setAttributeNS(
          '',
          'display',
          display ? '' : 'none',
        );
      });
    });
    return doc.documentElement.outerHTML;
  }

  find(
    baseSvgStr: string | Document,
    className: string,
  ) {
    const doc = typeof baseSvgStr === 'string' ? new DOMParser().parseFromString(baseSvgStr, 'image/svg+xml') : baseSvgStr;
    return Boolean(doc.querySelectorAll(`.${className}`).length);
  }

  protected hideElement(
    baseSvgStr: string,
    className: string,
  ) {
    const doc = new DOMParser().parseFromString(baseSvgStr, 'image/svg+xml');
    // 複製対象のエレメント取得
    doc.querySelectorAll(`.${className}`)
      // eslint-disable-next-line consistent-return
      .forEach((targetEle) => {
        if (!targetEle) {
          // throw new Error(`テンプレートの移動対象に ${className} という class をつけてください !!`);
          return doc.documentElement.outerHTML;
        }
        targetEle.setAttributeNS(
          '',
          'display',
          'none',
        );
      });
    return doc.documentElement.outerHTML;
  }

  protected duplicateElement(
    baseSvgStr: string,
    className: string,
    translate: { x: number, y: number },
    index: number,
    level: 'i' | 'j' | 'k',
    hideEleClassName: string = '',
  ): string {
    const doc = new DOMParser().parseFromString(baseSvgStr, 'image/svg+xml');
    // 複製対象のエレメント取得
    const targetEle = doc.querySelector(`.${className}`);
    if (!targetEle) {
      // throw new Error(`テンプレートの複製対象に ${className} という class をつけてください !!`);
      return doc.documentElement.outerHTML;
    }
    // 複製対象のエレメントをクローン
    const duplicateEle = targetEle.cloneNode(true) as Element;
    // 複製対象エレメントの座標移動
    duplicateEle.setAttributeNS(
      '',
      'transform',
      `translate(${translate.x} ${translate.y})`,
    );
    // 複製対象エレメントの表示
    duplicateEle.setAttributeNS(
      '',
      'style',
      '',
    );
    // 置換文字列への index 付与
    // eslint-disable-next-line default-case
    switch (level) {
      case 'i':
        duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/%\{i\}/g, `%{${index}}`);
        duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/_i/g, `_${index}`);
        duplicateEle.classList.add(className.replace('_i', `_${index}`));
        break;
      case 'j':
        duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/%\{j\}/g, `%{${index}}`);
        duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/_j/g, `_${index}`);
        duplicateEle.classList.add(className.replace('_j', `_${index}`));
        break;
      case 'k':
        duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/%\{k\}/g, `%{${index}}`);
        duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/_k/g, `_${index}`);
        duplicateEle.classList.add(className.replace('_k', `_${index}`));
        break;
    }
    if (hideEleClassName) {
      duplicateEle.querySelectorAll(`.${hideEleClassName}`)
        .forEach((ele) => {
          ele.setAttributeNS(
            '',
            'display',
            'none',
          );
        });
    }
    // --- debug ---
    // eslint-disable-next-line no-nested-ternary
    // const indent = (level === 'i') ? '' : (level === 'j' ? '  ' : '    ');
    // window.console.groupCollapsed(`duplicate > ${indent}${level} : ${index}`);
    // window.console.log('duplicateEle.innerHTML : ', duplicateEle.innerHTML);
    // window.console.groupEnd();
    doc.documentElement.appendChild(duplicateEle);
    return doc.documentElement.outerHTML;
  }

  protected duplicateElement2(
    baseSvgStr: string,
    className: string,
    translate: { x: number, y: number },
    indexI: number | null,
    indexJ: number | null,
    indexK: number | null,
    hideEleClassName: string = '',
  ): string {
    const doc = new DOMParser().parseFromString(baseSvgStr, 'image/svg+xml');
    // 複製対象のエレメント取得
    const targetEle = doc.querySelector(`.${className}`);
    if (!targetEle) {
      throw new Error(`テンプレートの複製対象に ${className} という class をつけてください !!`);
      // return doc.documentElement.outerHTML;
    }
    // 複製対象のエレメントをクローン
    const duplicateEle = targetEle.cloneNode(true) as Element;
    // 複製対象エレメントの座標移動
    duplicateEle.setAttributeNS(
      '',
      'transform',
      `translate(${translate.x} ${translate.y})`,
    );
    // 複製対象エレメントの表示
    duplicateEle.setAttributeNS(
      '',
      'style',
      '',
    );
    // 置換文字列への index 付与
    if (indexI !== null) {
      duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/%\{i\}/g, `%{${indexI}}`);
      duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/_i/g, `_${indexI}`);
      duplicateEle.classList.add(className.replace('_i', `_${indexI}`));
    }
    if (indexJ !== null) {
      duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/%\{j\}/g, `%{${indexJ}}`);
      duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/_j/g, `_${indexJ}`);
      duplicateEle.classList.add(className.replace('_j', `_${indexJ}`));
    }
    if (indexK !== null) {
      duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/%\{k\}/g, `%{${indexK}}`);
      duplicateEle.innerHTML = duplicateEle.innerHTML.replace(/_k/g, `_${indexK}`);
      duplicateEle.classList.add(className.replace('_k', `_${indexK}`));
    }
    if (hideEleClassName) {
      duplicateEle.querySelectorAll(`.${hideEleClassName}`)
        .forEach((ele) => {
          ele.setAttributeNS(
            '',
            'display',
            'none',
          );
        });
    }
    // --- debug ---
    // eslint-disable-next-line no-nested-ternary
    // const level = indexK !== null ? 'k' : indexJ !== null ? 'j' : 'i';
    // eslint-disable-next-line no-nested-ternary
    // const indent = (level === 'i') ? '' : (level === 'j' ? '  ' : '    ');
    // eslint-disable-next-line max-len
    // window.console.groupCollapsed(`duplicate > ${indent}${level} : ${indexI} ${indexJ} ${indexK}`);
    // window.console.log('duplicateEle.innerHTML : ', duplicateEle.outerHTML);
    // window.console.groupEnd();
    doc.documentElement.appendChild(duplicateEle);
    return doc.documentElement.outerHTML;
  }

  private replaceSvgStr(param: T, templateSvgStrList: string[]) {
    const replacedSvgStrList = templateSvgStrList.map((templateSvgStr) => {
      let str = templateSvgStr;
      Object.keys(param).forEach((paramKey) => {
        const paramVal = param[paramKey as keyof T];
        if (Array.isArray(paramVal)) {
          paramVal.forEach((v0: any, i) => {
            Object.keys(v0).forEach((v0ParamKey) => {
              if (Array.isArray(v0[v0ParamKey])) {
                v0[v0ParamKey].forEach((v1: any, j: number) => {
                  Object.keys(v1).forEach((v1ParamKey) => {
                    if (Array.isArray(v1[v1ParamKey])) {
                      v1[v1ParamKey].forEach((v2: any, k: number) => {
                        Object.keys(v2).forEach((v2ParamKey) => {
                          // k 階層の置換
                          const toStr = this.escapeStr(v2[v2ParamKey] as any);
                          // eslint-disable-next-line max-len
                          // str = str.replace(new RegExp(findFromStr(v2ParamKey, [i, j, k]), 'g'), toStr);
                          str = str.replace(this.findFromStr(v2ParamKey, [i, j, k]), toStr);
                        });
                      });
                    } else {
                      // j 階層の置換
                      const toStr = this.escapeStr(v1[v1ParamKey] as any);
                      // str = str.replace(new RegExp(findFromStr(v1ParamKey, [i, j]), 'g'), toStr);
                      str = str.replace(this.findFromStr(v1ParamKey, [i, j]), toStr);
                    }
                  });
                });
              } else {
                // i 階層の置換
                const toStr = this.escapeStr(v0[v0ParamKey] as any);
                // str = str.replace(new RegExp(findFromStr(v0ParamKey, [i]), 'g'), toStr);
                str = str.replace(this.findFromStr(v0ParamKey, [i]), toStr);
                // console.groupCollapsed(`replace ${i}`);
                // console.log('i : ', i);
                // console.log('v0ParamKey : ', v0ParamKey);
                // console.log('v0[v0ParamKey] : ', v0[v0ParamKey]);
                // console.log('str.indexOf(v0[v0ParamKey]) : ', str.indexOf(v0[v0ParamKey]));
                // console.groupEnd();
              }
            });
          });
        } else {
          const toStr = this.escapeStr(paramVal as any);
          str = str.replace(new RegExp(this.findFromStr(paramKey, []), 'g'), toStr);
        }
      });
      return str;
    });
    return replacedSvgStrList;
  }

  private escapeStr(str: string) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&#039;')
      .replace(/"/g, '&#034;');
  }

  private blobToDataUrlAsync(blob: Blob): Promise<string> {
    return new Promise((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target) {
          resolve(e.target.result as string);
        }
      };
      fileReader.readAsDataURL(blob);
    });
  }

  private blobToBuffer(blob: Blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(blob);
    });
  }
}
