import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { goBack } from 'connected-react-router';
import { DisplayElements } from '../../../../../../type/display-elements.type';
import { Table, TableOption } from '../../../../../ui/table/table';
import { RightLabelCheckbox } from '../../../../../ui/checkbox/right-label-checkbox/right-label-checkbox';
import { LeftIconButton } from '../../../../../ui/button/left-icon-button/left-icon-button';
import { Button } from '../../../../../ui/button/button';

export type MasterGetListParam = {
  order: number;
  sort: number;
  isMuko: boolean;
}

type Props = {
  header: { key: string; label: string;}[];
  rowDataList: any[];
  list: DisplayElements[][];
  callbackEdit: (v?: any) => void;
  callbackGetList: (v: MasterGetListParam) => void;
  defaultOrder: number;
  tableOption?: TableOption;
};

export const MasterBody = (props: Props) => {
  const {
    rowDataList,
    header,
    callbackGetList,
    callbackEdit,
    list,
    tableOption,
    defaultOrder,
  } = props;

  const dispatch = useDispatch();

  /* State */
  const [selected, setSelected] = useState(NaN);
  const [isMuko, setIsMuko] = useState(false);
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

  const getList = useCallback(() => {
    callbackGetList({
      ...orderSort,
      isMuko,
    });
  },
  [callbackGetList, orderSort, isMuko]);

  /* Effect */
  useEffect(() => {
    getList();
  }, [orderSort]);

  return (
    <div className="main_cnt">
      <div className="search_area only_simple ">
        <div className="item_wrap">
          <div className="item_box">
            <RightLabelCheckbox
              checked={isMuko}
              label="?????????????????????"
              onChange={() => setIsMuko(!isMuko)}
            />
          </div>
          <LeftIconButton
            label="?????????"
            fontAwesomeClass="fas fa-filter"
            className="btn_search for_simple"
            size="sm"
            color="secondary"
            onClick={getList}
          />
        </div>
      </div>
      <div className="option_area table_sort">
        <div className="left">
          <div className="count">???????????? &nbsp;<span>{list.length}</span> ???</div>
        </div>
        <div className="right">
          <LeftIconButton
            label="????????????"
            size="md"
            fontAwesomeClass="fas fa-edit"
            className="btn_search for_detail"
            color="primary"
            onClick={() => callbackEdit()}
          />
        </div>
      </div>
      <section className="result_area list_area">
        <div className="inner">
          <div className="table_responsive">
            {/* <Table /> */}
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
              lists={list.map((v:any, i) => ([
                <Button
                  color="secondary"
                  size="md"
                  onClick={(e) => {
                    e.stopPropagation();
                    callbackEdit(rowDataList[i].id);
                  }}
                >
                  ??????
                </Button>,
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
            label="??????"
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
