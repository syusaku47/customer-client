import {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cloneDeep, isEqual } from 'lodash';
import { EstimateCollection } from '../../../../../../collection/estimate/estimatecollection';
import { Select } from '../../../../../ui/select/select';
import { Table } from '../../../../../ui/table/table';
import { EstimateActions } from '../../../../../../redux/estimate/estimate.action';
import { EstimateMeisaiListType } from '../../../../../../type/estimate/estimate-meisai.type';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { EstimateListType } from '../../../../../../type/estimate/estimate.type';
import { MasterActions } from '../../../../../../redux/master/master.action';
import { State } from '../../../../../../redux/root.reducer';
import { MasterLargeCategory } from '../../../../../../type/master/master-large-category.type';

export type SelectList = {
  id: number;
  index: number;
}[]

type Props = {
  estimateId?: number;
  selectEstimate: EstimateListType | null;
  callback: (list:EstimateMeisaiListType[]) => void;
}

export const MeisaiListInDialog = (props:Props) => {
  // eslint-disable-next-line
  const { estimateId, callback, selectEstimate } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* MasterList */
  const [selected, setSelected] = useState<number[]>([]);
  const largeCategoryList = useSelector((state:State) => state.master.largeCategoryList, isEqual);
  const middleCategoryList = useSelector((state:State) => state.master.middleCategoryList, isEqual);

  /* State */
  const [allList, setAllList] = useState<EstimateMeisaiListType[]>([]);
  const [daibunruiList, setDaibunruiList] = useState<MasterLargeCategory[]>([]);
  const [daibunrui, setDaibunrui] = useState(NaN);
  const [chubunrui, setChubunrui] = useState(NaN);

  /* Callback */
  const handleClickRow = useCallback((param: EstimateMeisaiListType) => {
    const findIndex = allList.findIndex((v) => v.id === param.id);
    if (findIndex !== -1) {
      callback(cloneDeep([param]));
      setSelected([findIndex]);
    } else {
      setSelected([]);
      callback(cloneDeep([]));
    }
  },
  [allList]);

  const handleClickMulti = useCallback((param: EstimateMeisaiListType[]) => {
    setSelected(param.map((v2) => allList.findIndex((v3) => v3.id === v2.id)));
    callback(cloneDeep(param));
  }, [allList]);

  const settingDaibunruiList = useCallback((dataList:EstimateMeisaiListType[]) => {
    const list = Array.from(new Set(dataList.map((v) => v.category)));
    const _daibunruiList:MasterLargeCategory[] = [];
    list.forEach((v) => {
      const find = largeCategoryList.find((v2) => Number(v2.id) === Number(v));
      if (find) {
        _daibunruiList.push(cloneDeep(find));
      }
    });

    setDaibunruiList(cloneDeep(_daibunruiList));
  }, [largeCategoryList]);

  /* Effect */
  useEffect(() => {
    if (selectEstimate) {
      dispatch(EstimateActions.api.meisai.getList({
        param: {
          id: selectEstimate.id,
        },
        callback: (v) => {
          settingDaibunruiList(cloneDeep(v));
        },
      }));
      dispatch(EstimateActions.api.meisai.getList({
        param: {
          id: selectEstimate.id,
          data: {
            category: daibunrui,
            sub_category: chubunrui,
          },
        },
        callback: (v) => {
          setAllList(cloneDeep(v));
          callback(cloneDeep(v));
          setSelected(v.map((_, i) => i));
        },
      }));
    }
    return () => {
      setAllList([]);
    };
  }, [selectEstimate, daibunrui, chubunrui]);

  useDidMount(() => {
    dispatch(MasterActions.api.largeCategory.getList({}));
  });

  useEffect(() => {
    setDaibunrui(NaN);
    setChubunrui(NaN);
  }, [selectEstimate]);

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

  // const daibunruiList = useMemo(() => {
  //   const list = Array.from(new Set(allList.map((v) => v.category)));
  //   const _daibunruiList:{ text:string, value: string }[] = [];
  //   list.forEach((v) => {
  //     const find = largeCategoryList.find((v2) => Number(v2.id) === Number(v));
  //     if (find) {
  //       _daibunruiList.push({ text: find.name, value: find.id });
  //     }
  //   });
  //   return _daibunruiList;
  // }, [allList, largeCategoryList]);

  return (
    <section className="right_box">
      <>
        <strong style={{ marginBottom: '5px' }}>見積明細一覧</strong>
        <div className="search_area">
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">大分類</div>
              <Select
                value={daibunrui}
                label=""
                onChange={(v) => setDaibunrui(Number(v))}
                defaultLabel="全て"
                options={daibunruiList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
          </div>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">中分類</div>
              <Select
                value={chubunrui}
                label=""
                onChange={(v) => setChubunrui(Number(v))}
                defaultLabel="全て"
                options={middleCategoryList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
          </div>
        </div>
        <div className="result_area list_area">
          <div className="inner">
            <div className="table_responsive">
              <Table
                className="table_selectable table_sortable table_sticky"
                header={EstimateCollection.estimateSearchHeader}
                onClickRow={handleClickRow}
                onClickMulti={handleClickMulti}
                rowDataList={allList}
                selectedTr={selected}
                lists={allList.map((v) => ([
                  v.category_name,
                  v.sub_category_name,
                  v.component_name,
                  v.price,
                  v.prime_cost,
                  v.print_name,
                  v.standard,
                  v.quantity,
                  v.unit,
                  v.gross_profit_amount,
                  v.gross_profit_amount,
                ]))}
              />
            </div>
          </div>
        </div>
      </>
    </section>
  );
};
