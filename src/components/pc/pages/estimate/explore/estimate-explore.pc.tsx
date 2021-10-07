import { useDispatch, useSelector } from 'react-redux';
import {
  useCallback, useEffect, useState,
} from 'react';
import * as lodash from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { EstimateMeisaiListPC } from '../../../layout/body/list/estimate-meisai-list/estimate-meisai-list.pc';
import { State } from '../../../../../redux/root.reducer';
import { useWillUnMount } from '../../../../../hooks/life-cycle';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { EstimateMeisaiSideMenu, EstimateMeisaiListType } from '../../../../../type/estimate/estimate-meisai.type';
import { EstimateSideMenu } from '../side-menu/estimate-side-menu.pc';
import { EditPriceAreaState } from '../../../../../type/estimate/estimate.type';
import { Resize } from '../../../../ui/resize/resize';

type Props = {
  id?: number;
  priceData: EditPriceAreaState;
  callback?: (meisaiList:EstimateMeisaiListType[]) => void;
  callbackSelectCategory?: (v:{
    daibunrui?: number, chubunrui?: number;
  } | null) => void;
  allowEdit?: boolean;
  meisaiList?: EstimateMeisaiListType[];
}

export const EstimateExplore = (props:Props) => {
  const {
    id,
    priceData,
    callback,
    allowEdit,
    meisaiList: _meisaiList,
    callbackSelectCategory,
  } = props;

  /* Hooks */
  const meisaiSideMenu = useSelector((state: State) => state.estimate.meisaiSideMenu);
  const dispatch = useDispatch();

  /* State */
  const [sideMenuList, setSideMenuList] = useState<EstimateMeisaiSideMenu | null>(null);
  const [meisaiList, setMeisaiList] = useState<EstimateMeisaiListType[]>([]);
  const [selectData, setSelectData] = useState<{
    daibunrui?: number, chubunrui?: number;
  } | null>(null);

  /* Callback */
  const handleChangeBunrui = useCallback(
    (v:{ daibunrui?: number | undefined;
      chubunrui?: number | undefined;}) => {
      setSelectData(v);
      if (callbackSelectCategory) { callbackSelectCategory(v); }
    },
    [callbackSelectCategory],
  );

  /* Effect */
  useEffect(() => {
    if (id) {
      dispatch(EstimateActions.api.meisai.getSideMenuList({ param: { id } }));
    }
  }, [id]);

  useEffect(() => {
    if (!id && id !== 0) return;
    dispatch(EstimateActions.api.meisai.getList({
      param: {
        id,
        data: {
          category: selectData?.daibunrui,
          sub_category: selectData?.chubunrui,
        },
      },
      callback: (data) => {
        setMeisaiList(cloneDeep(data));
        if (callback) callback(cloneDeep(data));
      },
    }));
  }, [selectData, id]);

  useEffect(() => {
    if (meisaiSideMenu) {
      setSideMenuList(lodash.cloneDeep(meisaiSideMenu));
    }
  }, [meisaiSideMenu]);

  useWillUnMount(() => {
    setSideMenuList(null);
    setMeisaiList([]);
  });

  // useEffect(() => {
  //   if (callback)callback(meisaiList);
  // }, [meisaiList]);

  useEffect(() => {
    if (_meisaiList) {
      setMeisaiList(cloneDeep(_meisaiList));
    }
  }, [_meisaiList]);

  return (
    <>
      <div className="price_box">
        <div>見積金額合計 : <strong>¥{priceData.estimate_total_price.toLocaleString() ?? 0}</strong></div>
        <div>原価金額合計 : <strong>¥{priceData.genka_total_price.toLocaleString() ?? 0}</strong></div>
        <div>粗利額 : <strong>¥{priceData.arari_price.toLocaleString() ?? 0}</strong></div>
        <div>粗利率 : <strong> {priceData.arari_percent.toLocaleString() ?? 0}%</strong></div>
      </div>
      <div className="estimate_box">
        <Resize enabled={{ right: true }}>
          <EstimateSideMenu
            estimateId={id}
            data={sideMenuList}
            callback={handleChangeBunrui}
            allowEdit={allowEdit}
          />
        </Resize>
        <EstimateMeisaiListPC
          estimateId={id}
          selectBunrui={selectData}
          list={meisaiList}
          callbackSetList={(v) => {
            setMeisaiList(cloneDeep(v));
            if (callback) callback(cloneDeep(v));
            if (id) {
              dispatch(EstimateActions.api.meisai.getSideMenuList({ param: { id } }));
            }
          }}
          callback={(v) => {
            window.console.log('row click :', v);
          }}
          allowEdit={allowEdit}
        />
      </div>
    </>
  );
};

EstimateExplore.defaultProps = {
  allowEdit: true,
};
