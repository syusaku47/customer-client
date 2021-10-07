import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { DialogActions } from '../../../../../redux/dialog/dialog.action';
import { EditSP } from '../../../../dialogs/edit/edit.sp';
import { Button } from '../../../../ui/button/button';
import { TopLabelInputField } from '../../../../ui/input-field/top-label-input-field/top-label-input-field';
import { EstimateDetailSearchSP } from '../search/estimate-detail-search.sp';
import './estimate-detail-edit.sp.scss';
import { useDidMount } from '../../../../../hooks/life-cycle';
import { EstimateActions } from '../../../../../redux/estimate/estimate.action';
import { Required } from '../../../../ui/required/required';
import { EstimateMeisaiValidation } from '../../../../../model/validation/estimate/estimate-meisai.validation';
import { ValidationLengthUnder255Byte } from '../../../../../model/validation/validation-length-under-255-byte';
import { ValidationMax100Million } from '../../../../../model/validation/validation-max-100-million';
import { ValidationLengthUnder10, ValidationLengthUnder13, ValidationLengthUnder500 } from '../../../../../model/validation';
import { ValidationMax10Billion } from '../../../../../model/validation/validation-max-10-billion';
import { State } from '../../../../../redux/root.reducer';
import { Select } from '../../../../ui/select/select';
import { MasterActions } from '../../../../../redux/master/master.action';
import { EstimateMeisai } from '../../../../../type/estimate/estimate-meisai.type';
import { CommonCollection } from '../../../../../collection/common/common.collection';

type Props = {
  estimateId: number;
  data?: EstimateMeisai;
  callback: () => void;
};

export const EstimateDetailEditSP = (props: Props) => {
  const { data, callback, estimateId } = props;

  /* Hook */
  const dispatch = useDispatch();

  /* MasterList */
  const largeCategoryList = useSelector((state:State) => state.master.largeCategoryList, isEqual);
  const middleCategoryList = useSelector((state:State) => state.master.middleCategoryList, isEqual);
  const unitList = useSelector((state:State) => state.master.unitList, isEqual);

  /* State */
  const [kubun, setKubun] = useState(1);
  const [daibunrui, setDaibunrui] = useState(NaN);
  const [chubunrui, setChubunrui] = useState(NaN);
  const [categoryIndex, setCategoryIndex] = useState(NaN);
  const [subCategoryIndex, setSubCategoryIndex] = useState(NaN);
  const [constructName, setConstructName] = useState('');
  const [standard, setStandard] = useState('');
  const [suryo, setSuryo] = useState(0);
  const [unit, setUnit] = useState(NaN);
  const [tanka, setTanka] = useState(0);
  const [genka, setGenka] = useState(0);
  const [remark, setRemark] = useState('');

  const [touch, setTouch] = useState(false);

  /* Callback */
  const handleClickPost = useCallback(() => {
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
        remark,
      },
    )) {
      dispatch(DialogActions.pushMessage({
        title: '案件情報登録',
        message: ['未入力／入力不備項目があります'],
        callback: () => setTouch(true),
      }));
      return;
    }

    dispatch(EstimateActions.api.meisai.post({
      /* TODO 要確認 */
      param: {
        estimate_id: estimateId,
        meisai_id: data?.id,
        data: {
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
          remark,
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
    suryo,
    categoryIndex,
    subCategoryIndex,
    unit,
    tanka,
    genka,
    data?.id,
    remark,
  ]);

  const handleClickSearch = useCallback(() => {
    dispatch(
      DialogActions.push({
        title: '見積明細検索',
        element: <EstimateDetailSearchSP
          estimateMode={data ? 'update' : 'add'}
          id={estimateId}
        />,
      }),
    );
  }, [data, estimateId]);

  /* Effect */
  useDidMount(() => {
    if (!data) return;
    dispatch(EstimateActions.api.meisai.get({
      param: {
        id: data.quote_id,
        meisai_id: data.id,
      },
      callback: (v) => {
        setKubun(v.item_kubun || NaN);
        setDaibunrui(v.category || NaN);
        setChubunrui(v.sub_category || NaN);
        setConstructName(v.construction_materials_name || '');
        setStandard(v.standard || '');
        setSuryo(v.quantity || NaN);
        setUnit(v.unit || NaN);
        setTanka(v.quote_unit_price || NaN);
        setGenka(v.prime_cost || NaN);
        setCategoryIndex(v.index || NaN);
        setSubCategoryIndex(v.sub_index || NaN);
      },
    }));
  });

  useDidMount(() => {
    dispatch(MasterActions.api.largeCategory.getList({}));
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

  return (
    <EditSP mode={data ? 'update' : 'add'} callback={handleClickPost}>
      <div className="edit_sp_body_inner estimate_detail_edit_sp">
        <div className="category_wrap">
          <div className="item_wrap">
            <div className="item_label separate">
              <span>商品区分</span>
              {!data && (
                <Button
                  size="md"
                  color="secondary"
                  className="item_btn_right"
                  onClick={handleClickSearch}
                >
                  明細検索
                </Button>
              )}
            </div>
            <div className="item_body item_select full_width">
              <Select
                value={kubun}
                onChange={(v) => setKubun(Number(v))}
                defaultLabel="指定無し"
                options={CommonCollection.shohinKubunList}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_label">
              大分類
              <Required />
            </div>
            <div className="item_body item_select full_width">
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
            <div className="item_label">
              中分類
              <Required />
            </div>
            <div className="item_body item_select full_width">
              <Select
                value={chubunrui}
                onChange={(v) => setChubunrui(Number(v))}
                defaultLabel="指定無し"
                options={middleCategoryList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
                require
                touch={touch}
              />
            </div>
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="工事・資材名"
              className="full_width"
              value={constructName}
              onChange={(e) => setConstructName(e.target.value)}
              require
              validationList={ValidationLengthUnder255Byte}
              touch={touch}
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="規格"
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              validationList={ValidationLengthUnder255Byte}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="数量"
              type="number"
              value={suryo}
              onChange={(e) => setSuryo(Number(e.target.value))}
              validationList={[
                ...ValidationMax100Million,
                ...ValidationLengthUnder13,
              ]}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <div className="item_label">
              単位
              <Required />
            </div>
            <div className="item_body item_select full_width">
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
            <TopLabelInputField
              label="見積単価"
              type="number"
              value={tanka}
              onChange={(e) => setTanka(Number(e.target.value))}
              className="full_width"
              validationList={[
                ...ValidationMax10Billion,
                ...ValidationLengthUnder10,
              ]}
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              type="number"
              label="原価"
              value={genka}
              onChange={(e) => setGenka(Number(e.target.value))}
              validationList={[
                ...ValidationMax10Billion,
                ...ValidationLengthUnder10,
              ]}
              className="full_width"
            />
          </div>
          <div className="item_wrap">
            <TopLabelInputField
              label="備考"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="full_width"
              validationList={ValidationLengthUnder500}
            />
          </div>
        </div>
      </div>
    </EditSP>
  );
};
