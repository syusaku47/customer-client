import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as lodash from 'lodash';
import { cloneDeep, isEqual } from 'lodash';
import { Table } from '../../../../../ui/table/table';
import './estimate-meisai-list.pc.scss';
import { EstimateCollection } from '../../../../../../collection/estimate/estimatecollection';
import { Button } from '../../../../../ui/button/button';
import { EstimateMeisaiListType } from '../../../../../../type/estimate/estimate-meisai.type';
import { EstimateActions } from '../../../../../../redux/estimate/estimate.action';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { ChangePrintNameDialogPC } from '../../../../pages/estimate/edit/change-print-name-dialog/change-print-name-dialog.pc';
import { EditMeisaiDialogPC } from '../../../../pages/estimate/edit/edit-meisai-dialog/edit-meisai-dialog.pc';
import { AddMasterMeisai } from '../../../../pages/estimate/edit/add-master-meisai/add-master-meisai';
import { State } from '../../../../../../redux/root.reducer';
import { useDidMount } from '../../../../../../hooks/life-cycle';
import { MasterActions } from '../../../../../../redux/master/master.action';
import { MathHelper } from '../../../../../../utilities/math-helper';
import { Input } from '../../../../../ui/input/input';
import { ApiEstimateMeisaiPost } from '../../../../../../redux/estimate/api/meisai/api-estimate-meisai';

export type SelectData = {
  daibunrui: number;
  chubunrui: number;
  estimateId: number;
  id: number;
}

type Props = {
  selectBunrui:{
    daibunrui?: number | undefined;
    chubunrui?: number | undefined;
} | null,
  list: EstimateMeisaiListType[];
  callback: (id: number) => void;
  callbackSetList: (v:EstimateMeisaiListType[]) => void;
  masterAdd?: boolean;
  estimateId?: number;
  allowEdit?: boolean;
}

const tableAlign = [
  {
    index: 5,
    align: 'right',
  },
  {
    index: 6,
    align: 'right',
  },
  {
    index: 7,
    align: 'right',
  },
  {
    index: 8,
    align: 'right',
  },
  {
    index: 9,
    align: 'right',
  },
];

type InputTableElementProps = {
  value: string,
  callbackBlur: (v: string | number) => void,
  type?: string,
  alignRight?: boolean;
};

const InputTableElement = (props: InputTableElementProps) => {
  // const dispatch = useDispatch();
  const {
    value: _value,
    type,
    callbackBlur,
    alignRight,
  } = props;
  const [value, setValue] = useState(_value);
  const handlerChangeValue = useCallback((v) => {
    setValue(v);
  }, []);
  const handlerBlur = useCallback(() => {
    if (value !== _value) {
      callbackBlur(value);
      if (type === 'number' && !value) {
        setValue('0');
      }
    }
  }, [_value, value]);
  useEffect(() => {
    setValue(_value);
  }, [_value]);
  return (
    <Input
      value={value}
      alignRight={alignRight}
      onChange={(e) => handlerChangeValue(e.target.value)}
      onBlur={handlerBlur}
      type={type}
    />
  );
};

