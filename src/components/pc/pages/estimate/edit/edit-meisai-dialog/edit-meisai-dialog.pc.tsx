import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { EditPC } from '../../../../../dialogs/edit/edit.pc';
import { Select } from '../../../../../ui/select/select';
import { Required } from '../../../../../ui/required/required';
import { SelectData } from '../../../../layout/body/list/estimate-meisai-list/estimate-meisai-list.pc';
import { useDidMount, useWillUnMount } from '../../../../../../hooks/life-cycle';
import { Input } from '../../../../../ui/input/input';
import { MasterActions } from '../../../../../../redux/master/master.action';
import { State } from '../../../../../../redux/root.reducer';
import { EstimateActions } from '../../../../../../redux/estimate/estimate.action';
import { ValidationLengthUnder255Byte } from '../../../../../../model/validation/validation-length-under-255-byte';
import { ValidationLengthUnder10, ValidationLengthUnder13 } from '../../../../../../model/validation';
import { ValidationMax100Million } from '../../../../../../model/validation/validation-max-100-million';
import { ValidationMax10Billion } from '../../../../../../model/validation/validation-max-10-billion';
import { EstimateMeisaiValidation } from '../../../../../../model/validation/estimate/estimate-meisai.validation';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { CommonCollection } from '../../../../../../collection/common/common.collection';

type Props = {
  estimateId: number;
  data?: Required<SelectData>;
  callback: () => void;
}

