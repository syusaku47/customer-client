import * as lodash from 'lodash';
import { TagType } from '../../type/tag/tag.type';

export class TagModel {
  public data: (TagType & { flag: boolean; })[];

  constructor(tags: TagType[], editData?: number[]) {
    this.data = lodash.cloneDeep(
      tags.map((v) => {
        const isFind = editData?.find((v2) => v2 === v.id);
        return ({ ...v, flag: Boolean(isFind) || false });
      }),
    );
  }

  changeFlag(id: number) {
    const index = this.data.findIndex((v) => v.id === id);
    this.data[index].flag = !this.data[index].flag;
  }

  getSendData(): number[] {
    const list:number[] = [];
    this.data.forEach((v) => {
      if (v.flag) list.push(v.id);
    });
    return list.length ? list : [];
  }
}