export const EstimateMeisaiListPC = (props: Props) => {
  const {
    list, callback, masterAdd, estimateId, callbackSetList, selectBunrui, allowEdit,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* store */
  const unitList = useSelector((state:State) => state.master.unitList, isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>(cloneDeep([]));
  const [meisaiList, setMeisaiList] = useState<EstimateMeisaiListType[]>([]);
  const [selectData, setSelectData] = useState<SelectData[]>([]);

  /* Callback */
  const getList = useCallback(() => {
    dispatch(EstimateActions.api.meisai.getList({
      param: {
        id: Number(estimateId),
        data: {
          category: selectBunrui?.daibunrui,
          sub_category: selectBunrui?.chubunrui,
        },
      },
      callback: (v) => callbackSetList(v),
    }));
  },
  [selectData, estimateId, callbackSetList]);

  const handleClickRow = useCallback(
    (v: SelectData) => {
      setSelectData([cloneDeep(v)]);
      callback(v.id);
      const findIndex = meisaiList.findIndex((v2) => v2.id === v.id);
      if (findIndex !== -1) {
        setSelected([findIndex]);
        return;
      }
      setSelectData([]);
      setSelected([list.findIndex((v2) => v2.id === v.id)]);
    },
    [callback, meisaiList],
  );

  const handleClickMove = useCallback(
    (type:'up' | 'down') => {
      const cloneList = lodash.cloneDeep(meisaiList);
      const selectList: number[] = [];
      selectData.forEach((v) => {
        selectList.push(cloneList.findIndex((data) => data.id === v.id));
      });
      if (type === 'up') {
        /** index を昇順で並び替え */
        selectList.sort((a, b) => (a - b));
        selectList.forEach((v, i) => {
          /** 選択中のレコードで移動不可かつ一つ上のもの、一つ上のレコードの中分類が異なるものがないかの精査 */
          if (
            !selectList.find((data) => (v - 1 === data))
            && cloneList[v]?.sub_category === cloneList[v - 1]?.sub_category
          ) {
            /** リストの入れ替えと index の更新 */
            const temp = lodash.cloneDeep(cloneList[v - 1]);
            cloneList[v - 1] = lodash.cloneDeep(cloneList[v]);
            cloneList[v] = temp;
            selectList[i] = v - 1;
          }
        });
      } else {
        selectList.sort((a, b) => (b - a));
        selectList.forEach((v, i) => {
          /** 選択中のレコードで移動不可かつ一つ下のもの、一つ下のレコードの中分類が異なるものがないかの精査 */
          if (
            !selectList.find((data) => (v + 1 === data))
            && cloneList[v]?.sub_category === cloneList[v + 1]?.sub_category
          ) {
            /** リストの入れ替えと index の更新 */
            const temp = lodash.cloneDeep(cloneList[v + 1]);
            cloneList[v + 1] = lodash.cloneDeep(cloneList[v]);
            cloneList[v] = temp;
            selectList[i] = v + 1;
          }
        });
      }
      setMeisaiList(lodash.cloneDeep(cloneList));
      setSelected(selectList);
    },
    [selectData, meisaiList],
  );

  const handleClickChangePrintName = useCallback(
    () => {
      if (selectData.length !== 1 || !estimateId) return;
      const data = meisaiList.find((v) => selectData.find((v2) => v.id === v2.id));
      if (data) {
        dispatch(DialogActions.push({
          title: '見積印刷名称設定',
          element: <ChangePrintNameDialogPC
            id={data.quote_id}
            name={data.component_name}
            printName={data.print_name || data.component_name}
            meisaiId={data.id}
            callback={() => {
              dispatch(DialogActions.pop());
              getList();
            }}
          />,
        }));
      }
    },
    [getList, meisaiList],
  );

  /* 見積明細 新規作成・編集 */
  const handleClickMeisaiEdit = useCallback(
    (mode: 'add' | 'edit', rowData?:SelectData) => {
      if (!estimateId) return;
      let data: SelectData | undefined;

      if (mode === 'edit') {
        if (rowData || selectData.length === 1) {
          data = lodash.cloneDeep(rowData || selectData[0]);
        }
      }

      dispatch(DialogActions.push({
        title: '見積明細作成',
        className: '',
        element: <EditMeisaiDialogPC
          estimateId={estimateId}
          data={data}
          callback={() => {
            getList();
            // dispatch(EstimateActions.api.meisai.getList({
            //   param: {
            //     id: estimateId,
            //     data: {
            //       category: selectBunrui?.daibunrui,
            //       sub_category: selectBunrui?.chubunrui,
            //     },
            //   },
            //   callback: (v) => callbackSetList(cloneDeep(v)),
            // }));
          }}
        />,
      }));
    },
    [selectData, meisaiList, estimateId, callbackSetList, selectBunrui],
  );

  /* ダブルクリックハンドラ */
  const handleDbClickRow = useCallback(
    (v: EstimateMeisaiListType) => {
      const data = {
        id: v.id,
        daibunrui: v.category,
        chubunrui: v.sub_category,
        estimateId: v.quote_id,
      };
      handleClickRow(cloneDeep(data));

      handleClickMeisaiEdit('edit', cloneDeep(data));
    },
    [handleClickRow, handleClickMeisaiEdit],
  );

  /* 明細削除 */
  const handleClickDelete = useCallback(
    () => {
      if (!selectData.length) return;

      dispatch(DialogActions.pushMessage({
        title: '見積明細削除',
        message: ['削除しますか'],
        isCancel: true,
        callback: () => {
          // Promise.all(selectData.map((v) => new ApiEstimateMeisaiDelete({
          //   id: v.estimateId,
          //   meisai_id: v.id,
          // })))
          //   .then(() => {
          //     console.log('成功');

          //     getList();
          //   })
          //   .catch(() => {
          //     console.log('失敗');
          //   });
          // selectData.forEach((v) => {
          dispatch(EstimateActions.api.meisai.delete({
            param: selectData.map((v) => (
              {
                id: v.estimateId,
                meisai_id: v.id,
              })),
            onSuccess: () => {
              // if (!estimateId) return;
              getList();
              // dispatch(EstimateActions.api.meisai.getList({
              //   param: {
              //     id: estimateId,
              //     data: {
              //       category: selectBunrui?.daibunrui,
              //       sub_category: selectBunrui?.chubunrui,
              //     },
              //   },
              //   callback: (v) => callbackSetList(cloneDeep(v)),
              // }));
            },
          }));
          // });
        },
      }));
    },
    [getList, selectData, estimateId, selectBunrui, callbackSetList],
  );

  /* マスタから迷彩登録 */
  const handleClickAddMasterMeisai = useCallback(
    () => {
      dispatch(DialogActions.push({
        title: '見積明細登録',
        className: 'max_height_dialog max_width_dialog',
        element: <AddMasterMeisai
          callback={() => {
            // if (!estimateId) return;
            dispatch(DialogActions.pop());
            getList();
            // dispatch(EstimateActions.api.meisai.getList({
            //   param: {
            //     id: estimateId,
            //     data: {
            //       category: selectBunrui?.daibunrui,
            //       sub_category: selectBunrui?.chubunrui,
            //     },
            //   },
            //   callback: callbackSetList,
            // }));
          }}
        />,
      }));
    },
    [],
  );

  /* Effect */
  useEffect(() => {
    setSelectData([]);
    setSelected([]);
    setMeisaiList(cloneDeep(list));
    return () => {
      setMeisaiList([]);
    };
  }, [list]);

  useDidMount(() => {
    if (!unitList.length) {
      dispatch(MasterActions.api.unit.getList({}));
    }
  });

  const borderSpan = [...meisaiList]
    .map((v, i) => (v.sub_category !== meisaiList[i + 1]?.sub_category ? i : false))
    .filter((v) => !!v) as number[];

  const tableList = meisaiList.map((v) => (
    [
      v.component_name,
      v.print_name || v.component_name,
      <InputTableElement
        value={v.standard}
        callbackBlur={(value) => {
          new ApiEstimateMeisaiPost({
            estimate_id: estimateId || 0,
            meisai_id: v.id,
            data: {
              quote_id: estimateId || 0,
              category: v.category,
              sub_category: v.sub_category,
              category_index: v.index,
              sub_category_index: v.sub_index,
              construction_materials_name: v.component_name,
              standard: String(value),
              quantity: v.quantity,
              unit: Number(v.unit),
              quote_unit_price: v.quote_unit_price,
              prime_cost: v.prime_cost,
              remark: v.remarks,
            },
          }).run().then(() => {
            getList();
            // if (!estimateId) return;
            // dispatch(EstimateActions.api.meisai.getList({
            //   param: {
            //     id: estimateId,
            //     data: {
            //       category: selectBunrui?.daibunrui,
            //       sub_category: selectBunrui?.chubunrui,
            //     },
            //   },
            //   callback: callbackSetList,
            // }));
          });
        }}
      />,
      <InputTableElement
        value={v.quantity ? MathHelper.rounding2Str(v.quantity, 2, 'round', true) : '0'}
        callbackBlur={(value) => {
          new ApiEstimateMeisaiPost({
            estimate_id: estimateId || 0,
            meisai_id: v.id,
            data: {
              quote_id: estimateId || 0,
              category: v.category,
              sub_category: v.sub_category,
              category_index: v.index,
              sub_category_index: v.sub_index,
              construction_materials_name: v.component_name,
              standard: v.standard,
              quantity: value ? Number(value) : 0,
              unit: Number(v.unit),
              quote_unit_price: v.quote_unit_price,
              prime_cost: v.prime_cost,
              remark: v.remarks,
            },
          }).run().then(() => {
            getList();
            // if (!estimateId) return;
            // dispatch(EstimateActions.api.meisai.getList({
            //   param: {
            //     id: estimateId,
            //     data: {
            //       category: selectBunrui?.daibunrui,
            //       sub_category: selectBunrui?.chubunrui,
            //     },
            //   },
            //   callback: callbackSetList,
            // }));
          });
        }}
        type="number"
        alignRight
      />,
      v.unit ? unitList.find((data) => (data.id === v.unit))?.name || '' : '',
      v.quote_unit_price ? v.quote_unit_price.toLocaleString() : '',
      v.price ? v.price.toLocaleString() : '',
      v.prime_cost ? v.prime_cost.toLocaleString() : '',
      v.cost_amount ? v.cost_amount.toLocaleString() : '',
      v.gross_profit_amount ? v.gross_profit_amount.toLocaleString() : '',
      v.gross_profit_rate ? v.gross_profit_rate.toLocaleString() : '',
      // v.remarks,
      <InputTableElement
        value={v.remarks}
        callbackBlur={(value) => {
          new ApiEstimateMeisaiPost({
            estimate_id: estimateId || 0,
            meisai_id: v.id,
            data: {
              quote_id: estimateId || 0,
              category: v.category,
              sub_category: v.sub_category,
              category_index: v.index,
              sub_category_index: v.sub_index,
              construction_materials_name: v.component_name,
              standard: v.standard,
              quantity: Number(value),
              unit: Number(v.unit),
              quote_unit_price: v.quote_unit_price,
              prime_cost: v.prime_cost,
              remark: String(value),
            },
          }).run().then(() => {
            getList();
            // if (!estimateId) return;
            // dispatch(EstimateActions.api.meisai.getList({
            //   param: {
            //     id: estimateId,
            //     data: {
            //       category: selectBunrui?.daibunrui,
            //       sub_category: selectBunrui?.chubunrui,
            //     },
            //   },
            //   callback: callbackSetList,
            // }));
          });
        }}
      />,
    ]
  ));
  return (
    <section className="result_area list_area">
      <div className="inner">
        <div className="table_responsive">
          <Table
            className="table_selectable table_sortable table_sticky"
            header={EstimateCollection.estimateMeisaiHeader}
            selectedTr={selected}
            rowDataList={meisaiList}
            onDbClick={handleDbClickRow}
            onClickMulti={(v: EstimateMeisaiListType[]) => {
              setSelected(v.map((v2) => meisaiList.findIndex((v3) => v3.id === v2.id)));
              const sList:SelectData[] = [];
              v.forEach((v2) => {
                const findData = meisaiList.find((v3) => v2.id === v3.id);
                if (findData) {
                  sList.push({
                    id: findData.id,
                    daibunrui: Number(findData.category),
                    chubunrui: Number(findData.sub_category),
                    estimateId: findData.quote_id,
                  });
                }
              });
              setSelectData(sList);
            }}
            onClickRow={(v:EstimateMeisaiListType) => {
              handleClickRow({
                id: v.id,
                daibunrui: v.category,
                chubunrui: v.sub_category,
                estimateId: v.quote_id,
              });
            }}
            lists={tableList}
            option={{
              borderSpan,
              tdAlign: tableAlign as {index: number, align: 'right'}[],
            }}
          />

        </div>
      </div>
      {(!masterAdd && allowEdit)
        && (
        <div className="btn_box">
          <Button size="sm" color="secondary" onClick={() => handleClickMove('up')} disabled={!selectData.length || [...selectData].filter((v) => v.chubunrui === selectData[0].chubunrui).length !== selectData.length}>移動 ▲</Button>
          <Button size="sm" color="secondary" onClick={() => handleClickMove('down')} disabled={!selectData.length || [...selectData].filter((v) => v.chubunrui === selectData[0].chubunrui).length !== selectData.length}>移動 ▼</Button>
          <Button size="sm" color="secondary" onClick={handleClickChangePrintName} disabled={selectData.length !== 1}>印刷名称変更</Button>
          <Button size="sm" color="secondary" onClick={() => handleClickMeisaiEdit('add')}>直接登録</Button>
          <Button size="sm" color="secondary" onClick={handleClickAddMasterMeisai}>マスタから登録</Button>
          <Button size="sm" color="secondary" onClick={() => handleClickMeisaiEdit('edit')} disabled={selectData.length !== 1}>編集</Button>
          <Button size="sm" color="dark" onClick={handleClickDelete} disabled={!selectData.length}>削除</Button>
        </div>
        )}
    </section>
  );
};

EstimateMeisaiListPC.defaultProps = {
  allowEdit: true,
};
