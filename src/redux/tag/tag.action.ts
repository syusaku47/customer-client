import actionCreatorFactory from 'typescript-fsa';
import { TagType } from '../../type/tag/tag.type';

const ActionCreator = actionCreatorFactory('tag');

export const TagActions = {
  api: {
    /** マイカー種別 */
    masterMyCarType: { getList: ActionCreator('master/my/car/type/get/list') },
    /** 〜部位系全般 */
    part: { getList: ActionCreator('part/get/list') },
    /** 関連タグ */
    relevantTag: { getList: ActionCreator('relevant/tag/get/list') },
  },
  setMasterMyCarTypeList: ActionCreator<TagType[]>('set/my/car/type/list'),
  setPartList: ActionCreator<TagType[]>('set/part/list'),
  setRelevantTagList: ActionCreator<TagType[]>('set/relevant/part/list'),
  resetState: ActionCreator('reset/state'),
};
