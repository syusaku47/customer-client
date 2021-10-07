import cloneDeep from 'lodash/cloneDeep';
import { Pet } from '../../type/customer/pet.type';
import { RequiredPartial } from '../../type/api.type';

export type ListPet = RequiredPartial<
  Pet & { id: number; index?: number; },
  'age' | 'type' | 'pet_id' | 'id'
  >

export class PetListModel {
  list: ListPet[] = [];

  constructor(data?: Pet[]) {
    this.list = cloneDeep(data ? data.map((v, i) => ({ ...v, index: i })) : []);
  }

  add(data: ListPet) {
    this.sortHeader('asc');
    const index = this.list.length || 0;
    this.list.push(cloneDeep({ ...data, index }));
  }

  edit(data: ListPet) {
    const findIndex = this.list.findIndex((v) => v.index === data.index);
    console.log('c');
    if (findIndex === -1) return;
    console.log('d');
    this.list[findIndex] = cloneDeep(data);
  }

  remove(data: ListPet) {
    this.sortHeader('asc');
    const findIndex = this.list.findIndex((v) => v.index === data.index);
    if (findIndex === -1) return;
    this.list.splice(findIndex, 1);
    this.list.forEach((_, i) => {
      this.list[i].index = i;
    });
  }

  /**
   * テーブルヘッダーのソート
   * 0:氏名 1:種別
   * 2:性別 3:生年月日 才:
   * @param {asc | desc} order desc:降順
   * @param {number} index
   */
  sortHeader(order: 'asc' | 'desc', index?: number) {
    let key: keyof ListPet = 'index';

    switch (index) {
      case 0:
        key = 'name';
        break;
      case 1:
        key = 'type';
        break;
      case 2:
        key = 'sex';
        break;
      case 3:
        key = 'age';
        break;
      default:
        key = 'index';
        break;
    }

    this.list.sort((a, b) => {
      let nullValue: string | number = 0;
      if (typeof a[key] === 'string') {
        nullValue = '';
      }
      if (order === 'asc') {
        return (a[key] || nullValue) > (b[key] || nullValue) ? 1 : -1;
      }
      return (a[key] || nullValue) < (b[key] || nullValue) ? 1 : -1;
    });
  }

  format() {
    const pet_age_array:string[] = [];
    const pet_category_array:string[] = [];
    const pet_customer_id_array:string[] = [];
    const pet_id_array:string[] = [];
    const pet_name_array:string[] = [];
    const pet_sex_array: string[] = [];

    this.list.forEach((v) => {
      pet_age_array.push(String(v.age) ?? '');
      pet_category_array.push(v.type ?? '');
      pet_customer_id_array.push(String(v.id) ?? '');
      pet_id_array.push(String(v.pet_id) ?? '');
      pet_name_array.push(v.name ?? '');
      pet_sex_array.push(String(v.sex) ?? '');
    });

    return {
      pet_age_array,
      pet_category_array,
      pet_customer_id_array,
      pet_id_array,
      pet_name_array,
      pet_sex_array,
    };
  }
}
