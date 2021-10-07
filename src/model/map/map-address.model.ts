import * as lodash from 'lodash';
import { AddressComponent } from '../../type/map/map.type';
import { zenkaku2HankakuNum } from '../../utilities/zenkaku-2-hankaku';
import { prefectures } from '../../collection/prefectures';

export class MapAddressModel {
  prefecture = 0;

  postal1 = '';

  postal2 = '';

  city = '';

  address = '';

  bill = '';

  private readonly type = {
    prefecture: 'administrative_area_level_1',
    city: 'locality',
    address: 'sublocality',
    postal: 'postal_code',
  }

  private dataLen = 0;

  constructor(param: AddressComponent[]) {
    const data = lodash.cloneDeep(param).reverse();
    this.dataLen = data.length;

    data.forEach((v, i) => {
      v.types.forEach((type) => {
        if (i === this.dataLen - 1 && !type.match('sublocality')) {
          const find = v.types.find((v2) => v2.match('sublocality'));
          if (!find) {
            this.setBill(v);
          } else {
            this.setAddress(v);
          }
        } else if (type === this.type.prefecture) {
          this.setPrefecture(v);
        } else if (type === this.type.city || type === 'sublocality_level_1') {
          this.city += v.long_name;
        } else if (type === this.type.address) {
          const find = v.types.find((v2) => v2 === 'sublocality_level_1');
          if (!find) { this.setAddress(v); }
        } else if (type === this.type.postal) {
          this.setPostal(v);
        }
      });
    });

    this.address = this.address.replace('-', '');

    this.postal1 = zenkaku2HankakuNum(this.postal1);
    this.postal2 = zenkaku2HankakuNum(this.postal2);
    this.city = zenkaku2HankakuNum(this.city);
    this.address = zenkaku2HankakuNum(this.address);
    this.bill = zenkaku2HankakuNum(this.bill);
    console.log('city', this.city);
    console.log('city', this.city);
  }

  private setPostal(param: AddressComponent) {
    const { long_name } = param;
    const postal = long_name.split('-');
    this.postal1 = postal[0] ?? '';
    this.postal2 = postal[1] ?? '';
  }

  private setPrefecture(param: AddressComponent) {
    const { long_name } = param;
    const prefecture = prefectures.find((v) => v.label === long_name)?.value;
    this.prefecture = prefecture ?? 0;
  }

  private setBill(param: AddressComponent) {
    const { long_name } = param;
    if (!long_name.match(/[0-9０-９]/)) {
      this.bill = long_name;
    } else {
      this.address += `-${long_name}`;
    }
  }

  private setAddress(param: AddressComponent) {
    const { long_name } = param;
    console.log(long_name);

    let address = long_name;
    if (long_name.match(/[0-9０-９]/)) {
      address = `-${address}`;
    }
    address = address.replace('丁目', '');
    this.address += address;
  }
}
