import * as lodash from 'lodash';

type InnerData = {
  contract: number,
  budget: number,
  finalPrice: number,
  completion: number,
  contrast: number,
}

export type Data = {
  j:InnerData,
  t1:InnerData,
  t2:InnerData,
  g:InnerData,
  a1:InnerData,
  a2:InnerData,
}

export const dummy:() => Data = () => ({
  j: {
    contract: 0,
    budget: 0,
    finalPrice: 0,
    completion: 0,
    contrast: 0,
  },
  t1: {
    contract: 0,
    budget: 0,
    finalPrice: 0,
    completion: 0,
    contrast: 0,
  },
  t2: {
    contract: 0,
    budget: 0,
    finalPrice: 0,
    completion: 0,
    contrast: 0,
  },
  g: {
    contract: 0,
    budget: 0,
    finalPrice: 0,
    completion: 0,
    contrast: 0,
  },
  a1: {
    contract: 0,
    budget: 0,
    finalPrice: 0,
    completion: 0,
    contrast: 0,
  },
  a2: {
    contract: 0,
    budget: 0,
    finalPrice: 0,
    completion: 0,
    contrast: 0,
  },
});

export class ProjectEditModel {
  public data: (InnerData & { id: keyof Data; })[];

  constructor(data: Data) {
    this.data = lodash.cloneDeep([
      { id: 'j', ...data.j },
      { id: 't1', ...data.t1 },
      { id: 't2', ...data.t2 },
      { id: 'g', ...data.g },
      { id: 'a1', ...data.a1 },
      { id: 'a2', ...data.a2 },
    ]);
  }

  changeInput(rowKey: keyof Data, value: number) {
    const findRow = this.data.find((v) => v.id === rowKey);
    if (findRow) {
      findRow.finalPrice = value;
    }
  }
}
