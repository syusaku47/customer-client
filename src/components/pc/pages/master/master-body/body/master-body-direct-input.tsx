import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';
import { Button } from '../../../../../ui/button/button';
import { DisplayElements } from '../../../../../../type/display-elements.type';
import { Table, TableOption } from '../../../../../ui/table/table';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';

export type MasterDirectInputGetListParam = {
  order: number;
  sort: number;
}

type Props = {
  header: { key: string; label: string;}[];
  rowDataList: any[];
  list: DisplayElements[][];
  callbackEdit: (v?: any) => void;
  callbackGetList: (v: MasterDirectInputGetListParam) => void;
  defaultOrder: number;
  tableOption?: TableOption;
};

export const MasterBodyDirectInput = (props: Props) => {
  const dispatch = useDispatch();

  const {
    rowDataList,
    header,
    callbackGetList,
    callbackEdit,
    list,
    tableOption,
    defaultOrder,
  } = props;

  /* State */
  const [selected, setSelected] = useState(NaN);
  const [orderSort, setOrderSort] = useState<{
    order: number;
    sort: number;
  } >({
    order: defaultOrder,
    sort: 1,
  });

  /* Callback */
  const handleClickRow = useCallback(
    (row: any) => setSelected(rowDataList.findIndex((v2) => v2.id === row.id)),
    [rowDataList],
  );
  const handleDbClickRow = useCallback(
    (row: any) => callbackEdit(row.id),
    [callbackEdit],
  );

  const getList = useCallback(
    () => {
      callbackGetList({
        ...orderSort,
      });
    },
    [callbackGetList, orderSort],
  );

  /* Effect */
  useEffect(() => {
    getList();
  }, [orderSort]);

  return (
    <div className="main_cnt">
      <div className="search_area only_simple ">
        <div className="item_wrap">
          <div className="item_box" />
          <Button
            className="btn_search for_simple"
            size="sm"
            color="secondary"
            onClick={getList}
          >
            更新
          </Button>
        </div>
      </div>
      <section className="result_area list_area">
        <div className="inner">
          <div className="table_responsive">
            <Table
              className="table_selectable table_sortable table_sticky"
              header={header.map((v) => v.label)}
              onClickRow={handleClickRow}
              onDbClick={handleDbClickRow}
              selectedTr={[selected]}
              rowDataList={rowDataList}
              sort={{
                index: [],
                onClick: (order, sort) => setOrderSort({ order, sort }),
              }}
              lists={list.map((v:any) => ([
                ...v,
              ]))}
              option={tableOption}
            />
          </div>
        </div>
      </section>
      <footer className="btn_area">
        <div className="left_box" />
        <div className="right_box">
          <LeftIconButton
            label="戻る"
            fontAwesomeClass="fas fa-arrow-left"
            size="md"
            color="dark"
            onClick={() => dispatch(goBack())}
          />
        </div>
      </footer>
    </div>
  );
};
