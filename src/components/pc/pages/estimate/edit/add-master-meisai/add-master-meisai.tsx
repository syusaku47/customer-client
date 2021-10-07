import { cloneDeep, isEqual } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWillUnMount, useDidMount } from '../../../../../../hooks/life-cycle';
import { EstimateActions } from '../../../../../../redux/estimate/estimate.action';
import { EstimateMeisaiListType, EstimateMeisaiSideMenu } from '../../../../../../type/estimate/estimate-meisai.type';
import { EditPC } from '../../../../../dialogs/edit/edit.pc';
import { Input } from '../../../../../ui/input/input';
import { Select } from '../../../../../ui/select/select';
import { EstimateSideMenu } from '../../side-menu/estimate-side-menu.pc';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { Table } from '../../../../../ui/table/table';
import { MasterActions } from '../../../../../../redux/master/master.action';
import { State } from '../../../../../../redux/root.reducer';
import { LeftLabelCheckbox } from '../../../../../ui/checkbox/left-label-checkbox/left-label-checkbox';
import { MathHelper } from '../../../../../../utilities/math-helper';

const header = [
  '工事・部材名称',
  '規格',
  '数量',
  '単位',
  '見積単価',
  '原価',
  '大分類',
  '中分類',
];

const initialData = () => ({
  daibunrui: undefined as number | undefined,
  chubunrui: undefined as number | undefined,
});

type TreeData = Partial<ReturnType<typeof initialData>>

type Props = {
  callback: (v:EstimateMeisaiListType[]) => void;
}

/*
const tableAlign = [
  {
    index: 4,
    align: 'right',
  },
  {
    index: 5,
    align: 'right',
  },
];
*/

