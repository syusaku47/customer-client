import * as lodash from 'lodash';
import {
  EstimateMeisaiSideMenu,
} from '../../../../../type/estimate/estimate-meisai.type';

export type FolderType = { isOpen: boolean } & {
  id: number;
  index: number;
  isOpen: boolean;
  title: string;
  percent: number;
  detail_id: number
};

type MenuType = {
  isOpen: boolean;
  title: string;
  percent: number;
  daibunrui: {
    id: number;
    parent_id: number;
    index: number;
    isOpen: boolean;
    title: string;
    percent: number;
    chubunrui: FolderType[];
    detail_id: number,
  }[];
};

export class EstimateSideMenuModePC {
  public data: MenuType;

  constructor(data: EstimateMeisaiSideMenu) {
    this.data = lodash.cloneDeep({
      title: '全て',
      percent: data.percent,
      isOpen: true,
      daibunrui: data.data.map((v, i) => ({
        id: v.parent_id,
        index: i,
        title: v.parent_title,
        percent: v.parent_percent,
        parent_id: v.parent_id,
        isOpen: true,
        detail_id: v.detail_id,
        chubunrui: v.sub.map((v2, j) => ({
          id: v2.id,
          title: v2.title,
          percent: v2.percent,
          isOpen: true,
          index: j,
          detail_id: v2.id,
        })),
      })),
    });
  }

  changeOpen(param:{isAll?:boolean, daibunrui?:number}) {
    const { isAll, daibunrui } = param;
    if (isAll) {
      this.data.isOpen = !this.data.isOpen;
      return;
    }

    if (daibunrui !== undefined) {
      const findDaibunrui = this.data.daibunrui.find((v) => v.id === daibunrui);
      if (findDaibunrui) {
        findDaibunrui.isOpen = !findDaibunrui.isOpen;
      }
    }
  }

  moveFolder(param:{daibunrui?:number, chuBunrui?:number, isUp: boolean}) {
    const { daibunrui, chuBunrui, isUp } = param;

    if (daibunrui === undefined) return;
    const daibunruiIndex = this.data.daibunrui.findIndex((v) => v.id === daibunrui);
    const chubunruiIndex = this.data.daibunrui[daibunruiIndex].chubunrui
      .findIndex((v) => v.id === chuBunrui);

    if (daibunrui !== undefined && chuBunrui !== undefined) {
      const stay = lodash.cloneDeep(
        this.data.daibunrui[daibunruiIndex].chubunrui[chubunruiIndex],
      );
      const chubunruiList = this.data.daibunrui[daibunruiIndex].chubunrui;

      const moveChubunrui = () => {
        const val = isUp ? -1 : +1;
        chubunruiList[chubunruiIndex] = lodash.cloneDeep(
          chubunruiList[chubunruiIndex + val],
        );
        chubunruiList[chubunruiIndex + val] = lodash.cloneDeep(stay);
      };

      if (isUp && chubunruiIndex !== 0) {
        moveChubunrui();
      }
      if (!isUp && chubunruiIndex !== chubunruiList.length - 1) {
        moveChubunrui();
      }
      return;
    }

    if (daibunrui !== undefined) {
      const stay = lodash.cloneDeep(
        this.data.daibunrui[daibunruiIndex],
      );
      const daibunruiList = this.data.daibunrui;

      const move = () => {
        const val = isUp ? -1 : +1;
        daibunruiList[daibunruiIndex] = lodash.cloneDeep(
          daibunruiList[daibunruiIndex + val],
        );
        daibunruiList[daibunruiIndex + val] = lodash.cloneDeep(stay);
      };
      if (isUp && daibunruiIndex !== 0) {
        move();
      }
      if (!isUp && daibunruiIndex !== daibunruiList.length - 1) {
        move();
      }
    }
  }
}
