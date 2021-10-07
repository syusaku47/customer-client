import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as lodash from 'lodash';
import { cloneDeep, isEqual } from 'lodash';
import { ProjectListType } from '../../../../../../type/project/project.type';
import { Button } from '../../../../../ui/button/button';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { ProjectSearchBox } from '../project-search-box';
import { useWillUnMount } from '../../../../../../hooks/life-cycle';
import { ProjectActions } from '../../../../../../redux/project/project.action';
import { State } from '../../../../../../redux/root.reducer';
import { Table } from '../../../../../ui/table/table';
import { ProjectCollection } from '../../../../../../collection/project/project.collection';
import Ordered from '../../../../../../asset/images/icon/ordered.svg';
import Alert from '../../../../../../asset/images/icon/alert.svg';
import { Limit, TableSort } from '../../../../../ui/table/table-sort/table-sort';
import { DateFormatter } from '../../../../../../utilities/date-formatter';
import { Customer } from '../../../../../../type/customer/customer.type';

type Props = {
  customerData?: Customer,
  callback: (v:ProjectListType) => void;
}

export const ProjectSearch = (props: Props) => {
  const { customerData, callback } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const list = useSelector((state:State) => state.project.list);
  const listHitCount = useSelector((state:State) => state.project.listHitCount);
  const sortState = useSelector((state: State) => (state.project.sort), isEqual);

  /* State */
  const [project, setProject] = useState<ProjectListType | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [searchIsOpen, setSearchIsOpen] = useState<boolean>(false);

  /* Callback */
  const getList = useCallback(() => {
    dispatch(ProjectActions.api.project.getList({
      customer_id: customerData?.id,
      customer_prefecture: sortState.customer_prefecture,
      sales_contact: sortState.sales_contact,
      field_place: sortState.field_place,
      name: sortState.name,
      field_name: sortState.field_name,
      field_tel_no: sortState.field_tel_no,
      customer_name: sortState.customer_name,
      sales_shop: sortState.sales_shop,
      construction_parts: sortState.construction_parts?.getSendData(),
      construction_status: sortState.construction_status?.getSendData(),
      limit: sortState.limit,
      sort_by: sortState.sort_by,
      highlow: sortState.highlow,
      offset: sortState.offset,
    }));
  }, [sortState, customerData]);

  const handleClickSelect = useCallback(() => {
    dispatch(DialogActions.pop());
    if (project) { callback(lodash.cloneDeep(project)); }
  },
  [project, callback]);

  const handleClickRow = useCallback((v:ProjectListType) => {
    setProject(cloneDeep(v));
    setSelected([list.findIndex((v2) => v2.id === v.id)]);
  }, [list]);

  const handleDbClickRow = useCallback((v: ProjectListType) => {
    setProject(cloneDeep(v));
    dispatch(DialogActions.pop());
    callback(cloneDeep(v));
  }, [callback]);

  const handleClickHeader = useCallback((highlow, sort_by) => {
    dispatch(ProjectActions.setSort({
      highlow,
      sort_by,
    }));
  }, []);

  const handleChangePagination = useCallback((offset: number, limit: Limit) => {
    dispatch(ProjectActions.setSort({ offset, limit }));
  }, []);

  useEffect(() => {
    getList();
  }, [sortState.offset, sortState.sort_by, sortState.limit, sortState.highlow]);

  // useDidMount(() => {
  //   if (customerData) {
  //     handleClickSearch(customerData);
  //   }
  // });

  useWillUnMount(() => {
    dispatch(ProjectActions.setSort(null));
    dispatch(ProjectActions.setList([]));
  });

  return (
    <div className={`editPc_wrap ${searchIsOpen ? 'detail_on' : ''}`}>
      <div className="editPc_body show_all">
        <ProjectSearchBox
          openCallback={setSearchIsOpen}
          callback={getList}
        />
        <TableSort
          page={sortState.offset ?? 0}
          limit={sortState.limit as Limit}
          hitCount={listHitCount}
          callback={handleChangePagination}
        />
        <section className="result_area list_area">
          <div className="inner">
            <div className="table_responsive">
              <Table
                className="table_selectable table_sortable table_sticky"
                header={ProjectCollection.header}
                selectedTr={selected}
                rowDataList={list}
                onClickRow={handleClickRow}
                onDbClick={handleDbClickRow}
                sort={{ onClick: handleClickHeader }}
                lists={list.map((v) => (
                  [
                    v.complete_flag
                      ? <img src={Ordered} alt="受注された案件" title="受注された案件" className="icon" />
                      : '',
                    v.alert_flag
                      ? <img src={Alert} alt="案件作成から1週間以上経過" title="案件作成から1週間以上経過" className="icon" />
                      : '',
                    v.id,
                    v.field_name,
                    <div className="rank_label" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>{v.customer_rank_name}</div>,
                    <div className="rank_label" style={{ backgroundColor: '#000000', color: '#FFFFFF' }}>{v.project_rank}</div>,
                    v.name,
                    v.field_tel_no,
                    v.field_place,
                    DateFormatter.date2str(v.construction_start_date),
                    DateFormatter.date2str(v.completion_end_date),
                    DateFormatter.date2str(v.construction_date),
                    DateFormatter.date2str(v.completion_date),
                    v.contract_no,
                    v.source_name,
                    v.remarks,
                    v.project_representative_name,
                    DateFormatter.date2str(v.contract_date),
                  ]
                ))}
                option={{
                  stringWidth: [
                    // { index: 0, width: 50 }, // 受注された案件
                    // { index: 1, width: 100 }, // 案件作成から1週間以上経過
                    // { index: 2, width: 50 }, // 案件ID
                    // { index: 3, width: 50 }, // 現場名称
                    // { index: 4, width: 50 }, // 顧客ランク
                    // { index: 5, width: 100 }, // 見込みランク
                    // { index: 6, width: 50 }, // 案件名
                    // { index: 7, width: 50 }, // 現場電話番号
                    // { index: 8, width: 50 }, // 現場住所
                    // { index: 9, width: 50 }, // 着工予定日
                    // { index: 10, width: 50 }, // 完工予定日
                    // { index: 11, width: 50 }, // 着工日
                    // { index: 12, width: 50 }, // 完工日
                    // { index: 13, width: 50 }, // 契約番号
                    // { index: 14, width: 50 }, // 発生源
                    // { index: 15, width: 50 }, // 備考
                    // { index: 16, width: 50 }, // 担当名
                    // { index: 17, width: 50 }, // 契約日
                  ],
                  tdAlign: [
                    { index: 0, align: 'center' },
                    { index: 1, align: 'center' },
                    { index: 2, align: 'center' },
                    { index: 3, align: 'left' },
                    { index: 4, align: 'center' },
                    { index: 5, align: 'center' },
                    { index: 6, align: 'left' },
                    { index: 7, align: 'left' },
                    { index: 8, align: 'left' },
                    { index: 9, align: 'center' },
                    { index: 10, align: 'center' },
                    { index: 11, align: 'center' },
                    { index: 12, align: 'center' },
                    { index: 13, align: 'center' },
                    { index: 14, align: 'left' },
                    { index: 15, align: 'left' },
                    { index: 16, align: 'left' },
                    { index: 17, align: 'left' },
                  ],
                }}
              />
            </div>
          </div>
        </section>
        <TableSort
          className="bottom"
          page={sortState.offset ?? 0}
          limit={sortState.limit as Limit}
          hitCount={listHitCount}
          callback={handleChangePagination}
        />
      </div>
      <div className="editPc_footer base_footer">
        <Button size="md" color="primary" disabled={!project} onClick={handleClickSelect}>
          選択
        </Button>
        <Button size="md" color="dark" onClick={() => dispatch(DialogActions.clear())}>
          閉じる
        </Button>
      </div>
    </div>
  );
};