export const EditMeisaiDialogPC = (props:Props) => {
  const { data, callback, estimateId } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* MasterList */
  const largeCategoryList = useSelector((state:State) => state.master.largeCategoryList, isEqual);
  const middleCategoryList = useSelector((state:State) => state.master.middleCategoryList, isEqual);
  const unitList = useSelector((state:State) => state.master.unitList, isEqual);

  /* State */
  const [kubun, setKubun] = useState(1);
  const [daibunrui, setDaibunrui] = useState(NaN);
  const [chubunrui, setChubunrui] = useState(NaN);
  // TODO 大分類・中分類表示順の使い方
  const [categoryIndex, setCategoryIndex] = useState(NaN);
  const [subCategoryIndex, setSubCategoryIndex] = useState(NaN);
  const [constructName, setConstructName] = useState('');
  const [standard, setStandard] = useState('');
  const [suryo, setSuryo] = useState(0);
  const [unit, setUnit] = useState(NaN);
  const [tanka, setTanka] = useState(0);
  const [genka, setGenka] = useState(0);

  const [touch, setTouch] = useState(false);

  /* Callback */
  const handleClickSave = useCallback(() => {
    if (EstimateMeisaiValidation(
      {
        quote_id: estimateId,
        item_kubun: kubun,
        category: daibunrui,
        sub_category: chubunrui,
        category_index: categoryIndex,
        sub_category_index: subCategoryIndex,
        construction_materials_name: constructName,
        standard,
        quantity: suryo,
        unit,
        quote_unit_price: tanka,
        prime_cost: genka,
        // TODO 任意項目に変える
        remark: '',
      },
    )) {
      dispatch(DialogActions.pushMessage({
        title: '見積明細作成',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(EstimateActions.api.meisai.post({
      param: {
        estimate_id: estimateId,
        meisai_id: data?.id,
        data: {
          quote_id: estimateId,
          item_kubun: kubun,
          category: daibunrui,
          sub_category: chubunrui,
          category_index: data ? categoryIndex : undefined,
          sub_category_index: data ? subCategoryIndex : undefined,
          construction_materials_name: constructName,
          standard,
          quantity: suryo,
          unit,
          quote_unit_price: tanka,
          prime_cost: genka,
        },
      },
      onSuccess: callback,
      onError: () => {
        setTouch(true);
      },
    }));
  }, [
    estimateId,
    kubun,
    daibunrui,
    chubunrui,
    constructName,
    standard,
    categoryIndex,
    subCategoryIndex,
    suryo,
    unit,
    tanka,
    genka,
    data,
  ]);

  /* 詳細情報取得 */
  useDidMount(() => {
    if (!data) return;
    dispatch(EstimateActions.api.meisai.get({
      param: {
        id: data.estimateId,
        meisai_id: data.id,
      },
      callback: (v) => {
        setKubun(v.item_kubun ?? 1);
        setDaibunrui(v.category ?? NaN);
        setChubunrui(v.sub_category ?? NaN);
        setConstructName(v.construction_materials_name ?? '');
        setStandard(v.standard ?? '');
        setSuryo(v.quantity ?? 0);
        setUnit(v.unit ?? NaN);
        setTanka(v.quote_unit_price ?? 0);
        setGenka(v.prime_cost ?? 0);
        setCategoryIndex(v.index ?? NaN);
        setSubCategoryIndex(v.sub_index ?? NaN);
      },
    }));
  });

  /* Master */
  useDidMount(() => {
    dispatch(MasterActions.api.largeCategory.getList({}));
    // // dispatch(MasterActions.api.middleCategory.getList({
    //   category_id: 1,
    // }));
    dispatch(MasterActions.api.unit.getList({}));
  });

  useEffect(() => {
    if (daibunrui) {
      dispatch(MasterActions.api.middleCategory.getList({
        category_id: daibunrui,
      }));
      if (chubunrui) {
        setChubunrui(NaN);
      }
    } else {
      dispatch(MasterActions.setMiddleCategoryList([]));
    }
  }, [daibunrui]);

  useWillUnMount(() => {
    dispatch(MasterActions.setMiddleCategoryList([]));
  });

  return (
    <EditPC
      mode="dialog"
      callback={handleClickSave}
    >
      <div className="EditMeisaiDialogPC">
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">商品区分</div>
            <Select
              value={kubun}
              label=""
              onChange={(v) => setKubun(Number(v))}
              defaultLabel="指定無し"
              options={CommonCollection.shohinKubunList}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">大分類<Required /></div>
            <Select
              value={daibunrui}
              onChange={(v) => setDaibunrui(Number(v))}
              defaultLabel="指定無し"
              options={largeCategoryList.map((v) => ({
                text: v.name, value: v.id,
              }))}
              require
              touch={touch}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">中分類<Required /></div>
            <Select
              value={chubunrui}
              onChange={(v) => setChubunrui(Number(v))}
              defaultLabel="指定無し"
              options={middleCategoryList.map((v) => ({
                text: v.name, value: v.id,
              }))}
              // options={[null].map(() => ({
              //   text: 'テスト', value: 1,
              // }))}
              require
              touch={touch}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">工事・資材名<Required /></div>
            <Input
              value={constructName}
              onChange={(e) => setConstructName(e.target.value)}
              require
              validationList={ValidationLengthUnder255Byte}
              touch={touch}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">規格</div>
            <Input
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              validationList={ValidationLengthUnder255Byte}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">数量</div>
            <Input
              type="number"
              value={suryo}
              onChange={(e) => setSuryo(Number(e.target.value))}
              validationList={[
                ...ValidationMax100Million,
                ...ValidationLengthUnder13,
              ]}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">単位<Required /></div>
            <Select
              value={unit}
              onChange={(v) => setUnit(Number(v))}
              defaultLabel="指定無し"
              options={unitList.map((v) => ({
                text: v.name, value: v.id,
              }))}
              require
              touch={touch}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">見積単価</div>
            <Input
              type="number"
              value={tanka}
              onChange={(e) => setTanka(Number(e.target.value))}
              validationList={[
                ...ValidationMax10Billion,
                ...ValidationLengthUnder10,
              ]}
            />
          </div>
        </div>
        <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">原価</div>
            <Input
              type="number"
              value={genka}
              onChange={(e) => setGenka(Number(e.target.value))}
              validationList={[
                ...ValidationMax10Billion,
                ...ValidationLengthUnder10,
              ]}
            />
          </div>
        </div>
        {/* <div className="item_wrap">
          <div className="item_box">
            <div className="item_head">備考</div>
            <Input
              type="number"
              value={remark}
              onChange={(e) => setRemark((e.target.value))}
              validationList={ValidationLengthUnder500}
            />
          </div>
        </div> */}
      </div>
    </EditPC>
  );
};