/* マスタから明細登録 */
export const AddMasterMeisai = (props:Props) => {
  const { callback } = props;

  /* Hooks */
  const dispatch = useDispatch();

  /* store */
  const unitList = useSelector((state:State) => state.master.unitList, isEqual);

  /* MasterList */
  const largeCategoryList = useSelector((state:State) => state.master.largeCategoryList, isEqual);
  const middleCategoryList = useSelector((state:State) => state.master.middleCategoryList, isEqual);
  const estimate = useSelector((state:State) => state.estimate.estimate, isEqual);

  /* State */
  const [selected, setSelected] = useState<number[]>(cloneDeep([]));
  const [daibunrui, setDaibunrui] = useState(NaN);
  const [chubunrui, setChubunrui] = useState(NaN);
  const [meisai, setMeisai] = useState('');
  const [allCheck, setAllCheck] = useState(false);

  const [sideMenuList, setSideMenuList] = useState<EstimateMeisaiSideMenu | null>(null);
  const [sideMenuData, setSideMenuData] = useState<TreeData>(initialData());
  const [meisaiList, setMeisaiList] = useState<EstimateMeisaiListType[]>([]);
  const [selectData, setSelectData] = useState<EstimateMeisaiListType[]>([]);

  /* Callback */
  /* Tree取得 */
  const getTree = useCallback(() => {
    dispatch(EstimateActions.api.meisai.getSideMenuList({
      param: {
        id: 0,
        data: {
          category_id: daibunrui,
          sub_category_id: chubunrui,
          detail: meisai,
        },
      },
      onSuccess: setSideMenuList,
    }));
  }, [setSideMenuList, daibunrui, chubunrui, meisai]);

  /* 明細一覧取得 */
  const getMeisaiList = useCallback((v?: TreeData) => {
    const data = v || { daibunrui, chubunrui };
    dispatch(EstimateActions.api.meisai.getList({
      param: {
        id: 0,
        data: {
          category: data.daibunrui,
          sub_category: data.chubunrui,
          detail: meisai,
        },
      },
      callback: setMeisaiList,
    }));
  }, [sideMenuData, meisai, daibunrui, chubunrui]);

  /* TreeClick処理 */
  const handleChangeBunrui = useCallback((v: TreeData) => {
    setSideMenuData(v);
    getMeisaiList(v);
  }, [getMeisaiList]);

  /* 登録 */
  const handleClickRegist = useCallback(() => {
    if (selectData.length && estimate?.id) {
      dispatch(EstimateActions.api.meisai.postList({
        param: {
          id: estimate?.id,
          detail_id: selectData.map((v) => (v.id)),
        },
        onSuccess: () => {
          callback(selectData);
        },
      }));
    }
  },
  [selectData, estimate?.id]);

  /* リストクリック */
  const handleClickRow = useCallback((v:EstimateMeisaiListType) => {
    setSelectData([cloneDeep(v)]);
    const findIndex = meisaiList.findIndex((v2) => v2.id === v.id);
    if (findIndex !== -1) {
      setSelected([findIndex]);
    }
  }, [meisaiList]);

  /* マルチクリック */
  const handleClickMultiRow = useCallback((v:EstimateMeisaiListType[]) => {
    setSelected(v.map((v2) => meisaiList.findIndex((v3) => v3.id === v2.id)));
    const sList:EstimateMeisaiListType[] = [];
    v.forEach((v2) => {
      const findData = meisaiList.find((v3) => v2.id === v3.id);
      if (findData) { sList.push(cloneDeep(findData)); }
    });
    setSelectData(cloneDeep(sList));
  }, [meisaiList]);

  /* 検索 */
  const handleClickSort = useCallback(() => {
    getTree();
    getMeisaiList();
  }, [getTree, getMeisaiList]);

  const handleChangeAllCheck = useCallback(() => {
    setAllCheck(!allCheck);
    if (allCheck) {
      setSelectData([]);
      setSelected([]);
    } else {
      setSelectData(cloneDeep(meisaiList));
      setSelected(meisaiList.map((_, i) => i));
    }
  }, [allCheck, meisaiList]);

  /* Effect */
  /* Tree取得 */
  useDidMount(getTree);

  /* 明細リスト取得 */
  useEffect(getMeisaiList, []);

  /* 大分類取得 */
  useDidMount(() => {
    dispatch(MasterActions.api.largeCategory.getList({}));
  });

  /* 中分類取得  */
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
    setSideMenuList(null);
    setMeisaiList([]);
    dispatch(MasterActions.setMiddleCategoryList([]));
  });

  return (
    <EditPC
      mode="dialog"
      disabled={!selectData.length}
      callback={handleClickRegist}
    >
      <div className="AddMasterMeisai">
        <section>
          <div className="item_wrap">
            <div className="item_box">
              <div className="item_head">大分類</div>
              <Select
                className=""
                value={daibunrui}
                label=""
                onChange={(v) => setDaibunrui(Number(v))}
                defaultLabel="全て"
                options={largeCategoryList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
            <div className="item_box">
              <div className="item_head">中分類</div>
              <Select
                className=""
                value={chubunrui}
                label="中分類"
                onChange={(v) => setChubunrui(Number(v))}
                defaultLabel="全て"
                options={middleCategoryList.map((v) => ({
                  text: v.name, value: v.id,
                }))}
              />
            </div>
            <div className="item_box flex_grow_1">
              <div className="item_head">明細</div>
              <Input
                className="large"
                value={meisai}
                label=""
                onChange={(e) => setMeisai(e.target.value)}
              />
            </div>
            <LeftIconButton
              label="絞込み"
              fontAwesomeClass="fas fa-search"
              className="btn_search for_simple"
              size="sm"
              color="secondary"
              onClick={handleClickSort}
            />
          </div>
        </section>
        <section className="estimate_explore">
          <strong className="" style={{ marginBottom: '5px' }}>明細情報</strong>
          <div className="estimate_box">
            <EstimateSideMenu
              data={sideMenuList}
              callback={handleChangeBunrui}
              masterAdd
            />
            <div className="result_area list_area">
              <div className="inner">
                <div className="table_responsive">
                  <Table
                    className="table_selectable table_sortable table_sticky"
                    header={header}
                    selectedTr={selected}
                    rowDataList={meisaiList}
                    onClickMulti={handleClickMultiRow}
                    onClickRow={handleClickRow}
                    lists={meisaiList.map((v) => ([
                      v.component_name,
                      v.standard,
                      v.quantity ? MathHelper.rounding2Str(v.quantity, 2, 'round', true) : '',
                      v.unit ? unitList.find((data) => (data.id === v.unit))?.name || '' : '',
                      v.quote_unit_price ? v.quote_unit_price.toLocaleString() : '',
                      v.prime_cost ? v.prime_cost.toLocaleString() : '',
                      v.category_name,
                      v.sub_category_name,
                    ]))}
                    option={{
                      stringWidth: [
                        // { index: 0, width: 50 }, // 工事・部材名称
                        // { index: 1, width: 50 }, // 規格
                        { index: 2, width: 80 }, // 数量
                        { index: 3, width: 50 }, // 単位
                        { index: 4, width: 120 }, // 見積単価
                        { index: 5, width: 120 }, // 原価
                        // { index: 6, width: 50 }, // 大分類
                        // { index: 7, width: 50 }, // 中分類
                      ],
                      /* tdAlign: tableAlign as {index: number, align: 'right'}[],*/
                      tdAlign: [
                        { index: 0, align: 'left' },
                        { index: 1, align: 'left' },
                        { index: 2, align: 'right' },
                        { index: 3, align: 'left' },
                        { index: 4, align: 'right' },
                        { index: 5, align: 'right' },
                        { index: 6, align: 'left' },
                        { index: 7, align: 'left' },
                      ],
                    }}
                  />
                </div>
              </div>
              <div className="all_select item_wrap">
                <LeftLabelCheckbox
                  label="すべて選択"
                  checked={allCheck}
                  onChange={handleChangeAllCheck}
                />
                <span className="comment">
                  ※Ctrl＋クリック：複数選択可能&emsp;Shift＋クリック：範囲指定選択可能
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </EditPC>
  );
};
