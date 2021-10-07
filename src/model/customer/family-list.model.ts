import cloneDeep from 'lodash/cloneDeep';
import { RequiredPartial } from '../../type/api.type';
import { Family } from '../../type/customer/family.type';

export type ListFamily = RequiredPartial<
  Family & {id: number; index?: number; },
  'mobile_phone' | 'id' | 'birth_date'
  >

export class FamilyListModel {
  list: ListFamily[] = [];

  constructor(data?: Family[]) {
    this.list = cloneDeep(data ? data.map((v, i) => ({ ...v, index: i })) : []);
  }

  add(data: ListFamily) {
    this.sortHeader('asc');
    const index = this.list.length || 0;
    this.list.push(cloneDeep({ ...data, index }));
  }

  edit(data: ListFamily) {
    const findIndex = this.list.findIndex((v) => v.index === data.index);
    if (findIndex === -1) return;
    this.list[findIndex] = cloneDeep(data);
  }

  remove(data: ListFamily) {
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
   * 0:氏名 1:続柄
   * 2:携帯電話 3:生年月日 無し:
   * @param {asc | desc} order desc:降順
   * @param {number} index
   */
  sortHeader(order: 'asc' | 'desc', index?: number) {
    let key: keyof ListFamily = 'index';

    switch (index) {
      case 0:
        key = 'name';
        break;
      case 1:
        key = 'relationship';
        break;
      case 2:
        key = 'mobile_phone';
        break;
      case 3:
        key = 'birth_date';
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

  format(customerId: number) {
    const family_birthday_array:string[] = [];
    const family_mobile_tel_array:string[] = [];
    const family_customer_id_array:string[] = [];
    const family_id_array:string[] = [];
    const family_name_array:string[] = [];
    const family_relation_array: string[] = [];

    this.list.forEach((v) => {
      family_birthday_array.push(String(v.birth_date) ?? '');
      family_mobile_tel_array.push(v.mobile_phone ?? '');
      family_customer_id_array.push(String(customerId) ?? '');
      family_id_array.push(String(v.id) ?? '');
      family_name_array.push(v.name ?? '');
      family_relation_array.push(String(v.relationship) ?? '');
    });

    return {
      family_birthday_array,
      family_mobile_tel_array,
      family_customer_id_array,
      family_id_array,
      family_name_array,
      family_relation_array,
    };
  }
}
