import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './maintenance-list.pc.scss';
import { isEqual, cloneDeep } from 'lodash';
import { State } from '../../../../../../redux/root.reducer';
import { DialogActions } from '../../../../../../redux/dialog/dialog.action';
import { Table } from '../../../../../ui/table/table';
import { MaintenanceCollection } from '../../../../../../collection/maintenance/maintenance.collection';
import { MaintenanceList } from '../../../../../../type/maintenance/maintenance.type';
import { MaintenanceEditPC } from '../../../../pages/maintenance/edit/maintenance-edit.pc';
import { MaintenanceActions } from '../../../../../../redux/maintenance/maintenance.action';
import Deposite from '../../../../../../asset/images/icon/deposite.svg';
import Alert from '../../../../../../asset/images/icon/alert.svg';
import { DateFormatter } from '../../../../../../utilities/date-formatter';

type Props = {
  data?: MaintenanceList[];
  handleCardClick?: (maintenance: MaintenanceList) => void;
  callbackSelected?: (selected: number[]) => void;
  selectId?: number;
}

export const MaintenanceListPC = (props: Props) => {
  const {
    data, handleCardClick, callbackSelected, selectId,
  } = props;

  /* Hooks */
  const dispatch = useDispatch();
  const maintenanceList = useSelector(
    (state: State) => state.maintenance.list, isEqual,
  );

  /* State */
  const [selected, setSelected] = useState<number[]>(cloneDeep([]));

  /* List */
  const dataList = useMemo(() => data || maintenanceList, [maintenanceList, data]);

  const handleClickCard = useCallback((id: number) => {
    if (handleCardClick) {
      const findData = data?.find((v) => v.id === id);
      if (findData) {
        handleCardClick(findData);
      }
    }
    setSelected([dataList.findIndex((v) => v.id === id)]);
  }, [data, handleCardClick, dataList]);

  const handleClickHeader = useCallback(
    (highlow: 0 | 1, sort_by: number) => {
      dispatch(MaintenanceActions.setSort({
        highlow,
        sort_by,
      }));
    }, [],
  );

  const handleDbClick = useCallback(
    (v: MaintenanceList) => {
      if (handleCardClick) return;
      setSelected([dataList.findIndex((v2) => v2.id === v.id)]);
      dispatch(DialogActions.push({
        title: 'メンテナンス情報入力',
        element: <MaintenanceEditPC
          mode="update"
          id={v.id}
        />,
      }));
    },
    [handleCardClick, dataList],
  );

  useEffect(() => {
    if (callbackSelected) { callbackSelected(selected); }
  }, [selected]);

  useEffect(() => {
    if (!selectId) {
      setSelected([]);
      return;
    }
    setSelected([dataList.findIndex((v) => v.id === selectId)]);
  }, [selectId, dataList]);

  return (
    <section className="result_area list_area">
      <div className="inner">
        <div className="table_responsive">
          <Table
            className="table_selectable table_sortable table_sticky"
            header={MaintenanceCollection.header}
            onDbClick={handleDbClick}
            sort={{
              index: [],
              onClick: handleClickHeader,
            }}
            onClickRow={(v: MaintenanceList) => { handleClickCard(Number(v.id)); }}
            onClickMulti={(v: MaintenanceList[]) => {
              setSelected(v.map((v2) => dataList.findIndex((v3) => v3.id === v2.id)));
            }}
            selectedTr={selected}
            rowDataList={dataList}
            lists={dataList.map((v) => (
              [
                v.maintenance_past_flag
                  ? (
                    <img src={Alert} alt="メンテナンス日を過ぎています" title="メンテナンス日を過ぎています" className="icon" />
                  ) : '',
                v.fixed_flag
                  ? (
                    <img src={Deposite} alt="対応済" title="対応済" className="icon" />
                  ) : '',
                DateFormatter.date2str(v.maintenance_date),
                v.title,
                DateFormatter.date2str(v.supported_date),
                DateFormatter.date2str(v.completion_date),
                v.customer_name,
                v.project_name,
                v.project_representative,
              ]
            ))}
            option={{
              stringWidth: [
                // { index: 0, width: 50 }, // メンテナンス日を過ぎています
                // { index: 1, width: 100 }, // 対応済
                // { index: 2, width: 50 }, // メンテナンス日
                // { index: 3, width: 50 }, //  タイトル
                // { index: 4, width: 50 }, // 対応日
                // { index: 5, width: 50 }, // 完工日
                // { index: 6, width: 50 }, // 顧客名
                // { index: 7, width: 50 }, // 案件名
                // { index: 8, width: 50 }, // 案件担当者
              ],
              tdAlign: [
                { index: 0, align: 'center' },
                { index: 1, align: 'center' },
                { index: 2, align: 'center' },
                { index: 3, align: 'center' },
                { index: 4, align: 'center' },
                { index: 5, align: 'center' },
                { index: 6, align: 'center' },
                { index: 7, align: 'center' },
                { index: 8, align: 'center' },
              ],
            }}
          />
        </div>
      </div>
    </section>
  );
};
