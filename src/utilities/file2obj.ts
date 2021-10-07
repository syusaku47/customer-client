import { cloneDeep } from 'lodash';

type Res = {
  file: File;
  name: string;
  type: string;
  src: string;
}

const getName = (names: string[]) => {
  let res = '';
  names.forEach((v, i) => {
    if (i !== names.length - 1) res += !i ? `${v}` : `.${v}`;
  });
  return res;
};

/**
 * FileObjectから操作可能なObjectへ変換
 * @param file 対象データ
 * @returns Promise<Object>
 */
export const file2Object = async (file:File) => new Promise<Res>((resolve) => {
  const splitName = file.name.split('.');
  const name = getName(splitName);
  const type = `.${splitName.pop()}`;

  // 画像取得
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = (ev) => {
    const res = ev.target?.result ? ev.target.result : '';
    if (typeof res === 'string') {
      console.group('File 2 Object');
      console.log('name : ', name);
      console.log('type : ', type);
      console.log('src : ', res);
      console.groupEnd();
      resolve({
        file: cloneDeep(file),
        name,
        type,
        src: res,
      });
    }
  };
});
